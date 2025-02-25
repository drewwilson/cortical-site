const cloudHeroCards = document.querySelector('.hero-cloud-cards-bottom');
const cloudHeroCardLast = document.querySelector('.hero-cloud-cards-bottom > .hero-cloud-card:last-of-type');
const cloudDescBody = document.querySelector('.section-cloud-description-body');

window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    const winInnerHeight = window.outerHeight;
    const cloudDescBodyST = cloudDescBody.offsetTop;

    if (scrollPosition > 200 && scrollPosition <= 2000) {
      cloudHeroCards.style.transform = `translateY(${-1 * (120-(scrollPosition / 10))}px)`;
      cloudHeroCardLast.style.transform = `translateY(${-1 * (120-(scrollPosition / 8))}px)`;
    }

    if (scrollPosition >= (cloudDescBodyST - winInnerHeight - 200) && scrollPosition < (cloudDescBodyST + cloudDescBody.scrollHeight + 100)) {
      cloudDescBody.style.transform = `translateY(${(((cloudDescBodyST + cloudDescBody.scrollHeight)/ 1.4) - scrollPosition)}px)`;
    }
});