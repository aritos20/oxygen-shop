// email regex for the validation

const emailRegexValidation = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

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

// Scroll percentage bar and modal functionality

const progressBar = document.querySelector('.progress-bar');
const body = document.querySelector('body');
const modal = document.querySelector('#modal');
const modalOverlay = document.querySelector('#modal-overlay');
let modalSwitch = false;

const myTimeout = setTimeout(() => {
    if (!sessionStorage.getItem("modalStatus")) {
        modal.classList.toggle('hidden');
        modalOverlay.classList.toggle('hidden');
        sessionStorage.setItem("modalStatus", true);
    }
}, 5000);

const scrollProgressBar = () => {
    let scrollDistance = -(body.getBoundingClientRect().top);
    let progressPercentage = (scrollDistance / (body.getBoundingClientRect().height - document.documentElement.clientHeight)) * 100;
    let val = Math.floor(progressPercentage);

    progressBar.style.width = val + '%';

    if (val < 0) {
        progressBar.style.width = '0%';
    }

    if (val >= 25 && !sessionStorage.getItem("modalStatus")) {
        clearTimeout(myTimeout);
        modal.classList.toggle('hidden');
        modalOverlay.classList.toggle('hidden');
        sessionStorage.setItem("modalStatus", true);
    }
};

window.addEventListener('scroll', scrollProgressBar);

const closeModalButton = document.querySelector('.modal__btn-close');
closeModalButton.addEventListener('click', () => {
    modal.classList.toggle('hidden');
    modalOverlay.classList.toggle('hidden');
});

document.addEventListener("keydown", (e) => {
    if (e.key === 'Escape') {
        modal.classList.toggle('hidden');
        modalOverlay.classList.toggle('hidden');
    }
});

modalOverlay.addEventListener('click', () => {
    if (sessionStorage.getItem("modalStatus")) {
        modal.classList.toggle('hidden');
        modalOverlay.classList.toggle('hidden');
    }
});

const modalEmail = document.querySelector('#modal-email');

modalEmail.addEventListener('input', () => {
    if (emailRegexValidation.test(modalEmail.value)) {
        modalEmail.style.borderBlockColor = 'green';
    } else {
        modalEmail.style.borderBlockColor = 'red';
    } if (!modalEmail.value.length) {
        modalEmail.style.borderBlockColor = '#ddd';
    }
})

// Arrow to the top

const arrow = document.querySelector('.arrow');

arrow.addEventListener('click', () => {
    setTimeout(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        })
    }, 200);
});

// Form validation

const formName = document.querySelector('#name');
const formEmail = document.querySelector('#email');
const sendButton = document.querySelector('#send-form');
const checkbox = document.querySelector('#checkbox');


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
    if (emailRegexValidation.test(formEmail.value)) {
        formEmail.style.borderBlockColor = "green";
    } else {
        formEmail.style.borderBlockColor = "red";
    } if (!formEmail.value.length) {
        formEmail.style.borderBlockColor = "#A5A5A5";
    }
});

sendButton.addEventListener('click', () => {
    if (!emailRegexValidation.test(formEmail.value) || !(formName.value.length >= 2 && formName.value.length <= 100)) {
        alert('Please enter a valid name or email');
    }
    else if (!checkbox.checked) {
    alert('Please accept the terms and conditions by marking the checkbox');
    }
});

// fetch api use for the form data

const jsonPlaceholder = async () => {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify({
                name: formName.value,
                email: formEmail.value
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',  
            },
        })
        if (response.ok) {
            const jsonResponse = await response.json();
        }
    } catch (error) {
        alert(error);
    }
}

sendButton.addEventListener('click', jsonPlaceholder);

// Api to get currencies changes for EUR

const selectedCurrency = document.querySelector('#currencies');
const basicPlan = document.querySelector('#basic_plan');
const professionalPlan = document.querySelector('#professional_plan');
const premiumPlan = document.querySelector('#premium_plan');

function changePriceByCurrency(currencyValue) {
    let symbolCurrency;
    switch (selectedCurrency.value) {
        case 'usd':
            symbolCurrency = '$';
            break;
        case 'eur':
            symbolCurrency = '€';
            break;
        case 'gbp':
            symbolCurrency = '£';
            break;
    }

    if (selectedCurrency.value !== 'usd') {
        basicPlan.innerHTML = `${symbolCurrency} 0`;
        professionalPlan.innerHTML = `${symbolCurrency} ${(currencyValue * 25).toFixed(0)}`;
        premiumPlan.innerHTML = `${symbolCurrency} ${(currencyValue * 60).toFixed(0)}`
    } else {
        basicPlan.innerHTML = `${symbolCurrency} 0`;
        professionalPlan.innerHTML = `${symbolCurrency} ${(currencyValue * 25)}`;
        premiumPlan.innerHTML = `${symbolCurrency} ${(currencyValue * 60)}`;
    }
}

const currencyApi = async () => {
    try {
        const response = await fetch(`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/usd/${selectedCurrency.value}.json`);

        if (response.ok) {
            const jsonResponse = await response.json();
            const formattedCurrency = jsonResponse[selectedCurrency.value];
            changePriceByCurrency(formattedCurrency.toFixed(2));
        }
    } catch (error) {
        console.log(error); 
    }
}

selectedCurrency.addEventListener('change', currencyApi);

// Images slider

class Slider {
    constructor(sliderId) {
        this._sliderId = sliderId;
    }

    showSlides(n) {
        let i;
        let slides = document.querySelectorAll(".slider__imgs");
        let dots = document.getElementsByClassName("dots__slider");
        if (n > slides.length) {
            n = 1;
            slideIndex = 1;
        }
        if (n < 1) {
            n = slides.length;
            slideIndex = slides.length;
        }
        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none"; 
        }
        for (i = 0; i < dots.length; i++) {
            dots[i].className = dots[i].className.replace(" active", "");
        }
        slides[n - 1].style.display = "block";
        dots[n - 1].className += " active";
    }
}

let slideIndex = 1;
const sliderId = document.querySelector('#slider');
const prevButton = document.querySelector("#prev");
const nextButton = document.querySelector("#next");

let slider = new Slider(sliderId);

slider.showSlides(slideIndex);
prevButton.addEventListener('click', () => slider.showSlides(slideIndex -= 1));
nextButton.addEventListener('click', () => slider.showSlides(slideIndex += 1));
setInterval(() => slider.showSlides(slideIndex += 1), 5000);