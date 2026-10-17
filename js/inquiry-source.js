/* Record a coarse visit source for estimate emails. Never sends analytics. */
(function () {
  'use strict';
  var key = 'ultra-inquiry-source-v1';
  var source = { channel: 'Unknown / direct', evidence: 'No identifiable referral', landingPage: window.location.pathname };
  var labels = {
    google: 'Google Search', bing: 'Bing Search', yahoo: 'Yahoo Search',
    nextdoor: 'Nextdoor', yelp: 'Yelp', instagram: 'Instagram',
    facebook: 'Facebook', chatgpt: 'ChatGPT'
  };
  try {
    var params = new URLSearchParams(window.location.search);
    var taggedSource = (params.get('utm_source') || '').toLowerCase();
    var campaign = (params.get('utm_campaign') || '').toLowerCase();
    if (taggedSource === 'google' && campaign === 'gbp') {
      source.channel = 'Google Business Profile';
      source.evidence = 'Tagged profile link';
    } else if (Object.prototype.hasOwnProperty.call(labels, taggedSource)) {
      source.channel = labels[taggedSource];
      source.evidence = 'Tagged website link';
    } else if (document.referrer) {
      var host = new URL(document.referrer).hostname.toLowerCase();
      if (host !== window.location.hostname) {
        source.channel = 'Other website';
        source.evidence = 'External referring website';
        Object.keys(labels).some(function (name) {
          var domain = name === 'chatgpt' ? 'chatgpt.com' : name + '.com';
          if (host === domain || host === 'www.' + domain || host === 'l.' + domain || host === 'm.' + domain) {
            source.channel = labels[name];
            return true;
          }
          return false;
        });
      }
    }
    var saved = JSON.parse(sessionStorage.getItem(key) || 'null');
    if (saved && typeof saved.channel === 'string' && typeof saved.evidence === 'string' && typeof saved.landingPage === 'string') {
      if (saved.channel !== 'Unknown / direct' || source.channel === 'Unknown / direct') source = saved;
    }
    sessionStorage.setItem(key, JSON.stringify(source));
  } catch (error) {
    // A blocked storage setting must never prevent a quote request.
  }
  window.UltraInquirySource = {
    summary: function () {
      return source.channel + ' (' + source.evidence + '); landing page: ' + source.landingPage;
    }
  };
})();
