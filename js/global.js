const header = document.querySelector('body > .header');

window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;

    if (scrollPosition > 100) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
});