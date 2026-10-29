/* Keep anchor destinations below the header when fonts or menu height change. */
(function () {
  'use strict';
  var header = document.querySelector('.uhr-site-header');
  if (!header) return;
  function measureHeader() {
    document.body.style.setProperty('--door-header-height', Math.ceil(header.getBoundingClientRect().height) + 'px');
  }
  document.addEventListener('click', function (event) {
    var link = event.target.closest('a[href^="tel:"],a[href^="sms:"]');
    if (!link || link.classList.contains('uhr-nav-action') || link.hasAttribute('onclick')) return;
    if (typeof window.gtag !== 'function') return;
    window.gtag('event', link.getAttribute('href').indexOf('tel:') === 0 ? 'phone_call' : 'sms_click', {
      page_path: window.location.pathname,
      cta_location: link.getAttribute('data-cta-location') || (link.closest('footer') ? 'footer' : 'door_page'),
      transport_type: 'beacon'
    });
  }, true);
  measureHeader();
  if ('ResizeObserver' in window) new ResizeObserver(measureHeader).observe(header);
  else window.addEventListener('resize', measureHeader, { passive: true });
})();
