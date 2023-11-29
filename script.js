// Get form elements
const form = document.getElementById('myForm');
const nameField = document.getElementById('form-fname');
const emailFilled = document.getElementById('form-email');
const commentsField = document.getElementById('form-comments');
const charCountdown = document.getElementById('charCountdown');
const nameOutput = document.getElementById('fname-error')
const emailOutput = document.getElementById('email-error');
const commentsOutput = document.getElementById('comment-error');
const maxCharCount = 100;

let formErrors = [];

function inputValidate() {
    const nameFieldValid  = nameField.validity;
    const emailFilledValid = emailFilled.validity;
    const commentsFieldValid = commentsField.validity;
    nameField.setCustomValidity('');
    emailFilled.setCustomValidity('');
    commentsField.setCustomValidity('');
    // nameOutput.textContent = "";
    // commentsOutput.textContent ="";
    // emailOutput.textContent = "";
    const specialCharacterRegex = /[@#$%^&*()_+{}\[\]:;<>~\\/-]/g;

    if (nameFieldValid.valueMissing) {
        nameOutput.classList.remove('fade-out');
        void nameOutput.offsetWidth;
        nameField.setCustomValidity("Please fill out the required field");
        nameOutput.textContent = nameField.validationMessage;
        formErrors.push({field: nameFieldValid.id, message: nameField.validationMessage});
        nameOutput.classList.add("fade-out");
    }
    if(nameFieldValid.patternMismatch) {
        nameOutput.classList.remove('fade-out');
        void nameOutput.offsetWidth;
        nameField.setCustomValidity("Message contains characters that are not letters and space");
        nameOutput.textContent = nameField.validationMessage;
        formErrors.push({field: nameFieldValid.id, message: nameField.validationMessage});
        nameOutput.classList.add("fade-out");
    }
    if(emailFilledValid.valueMissing) {
        emailOutput.classList.remove('fade-out');
        void emailOutput.offsetWidth;
        emailFilled.setCustomValidity("Please fill out the required field");
        emailOutput.textContent = emailFilled.validationMessage;
        formErrors.push({field: emailFilledValid.id, message: emailFilled.validationMessage});
        emailOutput.classList.add('fade-out');
    }
    if(emailFilledValid.typeMismatch) {
        emailOutput.classList.remove('fade-out');
        void emailOutput.offsetWidth;
        emailFilled.setCustomValidity("Invalid email format");
        emailOutput.textContent = emailFilled.validationMessage;
        formErrors.push({field: emailFilledValid.id, message: emailFilled.validationMessage});
        emailOutput.classList.add('fade-out');
    }
    if (commentsFieldValid.valueMissing) {
        commentsOutput.classList.remove('fade-out');
        void commentsOutput.offsetWidth;
        commentsField.setCustomValidity("Please fill out the required field");
        commentsOutput.textContent = commentsField.validationMessage;
        formErrors.push({field: commentsFieldValid.id, message: commentsField.validationMessage});
        commentsOutput.classList.add('fade-out');
    }
    if(specialCharacterRegex.test(commentsField.value)) {
        commentsOutput.classList.remove('fade-out');
        void commentsOutput.offsetWidth;
        commentsField.setCustomValidity("You have non typical characters.");
        commentsOutput.textContent = commentsField.validationMessage;
        formErrors.push({field: commentsFieldValid.id, message: commentsField.validationMessage});
        commentsOutput.classList.add('fade-out');
    }

}

// Array to store form validation errors

function getFormErrors() {
    if(formErrors.length > 0) {
        const formErrorsField = document.getElementById('possible-bot');
        const errorObjects = formErrors.map(error => ({ field: error.field, message: error.message }));
        const errorMessagesJson = JSON.stringify(errorObjects);
        formErrorsField.value = errorMessagesJson;
        formErrors = [];
    }
}

// Event listener for character countdown
commentsField.addEventListener('input', function () {
    inputValidate();
    const remainingChars = maxCharCount - this.value.length;
    charCountdown.textContent = `${remainingChars} characters remaining`;

    // Change style based on remaining characters
    if (remainingChars < 20) {
        charCountdown.classList.add('warn');
    } else {
        charCountdown.classList.remove('warn', 'error');
    }

    if (remainingChars < 0) {
        charCountdown.classList.add('error');
    }
});

nameField.addEventListener("change", inputValidate);

emailFilled.addEventListener("change", inputValidate);

commentsField.addEventListener("change", inputValidate);



function submitForm(event) {
    console.log('Submit Form function called');
    inputValidate();
    
    if(!form.checkValidity()) {
        console.log("Form not valid")
        event.preventDefault();
    }
    getFormErrors();
}

// Add event listener for form submission
form.addEventListener("submit", submitForm);

// Dark Theme Part
const darkMode = localStorage.getItem('darkMode') === 'true';

if (darkMode) {
    document.body.classList.add('dark-mode');
}

// Event listener for dark mode toggle
document.getElementById('darkModeToggle').addEventListener('click', function () {
    document.body.classList.toggle('dark-mode');
    const darkMode = document.body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', darkMode);
});
