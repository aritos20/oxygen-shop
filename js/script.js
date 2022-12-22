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
});

// Form validation

const formName = document.querySelector('#name');
const formEmail = document.querySelector('#email');
const sendButton = document.querySelector('#send-form');
const checkbox = document.querySelector('#checkbox');
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
    if (!checkbox.checked) {
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