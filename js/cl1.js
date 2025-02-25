const cl1ExperienceBg = document.querySelector('.cl1-experience-bg');
const cl1Hero = document.querySelector('.hero-cl1');
const cloudHeroCards = document.querySelector('.hero-cloud-cards-bottom');

const cl1BgColor1 = { r: 182, g: 186, b: 185 };
const cl1BgColor2 = { r: 246, g: 245, b: 242 };

window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    const scrollPercent = Math.min(
      (scrollPosition - 350) / 350,
      1
    );

    if (scrollPosition > 100) {
      let adjPercent = 1 - Math.min(scrollPercent,1);
      if (adjPercent < 0) { adjPercent = 0; }
      cl1Hero.style.backgroundColor = `rgba(182, 186, 185, ${adjPercent})`;
    }

    if (scrollPosition > 350 && scrollPosition <= 700) {
      cl1ExperienceBg.style.transform = `scale(${1 - (scrollPercent / 2)}) translateY(${scrollPosition / 10}px)`;
    } else {
      cl1ExperienceBg.style.transform = `translateY(${scrollPosition / 10}px)`;
    }

    if (scrollPosition > 700) {
      cl1ExperienceBg.classList.add('active');
    } else {
      cl1ExperienceBg.classList.remove('active');
    }


    // if (scrollPosition > 200) {
    //   const adjPercent = Math.min(scrollPercent,1);
    //   const r = Math.round(cl1BgColor1.r + (cl1BgColor2.r - cl1BgColor1.r) * adjPercent);
    //   const g = Math.round(cl1BgColor1.g + (cl1BgColor2.g - cl1BgColor1.g) * adjPercent);
    //   const b = Math.round(cl1BgColor1.b + (cl1BgColor2.b - cl1BgColor1.b) * adjPercent);
    //   cl1Hero.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
    // }
});