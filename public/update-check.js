(function () {
  var script = document.currentScript
  var entry = script && script.getAttribute('data-entry')
  var style = script && script.getAttribute('data-style')
  var BUILD_KEY = 'rooville-build-version'

  function isLocal() {
    return (
      location.protocol === 'file:' ||
      location.hostname === 'localhost' ||
      location.hostname === '127.0.0.1'
    )
  }

  function loadApp() {
    if (style) {
      var link = document.createElement('link')
      link.rel = 'stylesheet'
      link.href = style
      document.head.appendChild(link)
    }
    if (entry) {
      var el = document.createElement('script')
      el.type = 'module'
      el.crossOrigin = ''
      el.src = entry
      document.head.appendChild(el)
    }
  }

  if (isLocal() || !entry) {
    loadApp()
    return
  }

  function hardReload(version) {
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
  }

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
        loadApp()
        return
      }

      var stored = null
      try {
        stored = localStorage.getItem(BUILD_KEY)
      } catch (e) {}

      if (stored && stored !== data.version) {
        hardReload(data.version)
        return
      }

      if (!stored) {
        try {
          localStorage.setItem(BUILD_KEY, data.version)
        } catch (e) {}
      }

      loadApp()
    })
    .catch(function () {
      loadApp()
    })
})()
