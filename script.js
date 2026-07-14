const navbar = document.getElementById('navbar');
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
const links = document.querySelectorAll('.nav-link');
const navIndicator = document.getElementById('navIndicator');
const scrollProgress = document.getElementById('scrollProgress');

function updateScrollProgress() {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const percent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  scrollProgress.style.width = percent + '%';
}

function moveIndicatorTo(link) {
  if (!link || !navIndicator || window.innerWidth <= 768) return;
  navIndicator.style.left = link.offsetLeft + 'px';
  navIndicator.style.width = link.offsetWidth + 'px';
}

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 10);
  updateScrollProgress();
});

window.addEventListener('resize', () => {
  const activeLink = document.querySelector('.nav-link.active') || links[0];
  moveIndicatorTo(activeLink);
});

menuToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  menuToggle.classList.toggle('open', isOpen);
  menuToggle.setAttribute('aria-expanded', isOpen);
});

links.forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuToggle.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', false);
  });
});

const sections = document.querySelectorAll('main section[id]');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    const id = entry.target.getAttribute('id');
    const link = document.querySelector(`.nav-link[href="#${id}"]`);
    if (!link) return;
    if (entry.isIntersecting) {
      links.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
      moveIndicatorTo(link);
    }
  });
}, { rootMargin: '-50% 0px -50% 0px' });

sections.forEach(section => observer.observe(section));

const revealEls = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    entry.target.classList.toggle('revealed', entry.isIntersecting);
  });
}, { threshold: 0.2 });

revealEls.forEach(el => revealObserver.observe(el));

updateScrollProgress();
moveIndicatorTo(links[0]);