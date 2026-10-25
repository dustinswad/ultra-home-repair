/* One review carousel for every page. Owner-approved cadence: 1.5 seconds. */
(function () {
  'use strict';
  document.querySelectorAll('[data-review-carousel]').forEach(function (section) {
    var cards = Array.from(section.querySelectorAll('.uhr-review-card'));
    var previous = section.querySelector('[data-review-previous]');
    var next = section.querySelector('[data-review-next]');
    var pause = section.querySelector('[data-review-pause]');
    var counter = section.querySelector('[data-review-counter]');
    var announcement = section.querySelector('[data-review-announcement]');
    var dialog = section.querySelector('dialog');
    var reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    var current = 0;
    var paused = reduced.matches;
    var hovered = false;
    var focused = false;
    var visible = false;
    var returnFocus;
    var autoTimer;
    if (cards.length < 2) return;

    function pauseState() {
      pause.textContent = paused ? 'Play reviews' : 'Pause reviews';
      pause.setAttribute('aria-pressed', String(paused));
      section.dataset.reviewPaused = String(paused);
    }
    function show(index, manual) {
      current = (index + cards.length) % cards.length;
      cards.forEach(function (card, i) {
        card.hidden = i !== current && i !== (current + 1) % cards.length;
        // Keep the first review first even when the pair wraps to the beginning.
        card.style.order = String((i - current + cards.length) % cards.length);
      });
      counter.textContent = 'Reviews ' + (current + 1) + ' & ' + ((current + 1) % cards.length + 1) + ' of ' + cards.length;
      section.dataset.reviewIndex = String(current);
      if (manual) announcement.textContent = counter.textContent;
    }
    function scheduleAuto() {
      clearTimeout(autoTimer);
      autoTimer = window.setTimeout(function () {
        if (visible && !paused && !hovered && !focused && !document.hidden && !dialog.open) show(current + 1, false);
        // Start a fresh 1.5 seconds after each attempt; never catch up in a burst.
        scheduleAuto();
      }, 1500);
    }
    previous.addEventListener('click', function () { show(current - 1, true); scheduleAuto(); });
    next.addEventListener('click', function () { show(current + 1, true); scheduleAuto(); });
    pause.addEventListener('click', function () { paused = !paused; pauseState(); scheduleAuto(); });
    section.querySelector('.uhr-review-grid').addEventListener('pointerenter', function (event) {
      if (event.pointerType === 'mouse') hovered = true;
    });
    section.querySelector('.uhr-review-grid').addEventListener('pointerleave', function () { hovered = false; scheduleAuto(); });
    function focusState() {
      focused = section.contains(document.activeElement) && document.activeElement !== pause;
    }
    section.addEventListener('focusin', focusState);
    section.addEventListener('focusout', function () { setTimeout(function () { focusState(); scheduleAuto(); }, 0); });
    new IntersectionObserver(function (entries) { visible = entries[0].isIntersecting; scheduleAuto(); }, {threshold: 0.1}).observe(section);
    document.addEventListener('visibilitychange', scheduleAuto);
    reduced.addEventListener('change', function () { paused = reduced.matches; pauseState(); });
    section.querySelectorAll('[data-review-full]').forEach(function (button) {
      button.addEventListener('click', function () {
        var card = button.closest('.uhr-review-card');
        returnFocus = button;
        dialog.querySelector('[data-review-dialog-name]').textContent = card.querySelector('.uhr-review-name').textContent;
        dialog.querySelector('[data-review-dialog-source]').textContent = card.querySelector('.uhr-review-source').textContent;
        dialog.querySelector('[data-review-dialog-text]').textContent = card.querySelector('.uhr-review-excerpt').textContent;
        dialog.querySelector('[data-review-dialog-link]').href = card.querySelector('.uhr-review-source-link').href;
        dialog.showModal();
      });
    });
    dialog.querySelector('[data-review-close]').addEventListener('click', function () { dialog.close(); });
    dialog.addEventListener('click', function (event) { if (event.target === dialog) dialog.close(); });
    dialog.addEventListener('close', function () { if (returnFocus) returnFocus.focus(); });
    show(0, false);
    pauseState();
    scheduleAuto();
  });
})();
