/**
 * Ultra Home Repair — EmailJS form handler (file-upload ready)
 * Targets:
 *   - #hero-contact-form (home)
 *   - #contact-form (contact page)
 *   - #mobile-quote-form (mobile)
 *   - any <form data-emailjs="true">
 *
 * Requires /emailjs-config.json in the site root:
 *   { "publicKey": "...", "serviceId": "...", "templateId": "..." }
 */
(function () {
  const FORM_SELECTOR =
    'form#hero-contact-form, form#contact-form, form#mobile-quote-form, form[data-emailjs="true"]';

  // Single-listener guard
  const processedForms = new WeakSet();

  // Config loader (cached)
  let configPromise;
  function loadConfig() {
    if (!configPromise) {
      configPromise = fetch('emailjs-config.json', { cache: 'no-store' })
        .then(r => (r.ok ? r.json() : Promise.reject(new Error('Config fetch failed'))))
        .then(cfg => {
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
    if (!btn) return;
    if (isSubmitting) {
      btn.dataset.origText = btn.textContent;
      btn.textContent = 'Sending…';
      btn.disabled = true;
    } else {
      btn.textContent = btn.dataset.origText || btn.textContent;
      btn.disabled = false;
    }
  }

  // Client-side file validation to avoid provider rejections
  function validateFiles(form) {
    const fileInputs = Array.from(form.querySelectorAll('input[type="file"]'));
    if (!fileInputs.length) return { ok: true };

    const allowed = new Set(['image/jpeg', 'image/png', 'application/pdf']);
    const maxEach = 10 * 1024 * 1024;  // 10 MB each
    const maxTotal = 25 * 1024 * 1024; // 25 MB total
    let total = 0;
    const problems = [];

    fileInputs.forEach(inp => {
      for (const file of inp.files || []) {
        total += file.size || 0;
        // If accept is defined, browsers usually limit selection, but we double-check
        if (allowed.size && file.type && !allowed.has(file.type)) {
          problems.push(`• ${file.name}: unsupported type (${file.type}). Allowed: JPG, PNG, PDF.`);
        }
        if (file.size > maxEach) {
          problems.push(`• ${file.name}: ${(file.size/1048576).toFixed(1)} MB (limit 10 MB each).`);
        }
      }
    });

    if (total > maxTotal) {
      problems.push(`• Total attachment size ${(total/1048576).toFixed(1)} MB (limit 25 MB total).`);
    }

    if (problems.length) {
      return {
        ok: false,
        message: "Please adjust your attachments:\n" + problems.join("\n")
      };
    }
    return { ok: true };
  }

  async function handleSubmit(ev) {
    ev.preventDefault();
    const form = ev.currentTarget;
    setSubmittingState(form, true);

    try {
      const cfg = await loadConfig();

      // Validate files (type/size) before calling EmailJS
      const filesCheck = validateFiles(form);
      if (!filesCheck.ok) {
        alert(filesCheck.message);
        return;
      }

      // Always use sendForm when the form may contain files
      await emailjs.sendForm(cfg.serviceId, cfg.templateId, form);

      alert("Thanks! Your request was sent. We will call you back within 1 business day.");
      form.reset();
    } catch (err) {
      console.error('[EmailJS] submit error:', err);
      let msg = "Form submission requires EmailJS configuration. Please contact us at (949) 371-6423.";
      // Provide a clearer hint if EmailJS rejects attachments
      if (String(err && err.message || err).match(/attachment|file|upload|size|type/i)) {
        msg = "We couldn't send your attachments. Please try smaller files (JPG/PNG/PDF, under 10 MB each, max 25 MB total).";
      }
      alert(msg);
    } finally {
      setSubmittingState(form, false);
    }
  }

  function attachHandlers() {
    document.querySelectorAll(FORM_SELECTOR).forEach(form => {
      if (!processedForms.has(form)) {
        processedForms.add(form);
        form.addEventListener('submit', handleSubmit, { capture: true });
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', attachHandlers, { once: true });
  } else {
    attachHandlers();
  }

  const mo = new MutationObserver(attachHandlers);
  mo.observe(document.documentElement, { childList: true, subtree: true });
})();