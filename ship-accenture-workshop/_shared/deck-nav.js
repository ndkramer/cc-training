// Deep-link to slides: deck.html#12 → slide 12 (1-indexed in URL).
// Hash updates via replaceState on every nav — URL stays shareable as you
// present, but arrow keys don't spam browser history. Plain JS, no deps,
// loads before babel block.

(function () {
  function parseHash() {
    var h = parseInt(window.location.hash.slice(1), 10);
    return (!isNaN(h) && h > 0) ? h - 1 : null;
  }

  // Initial slide index. Hash wins over localStorage — a shared link should
  // land on the intended slide even if the recipient previously visited.
  window.initSlideFromHash = function (storageKey) {
    var fromHash = parseHash();
    if (fromHash !== null) return fromHash;
    var saved = parseInt(localStorage.getItem(storageKey), 10);
    return isNaN(saved) ? 0 : saved;
  };

  // Write current slide to URL. replaceState → no history entry per arrow key.
  // Out-of-bounds hashes self-correct via App's existing clamp effect.
  window.syncSlideToHash = function (current) {
    var h = '#' + (current + 1);
    if (window.location.hash !== h) {
      try { history.replaceState(null, '', h); } catch (e) {}
    }
  };
})();
