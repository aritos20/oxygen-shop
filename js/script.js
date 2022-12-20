const burgerMenu = document.querySelector('#burger-menu');
const dropDown = document.querySelector('.header__nav-options');
const imgBurgerMenu = document.querySelector('.header__burger-menu');
const imgXMenu = document.querySelector('.header__x-menu');

burgerMenu.addEventListener('click', () => {
    dropDown.classList.toggle('active');
    imgBurgerMenu.classList.toggle('active');
    imgXMenu.classList.toggle('active');
});
