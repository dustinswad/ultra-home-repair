/* Keep the fixed phone/text bar from covering content when its text grows. */
(function () {
  'use strict';
  var bar = document.querySelector('.mobile-bar');
  if (!bar) return;
  document.body.classList.add('uhr-has-contact-bar');
  function reserveBarSpace() {
    var height = Math.ceil(bar.getBoundingClientRect().height);
    document.body.style.setProperty('--uhr-contact-bar-height', height + 'px');
  }
  reserveBarSpace();
  if ('ResizeObserver' in window) {
    new ResizeObserver(reserveBarSpace).observe(bar);
  } else {
    window.addEventListener('resize', reserveBarSpace, { passive: true });
  }
})();
