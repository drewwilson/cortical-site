const header = document.querySelector('body > .header');
const hamburger = document.querySelector('.header-hamburger');
const headerClose = document.querySelector('.header-x');

window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;

    if (scrollPosition > 100) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
});

window.addEventListener('resize', () => {
  const winWidth = window.innerWidth;

  if (winWidth > 700) {
    header.classList.remove('open-nav');
  }
});

hamburger.onclick = function(){
  header.classList.add('open-nav');
}
headerClose.onclick = function(){
  header.classList.remove('open-nav');
}