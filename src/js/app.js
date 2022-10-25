import * as flsFunctions from './modules/functions.js';
flsFunctions.isWebp()

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