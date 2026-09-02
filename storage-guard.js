/* =========================================================
   LIZZYOS STORAGE GUARD  (load FIRST, before script.js)
   -----------------------------------------------------
   Fixes phones where the Garden shows "0 Plots", no flowers,
   and bought seeds never appear in the seed inventory.

   Cause: on some phones (especially iPhone/Safari, low storage,
   or private browsing) localStorage.setItem THROWS a
   QuotaExceededError / SecurityError. The Garden module writes
   during start-up, the throw kills the whole script, so the
   Garden never renders and purchases never save.

   This guard makes storage never throw:
     1. auto-frees space by dropping disposable backup/cache keys
     2. retries the write
     3. falls back to in-memory storage for the session
   It NEVER deletes Garden, wallet, token, streak or reward data.
   ========================================================= */
(function () {
  "use strict";

  var DISPOSABLE = [
    /PreUpdateSnapshot/i,
    /Snapshot/i,
    /Backup/i,
    /Cache/i,
    /NewsCache/i,
    /^lizzyTemp/i,
    /Log$/i
  ];

  var PROTECTED = [
    /garden/i, /micky/i, /wallet/i, /token/i, /streak/i,
    /reward/i, /seed/i, /shelf/i, /letter/i, /vault/i, /job/i
  ];

  var memory = {};
  var usingMemory = false;
  var health = { available: true, quotaHit: false, freed: [], memoryFallback: false };

  function isProtected(k) {
    for (var i = 0; i < PROTECTED.length; i++) if (PROTECTED[i].test(k)) return true;
    return false;
  }
  function isDisposable(k) {
    if (isProtected(k) && !/Snapshot|Backup|Cache/i.test(k)) return false;
    for (var i = 0; i < DISPOSABLE.length; i++) if (DISPOSABLE[i].test(k)) return true;
    return false;
  }

  function nativeStore() {
    try {
      var s = window.localStorage;
      s.setItem("__lizzyGuardTest__", "1");
      s.removeItem("__lizzyGuardTest__");
      return s;
    } catch (e) {
      return null;
    }
  }

  var real = nativeStore();
  if (!real) {
    usingMemory = true;
    health.available = false;
    health.memoryFallback = true;
  }

  function freeSpace() {
    if (!real) return false;
    var freedAny = false;
    var keys = [];
    try {
      for (var i = 0; i < real.length; i++) keys.push(real.key(i));
    } catch (e) { return false; }
    for (var j = 0; j < keys.length; j++) {
      var k = keys[j];
      if (k && isDisposable(k)) {
        try {
          real.removeItem(k);
          health.freed.push(k);
          freedAny = true;
        } catch (e) { /* ignore */ }
      }
    }
    return freedAny;
  }

  function safeSet(key, value) {
    if (usingMemory) { memory[key] = String(value); return; }
    try {
      real.setItem(key, value);
      return;
    } catch (e) {
      health.quotaHit = true;
      if (freeSpace()) {
        try { real.setItem(key, value); return; } catch (e2) { /* keep going */ }
      }
      // Last resort: keep the app alive this session instead of crashing it.
      usingMemory = true;
      health.memoryFallback = true;
      try {
        for (var i = 0; i < real.length; i++) {
          var k = real.key(i);
          memory[k] = real.getItem(k);
        }
      } catch (e3) { /* ignore */ }
      memory[key] = String(value);
    }
  }

  function safeGet(key) {
    if (usingMemory) return Object.prototype.hasOwnProperty.call(memory, key) ? memory[key] : null;
    try { return real.getItem(key); } catch (e) { return null; }
  }

  function safeRemove(key) {
    if (usingMemory) { delete memory[key]; return; }
    try { real.removeItem(key); } catch (e) { /* ignore */ }
  }

  var shim = {
    getItem: safeGet,
    setItem: safeSet,
    removeItem: safeRemove,
    clear: function () {
      if (usingMemory) { memory = {}; return; }
      try { real.clear(); } catch (e) { /* ignore */ }
    },
    key: function (i) {
      if (usingMemory) return Object.keys(memory)[i] || null;
      try { return real.key(i); } catch (e) { return null; }
    }
  };
  Object.defineProperty(shim, "length", {
    get: function () {
      if (usingMemory) return Object.keys(memory).length;
      try { return real.length; } catch (e) { return 0; }
    }
  });

  try {
    Object.defineProperty(window, "localStorage", {
      configurable: true,
      get: function () { return shim; }
    });
  } catch (e) {
    // Some browsers refuse to redefine it: patch setItem in place instead.
    if (real) {
      var originalSet = real.setItem.bind(real);
      real.setItem = function (k, v) {
        try { originalSet(k, v); }
        catch (err) { health.quotaHit = true; freeSpace(); try { originalSet(k, v); } catch (e2) { /* swallow */ } }
      };
    }
  }

  // Proactively clear the old pre-update snapshot when storage is nearly full.
  try {
    var used = 0;
    for (var i = 0; i < shim.length; i++) {
      var k = shim.key(i);
      var v = k ? shim.getItem(k) : "";
      used += (k ? k.length : 0) + (v ? v.length : 0);
    }
    health.approxKB = Math.round(used / 512);
    if (used > 3.2 * 1024 * 1024) freeSpace();
  } catch (e) { /* ignore */ }

  window.lizzyStorageHealth = health;
})();
