// Tahun dinamis
document.getElementById('year').textContent = new Date().getFullYear();

/* =========================
   THEME TOGGLE (ICON MODE)
   ========================= */
   const html = document.documentElement;
   const themeToggleBtn = document.getElementById("themeToggle");
   const themeIcon = document.getElementById("themeIcon");
   
   function setTheme(theme) {
     html.setAttribute("data-bs-theme", theme);
     localStorage.setItem("theme", theme);
   
     if (themeIcon) {
       themeIcon.className =
         theme === "dark"
           ? "bi bi-sun-fill"   // 🌞 light icon
           : "bi bi-moon-fill"; // 🌙 dark icon
     }
   }
   
   // Restore theme
   const savedTheme = localStorage.getItem("theme") || "light";
setTheme(savedTheme);
   
   // Toggle click
   themeToggleBtn?.addEventListener("click", () => {
     const current = html.getAttribute("data-bs-theme") || "light";
     setTheme(current === "light" ? "dark" : "light");
   });


// Smooth-activate nav link on scroll
const sections = document.querySelectorAll('section, header');
const navLinks = document.querySelectorAll('.nav-link');
const activateLink = () => {
  let index = sections.length;
  while(--index && window.scrollY + 120 < sections[index].offsetTop) {}
  navLinks.forEach(l => l.classList.remove('active'));
  const id = sections[index].id;
  const active = document.querySelector(`.nav-link[href="#${id}"]`);
  active?.classList.add('active');
}
activateLink();
window.addEventListener('scroll', activateLink);

// Collapse navbar on link click (mobile)
document.querySelectorAll('.navbar .nav-link').forEach(a =>{
  a.addEventListener('click', () => {
    const nav = document.getElementById('nav');
    const bsCollapse = bootstrap.Collapse.getOrCreateInstance(nav, {toggle:false});
    if(getComputedStyle(nav).display !== 'none'){ bsCollapse.hide(); }
  })
});

// Back to top visibility
const btt = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
  btt.style.display = window.scrollY > 600 ? 'inline-flex' : 'none';
});
btt.addEventListener('click', () => window.scrollTo({top:0, behavior:'smooth'}));

// Form validation
(() => {
  const forms = document.querySelectorAll('.needs-validation');
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      }
      form.classList.add('was-validated');
    }, false);
  });
})();

// Simple project filter
const buttons = document.querySelectorAll('.filter-btn');
const cards = document.querySelectorAll('#projectGrid .project-card');
buttons.forEach(btn => btn.addEventListener('click', () => {
  buttons.forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  const f = btn.dataset.filter;
  cards.forEach(c => {
    const show = f === 'all' || c.dataset.tags.includes(f);
    c.style.display = show ? '' : 'none';
  });
}));

// Keyboard jump (G then P -> Projects)
let gPressed = false;
window.addEventListener('keydown', (e) => {
  if(e.key.toLowerCase() === 'g'){ gPressed = true; setTimeout(()=>gPressed=false, 600); }
  if(gPressed && e.key.toLowerCase() === 'p'){ document.getElementById('projects')?.scrollIntoView({behavior:'smooth'}); }
});