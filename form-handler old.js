/**
 * Ultra Home Repair — unified EmailJS form handler
 * Fixes double-alert bug by ensuring only ONE submit listener per form.
 * Works for:
 *   - #hero-contact-form (home page)
 *   - #contact-form (contact page)
 *   - any <form data-emailjs="true">
 *
 * Expects an /emailjs-config.json file with:
 *   { "publicKey": "...", "serviceId": "...", "templateId": "..." }
 */

(function () {
  const FORM_SELECTOR =
    'form#hero-contact-form, form#contact-form, form#mobile-quote-form, form[data-emailjs="true"]';

  // Prevent duplicate listeners if this script is included more than once
  const processedForms = new WeakSet();

  // Lazy-load config once
  let configPromise;
  function loadConfig() {
    if (!configPromise) {
      configPromise = fetch('emailjs-config.json', { cache: 'no-store' })
        .then((r) => (r.ok ? r.json() : Promise.reject(new Error('Config fetch failed'))))
        .then((cfg) => {
          if (!cfg || !cfg.publicKey || !cfg.serviceId || !cfg.templateId) {
            throw new Error('Missing keys in emailjs-config.json');
          }
          if (typeof emailjs === 'undefined') {
            throw new Error('EmailJS SDK not loaded');
          }
          emailjs.init(cfg.publicKey);
          return cfg;
        });
    }
    return configPromise;
  }

  function setSubmittingState(form, isSubmitting) {
    const btn = form.querySelector('button[type="submit"], .form-submit-btn');
    if (btn) {
      if (isSubmitting) {
        btn.dataset.origText = btn.textContent;
        btn.textContent = 'Sending…';
        btn.disabled = true;
      } else {
        btn.textContent = btn.dataset.origText || btn.textContent;
        btn.disabled = false;
      }
    }
  }

  function formToParams(form) {
    // Use FormData so any input name="..." is captured for the EmailJS template
    const fd = new FormData(form);
    const params = {};
    for (const [k, v] of fd.entries()) {
      params[k] = v;
    }

    // Helpful aliases for common templates (won't hurt if unused)
    params.first = params.first || params.First || params.first_name || '';
    params.last = params.last || params.Last || params.last_name || '';
    params.phone = params.phone || params.Phone || '';
    params.email = params.email || params.Email || '';
    params.address =
      params.address || params['Street Address'] || params.street || params.street_address || '';
    params.city = params.city || params.City || '';
    params.state = params.state || params.State || '';
    params.zip = params.zip || params.Zip || params.postcode || '';
    params.message = params.message || params.Message || params.description || '';

    // Include page hint
    params.page = location.pathname.replace(/^\//, '') || 'index.html';
    return params;
  }

  async function handleSubmit(ev) {
    ev.preventDefault();

    const form = ev.currentTarget;
    setSubmittingState(form, true);

    try {
      const cfg = await loadConfig();
      const params = formToParams(form);

      await emailjs.sendForm(cfg.serviceId, cfg.templateId, form);
      alert("Thanks! Your request was sent. We will call you back within 1 business day.");
      form.reset();
    } catch (err) {
      // Only show a single, clear message on failure
      console.error('[EmailJS] submit error:', err);
      alert("Form submission requires EmailJS configuration. Please contact us at (949) 371-6423.");
    } finally {
      setSubmittingState(ev.currentTarget, false);
    }
  }

  function attachHandlers() {
    document.querySelectorAll(FORM_SELECTOR).forEach((form) => {
      if (!processedForms.has(form)) {
        processedForms.add(form);
        form.addEventListener('submit', handleSubmit, { capture: true });
      }
    });
  }

  // Run now and also on DOM changes (in case forms are injected later)
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', attachHandlers, { once: true });
  } else {
    attachHandlers();
  }

  const mo = new MutationObserver(attachHandlers);
  mo.observe(document.documentElement, { childList: true, subtree: true });
})();
