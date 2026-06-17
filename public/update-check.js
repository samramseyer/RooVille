(function () {
  var script = document.currentScript
  var BUILD_KEY = 'rooville-build-version'

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

  function resolveAsset(file) {
    if (!file) return ''
    var clean = String(file).split('?')[0]
    if (clean.indexOf('://') !== -1) return clean
    if (clean.indexOf('/assets/') !== -1) return clean
    if (clean.charAt(0) === '/') return clean
    return deployBase() + 'assets/' + clean
  }

  function bust(url, version) {
    if (!url) return ''
    var next = new URL(url, location.href)
    next.searchParams.set('v', version || String(Date.now()))
    return next.toString()
  }

  function clearLegacyCaches() {
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
    return Promise.all(tasks)
  }

  function loadBundle(bundle) {
    var version = bundle.version || String(Date.now())

    if (bundle.style) {
      var link = document.createElement('link')
      link.rel = 'stylesheet'
      link.href = bust(resolveAsset(bundle.style), version)
      document.head.appendChild(link)
    }

    if (!bundle.entry) return

    var el = document.createElement('script')
    el.type = 'module'
    el.crossOrigin = 'anonymous'
    el.src = bust(resolveAsset(bundle.entry), version)
    el.onerror = function () {
      try {
        localStorage.removeItem(BUILD_KEY)
      } catch (e) {}
      var next = new URL(location.href)
      next.searchParams.set('_rv', version)
      location.replace(next.toString())
    }
    document.head.appendChild(el)
  }

  function loadFromHtmlFallback() {
    var entry = script && script.getAttribute('data-entry')
    var style = script && script.getAttribute('data-style')
    var version =
      (script && script.getAttribute('data-build-id')) ||
      window.__ROOVILLE_BUILD__ ||
      String(Date.now())

    loadBundle({
      version: version,
      entry: entry,
      style: style ? style.split('/').pop() : '',
    })
  }

  if (isLocal()) {
    loadFromHtmlFallback()
    return
  }

  clearLegacyCaches().then(function () {
    var url = new URL('version.json', location.href)
    url.search = '_=' + Date.now()

    fetch(url, { cache: 'no-store' })
      .then(function (r) {
        if (!r.ok) throw new Error('version missing')
        var ct = r.headers.get('content-type') || ''
        if (ct.indexOf('json') === -1) throw new Error('version not json')
        return r.json()
      })
      .then(function (data) {
        if (!data || !data.entry) throw new Error('version invalid')

        try {
          localStorage.setItem(BUILD_KEY, data.version)
        } catch (e) {}

        loadBundle(data)
      })
      .catch(function () {
        loadFromHtmlFallback()
      })
  })
})()
