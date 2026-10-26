(()=>{
const shade=document.getElementById('offerShade'),close=shade.querySelector('.offer-close'),links=[...document.querySelectorAll('.offer-open')];
const active=Date.now()<Date.parse('2026-11-01T00:00:00-07:00');
if(!active){links.forEach(a=>{const bar=a.closest('.tankless-offer-link');if(bar)bar.hidden=true;else a.hidden=true;});return;}
shade.querySelector('.offer-action').addEventListener('click',()=>{if(typeof window.gtag==='function')window.gtag('event','sms_click',{event_category:'conversion',event_label:'October offer',cta_location:'october_offer',page_path:window.location.pathname,transport_type:'beacon'});});
let returnFocus;const mobile=window.matchMedia('(max-width:700px)');
function openOffer(){returnFocus=document.activeElement;shade.hidden=false;shade.querySelector('[role="dialog"]').setAttribute('aria-modal',String(!mobile.matches));close.focus();try{sessionStorage.setItem('ultra-october-2026-seen','1')}catch{}}
function closeOffer(){shade.hidden=true;returnFocus?.focus();}
close.addEventListener('click',closeOffer);shade.addEventListener('click',e=>{if(e.target===shade)closeOffer()});
document.addEventListener('keydown',e=>{if(shade.hidden)return;if(e.key==='Escape')closeOffer();if(e.key==='Tab'&&!mobile.matches){const a=[...shade.querySelectorAll('button,a[href]')];if(e.shiftKey&&document.activeElement===a[0]){e.preventDefault();a.at(-1).focus()}else if(!e.shiftKey&&document.activeElement===a.at(-1)){e.preventDefault();a[0].focus()}}});
links.forEach(a=>a.addEventListener('click',e=>{e.preventDefault();openOffer()}));
let seen=false;try{seen=sessionStorage.getItem('ultra-october-2026-seen')==='1'}catch{}
if(!seen)setTimeout(openOffer,4000);
})();