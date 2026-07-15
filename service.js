// header scroll shadow + back-to-top
const topBtn=document.getElementById('topBtn');
window.addEventListener('scroll',()=>{topBtn && topBtn.classList.toggle('show',window.scrollY>500);});
topBtn && topBtn.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));

// mobile menu
const hamburger=document.getElementById('hamburger');
const mobileMenu=document.getElementById('mobileMenu');
function toggleMenu(open){
  const isOpen=open!==undefined?open:!mobileMenu.classList.contains('open');
  hamburger.classList.toggle('open',isOpen);
  mobileMenu.classList.toggle('open',isOpen);
  hamburger.setAttribute('aria-expanded',isOpen?'true':'false');
  if(isOpen){const first=mobileMenu.querySelector('a');if(first)first.focus();}else{hamburger.focus();}
}
if(hamburger){
  hamburger.addEventListener('click',()=>toggleMenu());
  mobileMenu.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>toggleMenu(false)));
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&mobileMenu.classList.contains('open'))toggleMenu(false);});
}

// theme toggle (persists only for the session, mirrors system preference like the homepage)
const themeToggle=document.getElementById('themeToggle');
const themeIcon=document.getElementById('themeIcon');
const darkIconPath='<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>';
const lightIconPath='<path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>';
function applyTheme(isDark){
  document.documentElement.setAttribute('data-theme',isDark?'dark':'light');
  if(themeIcon)themeIcon.innerHTML=isDark?darkIconPath:lightIconPath;
}
const prefersDarkQuery=window.matchMedia('(prefers-color-scheme: dark)');
let userOverride=false;let dark=prefersDarkQuery.matches;applyTheme(dark);
prefersDarkQuery.addEventListener('change',e=>{if(!userOverride)applyTheme(e.matches);});
if(themeToggle){themeToggle.addEventListener('click',()=>{userOverride=true;dark=!dark;applyTheme(dark);});}

// FAQ accordion
document.querySelectorAll('.faq-item').forEach(item=>{
  const q=item.querySelector('.faq-q');
  const a=item.querySelector('.faq-a');
  q.addEventListener('click',()=>{
    const isOpen=item.classList.contains('open');
    document.querySelectorAll('.faq-item.open').forEach(o=>{o.classList.remove('open');o.querySelector('.faq-a').style.maxHeight=null;o.querySelector('.faq-q').setAttribute('aria-expanded','false');});
    if(!isOpen){item.classList.add('open');a.style.maxHeight=a.scrollHeight+'px';q.setAttribute('aria-expanded','true');}
  });
});

// reveal on scroll
function setupReveal(){
  const els=document.querySelectorAll('.reveal:not(.observed)');
  const io=new IntersectionObserver(entries=>{
    entries.forEach(en=>{if(en.isIntersecting){en.target.classList.add('in');io.unobserve(en.target);}});
  },{threshold:0.15});
  els.forEach(el=>{el.classList.add('observed');io.observe(el);});
}
setupReveal();
