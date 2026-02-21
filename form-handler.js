
(function(){
  // Load config JSON then init EmailJS
  function loadConfig(){
    return fetch('/emailjs-config.json', {cache: 'no-store'})
      .then(r => r.ok ? r.json() : Promise.reject(new Error('Config fetch failed')));
  }

  function serialize(form){
    const data = {};
    const fd = new FormData(form);
    fd.forEach((v, k) => data[k] = v.toString().trim());
    // derive combined fields for compatibility with existing template
    data.fullName = [data.firstName || '', data.lastName || ''].join(' ').trim();
    data.address = [data.street, [data.city, data.state].filter(Boolean).join(', '), data.zip].filter(Boolean).join(' | ');
    return data;
  }

  function attach(formId){
    const form = document.getElementById(formId);
    if (!form) return;
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      try{
        const cfg = await loadConfig();
        if (!cfg || !cfg.publicKey || !cfg.serviceId || !cfg.templateId) {
          alert('Form submission requires EmailJS configuration. Please contact us at (949) 371-6423.');
          return;
        }
        if (typeof emailjs === 'undefined') {
          alert('Email service not available. Please try again later or call (949) 371-6423.');
          return;
        }
        emailjs.init(cfg.publicKey);
        const params = serialize(form);
        const btn = form.querySelector('[type="submit"]');
        if (btn){ btn.disabled = true; const t=btn.textContent; btn.textContent='Sending…'; btn.dataset._t=t; }
        await emailjs.send(cfg.serviceId, cfg.templateId, params);
        if (btn){ btn.disabled = false; btn.textContent = btn.dataset._t || 'Submit'; }
        form.reset();
        alert('Thanks! Your request was sent. We will call you back within 1 business day.');
      }catch(err){
        console.error(err);
        alert('Sorry, the form could not be sent. Please call (949) 371-6423.');
      }
    });
  }

  ['hero-contact-form','contact-form'].forEach(attach);
})();
