const page = window.location.pathname.split('/').pop();

document.querySelectorAll('nav.main-nav a').forEach((a) => {
  const href = a.getAttribute('href');
  if (href === page) a.classList.add('active');
});
