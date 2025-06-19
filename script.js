const slides = document.querySelectorAll('#slider1 .slide');
const texts = document.querySelectorAll('.slider1-text');
const dotsContainer = document.querySelector('#slider1 .dots');
const slidesContainer = slides[0].parentElement;

let currentIndex = 0;
let isClickScrolling = false;

// Dots dynamisch bauen
slides.forEach((_, i) => {
  const btn = document.createElement('button');
  if (i === 0) btn.classList.add('active');
  btn.addEventListener('click', () => {
    goToSlide(i);
  });
  dotsContainer.appendChild(btn);
});

// Initial: Ersten Text aktivieren
texts.forEach((text, i) => {
  text.classList.toggle('active', i === 0);
});

function goToSlide(index) {
  const slideWidth = slides[0].clientWidth;
  isClickScrolling = true; // Scroll kommt vom Klick

  slidesContainer.scrollTo({
    left: slideWidth * index,
    behavior: 'smooth',
  });

  // Dot + Text sofort updaten
  dotsContainer.querySelectorAll('button').forEach((btn, i) => {
    btn.classList.toggle('active', i === index);
  });

  texts.forEach((text, i) => {
    text.classList.toggle('active', i === index);
  });

  currentIndex = index;

  // Flag nach kurzer Verzögerung zurücksetzen (Scroll ist dann fertig)
  setTimeout(() => {
    isClickScrolling = false;
  }, 500);
}

// Scroll Event - nur wenn nicht Klick Scroll
slidesContainer.addEventListener('scroll', () => {
  if (isClickScrolling) return; // Ignorier wenn Klick noch am Scrollen

  const slideWidth = slides[0].clientWidth;
  const scrolledIndex = Math.round(slidesContainer.scrollLeft / slideWidth);

  if (scrolledIndex !== currentIndex) {
    goToSlide(scrolledIndex);
  }
});

// Prev/Next Buttons ansteuern (für Testimonials)
const prevBtn = document.querySelector('#testimonials .testimonial-prev');
const nextBtn = document.querySelector('#testimonials .testimonial-next');

prevBtn.addEventListener('click', () => {
  let newIndex = currentIndex - 1;
  if (newIndex < 0) newIndex = slides.length - 1;
  goToSlide(newIndex);
});

nextBtn.addEventListener('click', () => {
  let newIndex = currentIndex + 1;
  if (newIndex >= slides.length) newIndex = 0;
  goToSlide(newIndex);
});





// Testimonials Buttons Funktionalität sauber & isoliert

document.addEventListener('DOMContentLoaded', () => {
  const testimonialSlider = document.querySelector('#testimonials .testimonial-slider');
  const testimonialSlidesContainer = testimonialSlider.querySelector('.testimonial-slides');
  const testimonialSlides = testimonialSlider.querySelectorAll('.testimonial-slide');
  const prevBtn = testimonialSlider.querySelector('.testimonial-prev');
  const nextBtn = testimonialSlider.querySelector('.testimonial-next');

  let currentIndex = 0;
  let isClickScrolling = false;

  function goToSlide(index) {
    // Wrap-around Logic für Infinite Loop:
    if (index < 0) index = testimonialSlides.length - 1;
    if (index >= testimonialSlides.length) index = 0;

    const slideWidth = testimonialSlides[0].clientWidth;
    isClickScrolling = true;

    testimonialSlidesContainer.scrollTo({
      left: slideWidth * index,
      behavior: 'smooth',
    });

    currentIndex = index;

    setTimeout(() => {
      isClickScrolling = false;
    }, 500);
  }

  prevBtn.addEventListener('click', () => {
    goToSlide(currentIndex - 1);
  });

  nextBtn.addEventListener('click', () => {
    goToSlide(currentIndex + 1);
  });

  testimonialSlidesContainer.addEventListener('scroll', () => {
    if (isClickScrolling) return;

    const slideWidth = testimonialSlides[0].clientWidth;
    const scrolledIndex = Math.round(testimonialSlidesContainer.scrollLeft / slideWidth);

    if (scrolledIndex !== currentIndex) {
      currentIndex = scrolledIndex;
    }
  });
});

window.addEventListener("load", () => {
  const overlay = document.getElementById("intro-overlay");
  
  setTimeout(() => {
    overlay.remove();
  }, 3000); // nach 3 Sekunden entfernen
});

const features = document.querySelectorAll('.feature');

function checkFeatures() {
  const triggerBottom = window.innerHeight * 0.85;

  features.forEach((feature, index) => {
    const featureTop = feature.getBoundingClientRect().top;

    if (featureTop < triggerBottom) {
      // Verzögerung je nach Index für "staggered" Effekt
      setTimeout(() => {
        feature.classList.add('visible');
      }, index * 200); // 200ms Delay pro Feature
    } else {
      feature.classList.remove('visible');
    }
  });
}

window.addEventListener('scroll', checkFeatures);
checkFeatures();

var swiperCarousel = new Swiper(".mySwiper", {
  effect: "coverflow",
  loop: true,
  grabCursor: true,
  centeredSlides: true,
  slidesPerView: 1,
  simulateTouch: true,      // <- Touch/Drag aktiv
  allowTouchMove: true,     // <- Touch/Drag aktiv
  coverflowEffect: {
    rotate: 0,
            stretch: 0,
            depth: 150,
            modifier: 1.5,
            slideShadows: true,
  }
});

