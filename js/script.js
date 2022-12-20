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

// Form validation

const formName = document.querySelector('#name');
const formEmail = document.querySelector('#email');
const emailRegexValidation = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

formName.addEventListener('input', () => {
    if (formName.value.length >= 2 && formName.value.length <= 100) {
        formName.style.borderBlockColor = "green";
    } else {
        formName.style.borderBlockColor = "red";
    }
    if (!formName.value.length) {
        formName.style.borderBlockColor = "#A5A5A5";
    }
});

formEmail.addEventListener('input', () => {
    console.log(typeof formEmail.value)
    if (emailRegexValidation.test(formEmail.value)) {
        formEmail.style.borderBlockColor = "green";
    } else {
        formEmail.style.borderBlockColor = "red";
    } if (!formEmail.value.length) {
        formEmail.style.borderBlockColor = "#A5A5A5";
    }
});