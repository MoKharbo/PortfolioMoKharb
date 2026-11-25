// Featured project carousel
const carousel = document.querySelector('#projectCarousel');
const slides = carousel ? Array.from(carousel.querySelectorAll('.project-slide')) : [];
const dots = carousel ? Array.from(carousel.querySelectorAll('.carousel-dot')) : [];
const previousButton = carousel?.querySelector('.carousel-previous');
const nextButton = carousel?.querySelector('.carousel-next');
const header = document.querySelector('header');
let activeSlide = 0;
let carouselTimer;

const showSlide = (slideIndex) => {
	if (!slides.length) return;

	activeSlide = (slideIndex + slides.length) % slides.length;
	slides.forEach((slide, index) => {
		slide.classList.toggle('is-active', index === activeSlide);
	});
	dots.forEach((dot, index) => {
		const isActive = index === activeSlide;
		dot.classList.toggle('is-active', isActive);
		dot.setAttribute('aria-selected', String(isActive));
	});
};

const restartCarousel = () => {
	window.clearInterval(carouselTimer);
	if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
		carouselTimer = window.setInterval(() => showSlide(activeSlide + 1), 6000);
	}
};

if (carousel && slides.length) {
	dots.forEach((dot, index) => {
		dot.addEventListener('click', () => {
			showSlide(index);
			restartCarousel();
		});
	});

	previousButton?.addEventListener('click', () => {
		showSlide(activeSlide - 1);
		restartCarousel();
	});

	nextButton?.addEventListener('click', () => {
		showSlide(activeSlide + 1);
		restartCarousel();
	});

	carousel.addEventListener('mouseenter', () => window.clearInterval(carouselTimer));
	carousel.addEventListener('mouseleave', restartCarousel);
	restartCarousel();
}

const updateHeader = () => {
	const isScrolled = window.scrollY > 8;

	header?.classList.toggle('menu-visible', isScrolled);
	header?.classList.toggle('is-scrolled', window.scrollY > 24);
};

window.addEventListener('scroll', updateHeader, { passive: true });
updateHeader();

