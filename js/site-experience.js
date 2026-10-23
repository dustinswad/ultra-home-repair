/* Shared navigation behavior; existing form and page analytics remain in place. */
(function () {
  'use strict';
  var header = document.querySelector('.uhr-site-header');
  if (!header) return;
  var button = header.querySelector('.uhr-menu-toggle');
  var links = header.querySelector('.uhr-nav-links');
  function closeMenu(returnFocus) {
    links.classList.remove('is-open', 'open');
    button.classList.remove('open');
    button.setAttribute('aria-expanded', 'false');
    button.setAttribute('aria-label', 'Open navigation menu');
    if (returnFocus) button.focus();
  }
  button.addEventListener('click', function (event) {
    // Capture prevents earlier page-specific togglers from toggling a second time.
    event.stopImmediatePropagation();
    var open = button.getAttribute('aria-expanded') !== 'true';
    links.classList.toggle('is-open', open);
    button.setAttribute('aria-expanded', String(open));
    button.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
  }, true);
  links.addEventListener('click', function (event) {
    if (event.target.closest('a')) closeMenu(false);
  }, true);
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && links.classList.contains('is-open')) {
      event.preventDefault();
      closeMenu(true);
    }
  });
  document.addEventListener('click', function (event) {
    if (links.classList.contains('is-open') && !header.contains(event.target)) closeMenu(false);
  });
  var desktop = window.matchMedia('(min-width:1121px)');
  desktop.addEventListener('change', function () { closeMenu(false); });
  // One event for the new header CTA, independent of legacy page listeners.
  var textAction = header.querySelector('.uhr-nav-action');
  textAction.addEventListener('click', function (event) {
    event.stopImmediatePropagation();
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'sms_click', {
        event_category: 'conversion', event_label: 'Header Text Dustin', value: 1,
        transport_type: 'beacon'
      });
    }
  }, true);
  document.querySelectorAll('main').forEach(function (main) {
    if (!main.hasAttribute('tabindex')) main.setAttribute('tabindex', '-1');
  });
  var form = document.getElementById('contactForm');
  if (form) {
    var error = document.getElementById('formError');
    var success = document.getElementById('formSuccess');
    var fields = Array.from(form.querySelectorAll('[required]'));
    form.addEventListener('submit', function (event) {
      var invalid = [];
      fields.forEach(function (field) {
        field.value = field.value.trim();
        var valid = field.validity.valid;
        if (field.minLength > 0 && field.value.length < field.minLength) valid = false;
        if (field.id === 'phone') {
          var count = field.value.replace(/\D/g, '').length;
          if (count < 10 || count > 15) valid = false;
        }
        field.setAttribute('aria-invalid', String(!valid));
        if (!valid) invalid.push(field);
      });
      if (!invalid.length) return; // The existing EmailJS handler owns real delivery.
      event.preventDefault();
      event.stopImmediatePropagation();
      error.replaceChildren();
      var heading = document.createElement('strong');
      heading.textContent = 'Please check the following fields:';
      var list = document.createElement('ul');
      invalid.forEach(function (field) {
        var item = document.createElement('li');
        var link = document.createElement('a');
        link.href = '#' + field.id;
        link.textContent = form.querySelector('label[for="' + field.id + '"]').textContent.replace('*', '').trim();
        link.addEventListener('click', function (e) { e.preventDefault(); field.focus(); });
        item.append(link);
        list.append(item);
      });
      error.append(heading, list);
      error.style.display = 'block';
      error.focus();
    }, true);
    fields.forEach(function (field) {
      field.addEventListener('input', function () { field.removeAttribute('aria-invalid'); });
    });
    // Announce the actual delivery outcome while retaining the source form's promise handling.
    var outcomes = new MutationObserver(function (mutations) {
      mutations.forEach(function (mutation) {
        var element = mutation.target;
        if (element.style.display === 'block') element.focus();
      });
    });
    outcomes.observe(error, {attributes: true, attributeFilter: ['style']});
    outcomes.observe(success, {attributes: true, attributeFilter: ['style']});
  }
})();
