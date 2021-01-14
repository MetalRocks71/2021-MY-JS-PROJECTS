const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

//? Show input error message

function showError(input, message) {

    const formControl = input.parentElement;
    formControl.className = 'form-control error'; // This will add the error to show red when click the submit button
    const small = formControl.querySelector('small');
    small.innerText = message;

}

//? Show success Outline

function showSuccess(input) {

    const formControl = input.parentElement;
    formControl.className = 'form-control success'; // This will add the error to show red when click the 

};
//? check Email is valid

function checkEmail(input) {

    const regularExpr = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    // return re.test(String(email).toLowerCase());
    if (regularExpr.test(input.value.trim())) {
        showSuccess(input)
    } else {

        showError(input, `Email is not valid`);
    }
};

//? check password match

function checkPassword(input1, input2) {

    if (input1.value != input2.value) {

        showError(input2, 'Passwords do not match');

    };
};

//? check required Fields

function checkRequired(inputArray) {

    inputArray.forEach(function (input) {

        if (input.value.trim() === '') {
            // console.log(input);
            showError(input, ` ${getFieldName(input)} is required`);
        } else {

            showSuccess(input);
        }
    });

};
//? Get FieldName to call the first letter Uppercase and add the slice() to get the rest of the word.

function getFieldName(input) {

    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

//? Check length input

function checkLength(input, min, max) {

    if (input.value.length < min) {

        showError(input, `${getFieldName(input)} must be at least ${min} characters `);

    } else if (input.value.length > max) {

        showError(input, `${getFieldName(input)} must be less than ${max} characters`);
    } else {
        showSuccess(input)
    }
};

//? Event listener
form.addEventListener('submit', function (element) {

    element.preventDefault(); // prevent the submit button to react on the click (flashing)

    //! 1st way
    // if (username.value === '') {

    //     showError(username, 'Username is required');
    // } else

    // {
    //     showSuccess(username);
    // }
    // if (email.value === '') {

    //     showError(email, 'E-Mail is required');

    // } else if (!isValidEmail(email.value)) {

    //     showError(email, 'E-mail is not valid');
    // } else

    // {
    //     showSuccess(email);
    // }

    // if (password.value === '') {

    //     showError(password, 'Password is required');
    // } else

    // {
    //     showSuccess(password);
    // }

    // if (password2.value === '') {

    //     showError(password2, 'Pleases confirm your password');
    // } else

    // {
    //     showSuccess(password2);
    // }


    //! or shortest way instead of the if else function()

    checkRequired([username, email, password, password2]);
    checkLength(username, 3, 15);
    checkLength(password, 6, 25);
    checkEmail(email);
    checkPassword(password, password2);

});