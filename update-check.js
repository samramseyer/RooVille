(function () {
  var script = document.currentScript
  var style = script && script.getAttribute('data-style')
  var htmlBuildId = (script && script.getAttribute('data-build-id')) || window.__ROOVILLE_BUILD__ || ''
  var htmlEntry = script && script.getAttribute('data-entry')
  var BUILD_KEY = 'rooville-build-version'
  var RELOAD_KEY = 'rooville-update-reloads'

  function isLocal() {
    return (
      location.protocol === 'file:' ||
      location.hostname === 'localhost' ||
      location.hostname === '127.0.0.1'
    )
  }

  function deployBase() {
    if (!script || !script.src) return './'
    return script.src.replace(/update-check\.js(?:\?.*)?$/, '')
  }

  function entryName(path) {
    if (!path) return ''
    return String(path).split('/').pop().split('?')[0]
  }

  function resolveAsset(fileName) {
    if (!fileName) return ''
    if (fileName.indexOf('/') !== -1) return fileName
    return deployBase() + 'assets/' + fileName
  }

  function loadApp(entry, cssHref) {
    if (cssHref) {
      var link = document.createElement('link')
      link.rel = 'stylesheet'
      link.href = cssHref
      document.head.appendChild(link)
    }
    if (!entry) return
    var el = document.createElement('script')
    el.type = 'module'
    el.crossOrigin = 'anonymous'
    el.src = entry
    document.head.appendChild(el)
  }

  if (isLocal()) {
    loadApp(htmlEntry, style)
    return
  }

  function reloadCount() {
    try {
      return Number(sessionStorage.getItem(RELOAD_KEY) || '0')
    } catch (e) {
      return 0
    }
  }

  function bumpReloadCount() {
    try {
      sessionStorage.setItem(RELOAD_KEY, String(reloadCount() + 1))
    } catch (e) {}
  }

  function clearReloadCount() {
    try {
      sessionStorage.removeItem(RELOAD_KEY)
    } catch (e) {}
  }

  function hardReload(version) {
    if (reloadCount() >= 2) {
      clearReloadCount()
      return false
    }
    bumpReloadCount()

    var tasks = []
    if ('serviceWorker' in navigator) {
      tasks.push(
        navigator.serviceWorker.getRegistrations().then(function (regs) {
          return Promise.all(regs.map(function (r) {
            return r.unregister()
          }))
        }),
      )
    }
    if ('caches' in window) {
      tasks.push(
        caches.keys().then(function (keys) {
          return Promise.all(keys.map(function (k) {
            return caches.delete(k)
          }))
        }),
      )
    }

    Promise.all(tasks).finally(function () {
      try {
        localStorage.setItem(BUILD_KEY, version)
      } catch (e) {}
      var next = new URL(location.href)
      next.searchParams.set('_rv', version)
      location.replace(next.toString())
    })
    return true
  }

  function start(entry, cssHref, version) {
    if (version) {
      try {
        localStorage.setItem(BUILD_KEY, version)
      } catch (e) {}
    }
    clearReloadCount()
    loadApp(entry, cssHref)
  }

  function checkVersion() {
    var fallbackEntry = htmlEntry
    var fallbackStyle = style
    var url = new URL('version.json', location.href)
    url.search = '_=' + Date.now()

    fetch(url, { cache: 'no-store' })
      .then(function (r) {
        if (!r.ok) return null
        var ct = r.headers.get('content-type') || ''
        if (ct.indexOf('json') === -1) return null
        return r.json()
      })
      .then(function (data) {
        if (!data || !data.version) {
          start(fallbackEntry, fallbackStyle, null)
          return
        }

        var serverEntry = resolveAsset(data.entry || entryName(fallbackEntry))
        var stored = null
        try {
          stored = localStorage.getItem(BUILD_KEY)
        } catch (e) {}

        var htmlEntryName = entryName(htmlEntry)
        var serverEntryName = entryName(data.entry)
        var htmlStale = Boolean(serverEntryName && htmlEntryName && serverEntryName !== htmlEntryName)
        var buildStale = Boolean(htmlBuildId && data.version !== htmlBuildId)
        var storedStale = Boolean(stored && stored !== data.version)

        if ((htmlStale || buildStale || storedStale) && hardReload(data.version)) {
          return
        }

        start(serverEntry || fallbackEntry, fallbackStyle, data.version)
      })
      .catch(function () {
        start(fallbackEntry, fallbackStyle, null)
      })
  }

  if (!htmlEntry) {
    checkVersion()
    return
  }

  checkVersion()
})()
