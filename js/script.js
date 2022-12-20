// Burger menu

const burgerMenu = document.querySelector('#burger-menu');
const dropDown = document.querySelector('.header__nav-options');
const imgBurgerMenu = document.querySelector('.header__burger-menu');
const imgXMenu = document.querySelector('.header__x-menu');

burgerMenu.addEventListener('click', () => {
    dropDown.classList.toggle('active');
    imgBurgerMenu.classList.toggle('active');
    imgXMenu.classList.toggle('active');
});

// Scroll percentage bar 

const progressBar = document.querySelector('.progress-bar');
const body = document.querySelector('body');

const scrollProgressBar = () => {
    let scrollDistance = -(body.getBoundingClientRect().top);
    let progressPercentage = (scrollDistance / (body.getBoundingClientRect().height - document.documentElement.clientHeight)) * 100;
    let val = Math.floor(progressPercentage);

    progressBar.style.width = val + '%';

    if (val < 0) {
        progressBar.style.width = '0%';
    }
};

window.addEventListener('scroll', scrollProgressBar);

// Arrow to the top

const arrow = document.querySelector('.arrow');

arrow.addEventListener('click', () => {
    setTimeout(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        })
    }, 200);
})