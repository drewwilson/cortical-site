const cl1Experience = document.querySelector('.cl1-experience');
const cl1ExperienceBg = document.querySelector('.cl1-experience-bg');
const cl1Hero = document.querySelector('.hero-cl1');
const cloudHeroCards = document.querySelector('.hero-cloud-cards-bottom');

const imageContainer = document.getElementById('imageContainer');
const specialSection = document.getElementById('specialSection');
const fixedContent = document.getElementById('fixedContent');
const slides = document.querySelectorAll('.cl1-experience-slide');

const cl1BgColor1 = { r: 182, g: 186, b: 185 };
const cl1BgColor2 = { r: 246, g: 245, b: 242 };

const config = {
  imagePattern: 'cl1imgs/{index}.jpg',
  frameCount: 151,
  startIndex: 0,
  padLength: 3,
  loadingBatchSize: 5,
  sectionCount: 6
};

const frames = [];
let ticking = false;

window.addEventListener('scroll', () => {
    const header = document.querySelector('body > .header');
    const winHeight = window.innerHeight;
    const viewportWidth = window.innerWidth;
    const scrollPosition = window.scrollY;
    const spArg = (viewportWidth <= 900) ? (winHeight / 1.45) : (winHeight / 1.25);
    const scrollPercent = Math.min((scrollPosition - spArg) / spArg, 1);
    const specialSectionBottom = specialSection.offsetTop + specialSection.offsetHeight;
    const inSpecialSection = (scrollPosition >= specialSection.offsetTop) && 
                           (scrollPosition < specialSectionBottom - winHeight);

    if (scrollPosition > 100) {
      let adjPercent = 1 - Math.min((scrollPosition - 350) / 350, 1);
      if (adjPercent < 0) { adjPercent = 0; }
      cl1Hero.style.backgroundColor = `rgba(182, 186, 185, ${adjPercent})`;
    }

    if (scrollPosition > 350 && scrollPosition <= specialSection.offsetTop) {
      const perentage = `${Math.max(Math.min(((1 - (scrollPercent * 1.2)) * 100), 100), 20)}%`
      cl1ExperienceBg.style.transform = `translateY(${(scrollPosition - 350) / 4}px)`;
      cl1ExperienceBg.style.backgroundSize = `${perentage} auto`;
    } else if (scrollPosition > 350) {
      cl1ExperienceBg.style.transform = `translateY(${(scrollPosition - 350) /4}px)`;
    }

    if (inSpecialSection) {
      header.classList.add('in-cl1');
      cl1ExperienceBg.classList.add('hide');
    } else {
      header.classList.remove('in-cl1');
      cl1ExperienceBg.classList.remove('hide');
    }

    if (!ticking) {
      requestAnimationFrame(() => {
        updateContent();
        ticking = false;
      });
      ticking = true;
    }
});



for (let i = 0; i < config.frameCount; i++) {
  const img = new Image();
  img.className = 'image-frame';
  img.style.display = i === 0 ? 'block' : 'none';
  frames.push(img);
  imageContainer.appendChild(img);
}

(function loadBatch(startIndex) {
  const endIndex = Math.min(startIndex + config.loadingBatchSize, config.frameCount);
  let loaded = 0;
  
  for (let i = startIndex; i < endIndex; i++) {
      frames[i].onload = frames[i].onerror = () => {
          if (++loaded === endIndex - startIndex && endIndex < config.frameCount) {
              setTimeout(() => loadBatch(endIndex), 10);
          }
      };
      
      const frameNumber = String(i + config.startIndex).padStart(config.padLength, '0');
      frames[i].src = config.imagePattern.replace('{index}', frameNumber);
  }
})(0);

function updateContent() {
  const scrollTop = window.scrollY;
  const specialSectionTop = specialSection.offsetTop;
  const specialSectionHeight = specialSection.offsetHeight;
  const specialSectionBottom = specialSectionTop + specialSectionHeight;
  const viewportHeight = window.innerHeight;
  const inSpecialSection = (scrollTop >= specialSectionTop) && 
                           (scrollTop < specialSectionBottom - viewportHeight);
  
  if (inSpecialSection) {
    fixedContent.classList.add('active');
    
    const specialSectionScrollable = specialSectionHeight - viewportHeight;
    const specialSectionScrollableFrames = (viewportHeight * 5) - viewportHeight;
    const specialProgress = Math.min((scrollTop - specialSectionTop) / specialSectionScrollableFrames, 1);
    //const specialProgress = Math.min((scrollTop - specialSectionTop) / specialSectionScrollable, 1);
    
    const frameIndex = Math.min(Math.floor(specialProgress * config.frameCount), config.frameCount - 1);
    frames.forEach((frame, i) => frame.style.display = i === frameIndex ? 'block' : 'none');
    
    const currentSection = Math.min(
        Math.floor((scrollTop - specialSectionTop) / (specialSectionScrollable / config.sectionCount)) + 1, 
        config.sectionCount
    );

    if (currentSection >= 5) {
      cl1Experience.classList.add('complete');
    } else {
      cl1Experience.classList.remove('complete');
    }
    
    slides.forEach(section => {
      section.classList.toggle('active', parseInt(section.dataset.section) === currentSection);
    });
  } else {
    fixedContent.classList.remove('active');
    fixedContent.removeAttribute('style');
  }

  if (scrollTop >= specialSectionBottom - viewportHeight) {
    fixedContent.classList.add('at-end');
  } else {
    fixedContent.classList.remove('at-end');
    
    if (!inSpecialSection) {
      slides.forEach(section => {
        section.classList.remove('active');
      });
    }
  }
  
  const fadeCalc = specialSectionBottom - (viewportHeight * 2);
  if (scrollTop > fadeCalc) {
    // const fadeOutProgress = Math.max((((specialSectionBottom - viewportHeight) / 0.67) - scrollTop) / viewportHeight * 1.5, 0);
    // imageContainer.style.opacity = fadeOutProgress > 0 ? fadeOutProgress.toFixed(2) : '0';
  } else {
    fixedContent.removeAttribute('style');
  }
}

updateContent();