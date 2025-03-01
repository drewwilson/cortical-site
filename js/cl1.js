const cl1Experience = document.querySelector('.cl1-experience');
const cl1ExperienceDeviceContainer = document.querySelector('.cl1-experience-device-container');
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
    const scrollPosition = window.scrollY;
    const specialSectionBottom = specialSection.offsetTop + specialSection.offsetHeight;
    const inSpecialSection = (scrollPosition >= specialSection.offsetTop) && 
                           (scrollPosition < specialSectionBottom - winHeight);

    if (scrollPosition > 100) {
      let adjPercent = 1 - Math.min((scrollPosition - 350) / 350, 1);
      if (adjPercent < 0) { adjPercent = 0; }
      cl1Hero.style.backgroundColor = `rgba(182, 186, 185, ${adjPercent})`;
    }

    if (inSpecialSection) {
      header.classList.add('in-cl1');
      cl1ExperienceDeviceContainer.classList.remove('show');
    } else {
      header.classList.remove('in-cl1');
    }

    if (!inSpecialSection && scrollPosition < specialSection.offsetTop) {
      cl1ExperienceDeviceContainer.classList.add('show');
    }

    if (!ticking) {
      requestAnimationFrame(() => {
        updateContent();
        ticking = false;
      });
      ticking = true;
    }

    handleScroll()
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
}

updateContent();

document.addEventListener('DOMContentLoaded', function() {
  requestAnimationFrame(function() {
    console.log(window.scrollY);
    if (window.scrollY < specialSection.offsetTop) {
      cl1ExperienceDeviceContainer.classList.add('show');
    }
  });
});


const heroElement = document.querySelector('.cl1-experience-device');
const viewportHeight = window.innerHeight;

function handleScroll() {
    const viewportWidth = window.innerWidth;
    const scrollPosition = window.scrollY;
    const scrollProgress = Math.min(scrollPosition / viewportHeight, 1);
    
    const startSize = 80;
    const frameMaxWidth = 1600;
    const frameScale = (viewportWidth < frameMaxWidth) ? viewportWidth / frameMaxWidth : 1;
    const frameToDeviceScale = 0.22;
    const endSizePx = (frameMaxWidth * frameScale) * frameToDeviceScale;
    
    if (scrollProgress < 1) {
        const endSizeVmin = (endSizePx / Math.min(window.innerWidth, window.innerHeight)) * 100;
        const currentSize = startSize - ((startSize - endSizeVmin) * scrollProgress);
        
        let initialOffset = 90;
        if (viewportWidth < 800) {
          initialOffset = 75;
        }
        if (viewportWidth < 500) {
          initialOffset = 70;
        }
        if (viewportWidth < 400) {
          initialOffset = 60;
        }
        const currentOffset = initialOffset * (1 - scrollProgress);
        
        heroElement.style.width = `${Math.min(currentSize, startSize)}vmin`;
        heroElement.style.height = `${Math.min(currentSize, startSize)}vmin`;
        heroElement.style.transform = `translateY(${Math.min(currentOffset, initialOffset)}vh)`;
    } else {
        heroElement.style.width = `${endSizePx}px`;
        heroElement.style.height = `${endSizePx}px`;
        heroElement.style.transform = 'translateY(0)';
    }
}

handleScroll();

window.addEventListener('resize', () => {
    handleScroll();
});