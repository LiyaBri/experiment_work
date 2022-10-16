import * as flsFunctions from "./modules/functions.js";
//import { gsap } from 'gsap';

flsFunctions.isWebP();

//import Swiper, { Navigation, Pagination } from 'swiper';


const gallery = document.querySelector('.home__gallery'),
		loading = document.querySelector('.home__title span');
window.onload = function() {
	setTimeout(function() {
		gallery.classList.add('loaded');
		loading.style.opacity = '0';

		Draggable.create('.home__gallery', {
			bounds: '.home',
			inertia: true
		})
	})

}

// After update OptimizedHTML5
let mouseX, mouseY, posX, posY;

document.addEventListener('DOMContentLoaded', () => {

	const home = document.querySelector('.home');

	home.addEventListener('mousemove', e => {
		mouseCoords(e);
		cursor.classList.remove('hidden');
		aura.classList.remove('hidden');
	})

	//cursor
	const cursor = document.getElementById('cursor'),
			aura = document.getElementById('aura'),
			links = document.querySelectorAll('.home__item');
	mouseX = 0; mouseY = 0; posX = 0; posY = 0;

	function mouseCoords(e) {
		mouseX = e.pageX;
		mouseY = e.pageY; 

		gsap.to({}, .01, {
			repeat: -1,
			onRepeat: () => {
				posX += (mouseX - posX) / 5;
				posY += (mouseY - posY) /5;

				gsap.set(cursor, {
					css:  {
						left: mouseX,
						top: mouseY
					}
				})

				gsap.set(aura, {
					css:  {
						left: posX - 24,
						top: posY - 24
					}
				})
			}
		})
	}

	for (let i = 0; i < links.length; i++) {
		links[i].addEventListener('mouseover', () => {
			cursor.classList.add('active');
			aura.classList.add('active');
		})

		links[i].addEventListener('mouseout', () => {
			cursor.classList.remove('active');
			aura.classList.remove('active');
		})
	}

	home.addEventListener('mouseout', () => {
		cursor.classList.add('hidden');
		aura.classList.add('hidden');
	})

})

const sliderMain = new Swiper('.gallery_main', {
	freeMode: true,
	centeredSlides: true,
	mousewheel: true,
	parallax: true,
	breakpoints: {
		0: {
			slidesPerView: 2.5,
			spaceBetween: 20
		},
		680: {
			slidesPerView: 3.5,
			spaceBetween: 60
		}
	}
})

const sliderBg = new Swiper('.gallery_bg', {
	centeredSlides: true,
	parallax: true,
	spaceBetween: 60,
	slidesPerView: 3.5
})

sliderMain.controller.control = sliderBg

document.querySelectorAll('.gallery__item').forEach(item => {
	item.addEventListener('click', event => {
		item.classList.toggle('opened');
	})
});

let desc = document.querySelector('.gallery__description')
sliderMain.on('slideChange', e => {
	sliderMain.activeIndex > 0 ? desc.classList.add('hidden') : desc.classList.remove('hidden')
})

