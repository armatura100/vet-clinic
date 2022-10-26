import * as webpFunction from './modules/webpFunction.js';
webpFunction.isWebp();

const phonesMobileBtn = document.querySelector('.phones-mobile__btn');
const phonesMobileList = document.querySelector('.phones-mobile__list');

phonesMobileBtn.addEventListener('click', () => {
    phonesMobileList.classList.toggle('active');
});

const menuBtn = document.querySelector('.menu__btn');
const menuList = document.querySelector('.menu__list');
const menuLinks = document.querySelectorAll('.menu__link');
const body = document.body;

menuBtn.addEventListener('click', () => {
    menuBtn.classList.toggle('active');
    menuList.classList.toggle('active');
    body.classList.toggle('lock');
});

menuLinks.forEach(link => {
    link.addEventListener('click', () => {
        menuBtn.classList.remove('active');
        menuList.classList.remove('active');
        body.classList.remove('lock');
    });
});

import Swiper, { Navigation, Thumbs } from 'swiper';

if (document.querySelector('.services-slider__cards')) {
    const dots = new Swiper('.services-slider__cards', {
        modules: [Navigation],
        navigation: {
            nextEl: '.services-slider .swiper-button-next',
            prevEl: '.services-slider .swiper-button-prev',
        },
        slidesPerView: 6,
        spaceBetween: 13,
        loop: true,
        watchSlidesProgress: true,
        simulateTouch: false
    });
    new Swiper('.services-slider__display', {
        modules: [Thumbs],
        thumbs: {
            swiper: dots,
        },
        loop: true
    });
}

if (document.querySelector('.related-slider__body')) {
    new Swiper('.related-slider__body', {
        slidesPerView: 2,
        spaceBetween: 24
    });
}