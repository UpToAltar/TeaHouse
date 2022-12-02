import { showSuccessToastSignIn, toast } from './toast.js';
import { showSuccessToast } from './toast.js';
import { showErrorToast } from './toast.js';
import { showErrorToastSignIn } from './toast.js';

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
function handleForm(){
    const signUp  = $('.sign-up-show')
    const signIn = $('.sign-in-show')
    const overlayLogin = $('.overlay-login')
    const login = $('.login')
    const formSignUp = document.getElementById("form-signup")
    const formSignIn = document.getElementById("form-signin");
    const signUpClose = $(".signup-close")
    const signInClose = $(".signin-close")
    const signUpMoblie = $('.mt__header-menu-register')
    const signInMoblie = $('.mt__header-menu-login')
    const helpSignIn = $(".signin-help-show-signup");
    const helpSignUp = $(".signup-help-show-signin")

    helpSignIn.onclick = () => {
        formSignIn.style.display = "none";
        formSignUp.style.display = "block";
    }
    helpSignUp.onclick = () => {
        formSignUp.style.display = "none";
        formSignIn.style.display = "block";
    };
    signUpClose.onclick = () => {
        overlayLogin.style.display = "none";
        login.style.display = "none";
        formSignUp.style.display = "none";
    }
    signInClose.onclick = () => {
        overlayLogin.style.display = "none";
        login.style.display = "none";
        formSignIn.style.display = "none";
    };
    signUp.onclick = () => {
        
        overlayLogin.style.display = 'block'
        login.style.display = 'flex'
        formSignUp.style.display = 'block'
    }
    signIn.onclick = () => {
        overlayLogin.style.display = "block";
        login.style.display = "flex";
        formSignIn.style.display = "block";
        formSignUp.style.display = "none";
    };
    signUpMoblie.onclick = () => {
        overlayLogin.style.display = "block";
        login.style.display = "flex";
        formSignUp.style.display = "block";
    };
    signInMoblie.onclick = () => {
        overlayLogin.style.display = "block";
        login.style.display = "flex";
        formSignIn.style.display = "block";
        formSignUp.style.display = "none";
    };
}
handleForm()

function Validator(options) {
    const formSignUpElement = $('#form-signup')
    
    const formSignInElement = $("#form-signin");
    if(formSignUpElement ){
        const inputSignUpElement = Array.from(formSignUpElement.querySelectorAll('input'))       
        inputSignUpElement.forEach(
            (input) => {
                input.onblur = () => {
                    if(!input.value.trim()){                       
                        showError(input, 'Vui lòng nhập trường này')                        
                    } else{                       
                        showSuccess(input , '');
                        checkEmail(input, "Vui lòng nhâp đúng email");
                        checkPassword(input, 6)
                        checkConfirmPassword(input, 'Vui lòng nhập đúng mật khẩu');
                    }
                }
                input.oninput = function(){
                    oninput(input, '')
                }
            }
        )

        // Submit
        formSignUpElement.onsubmit = (e) => {
            e.preventDefault()
            
            checkEmtyErorr(inputSignUpElement);
            saveValueSignUp()
        }
    }  

    if(formSignInElement){
        const inputSignInElement = Array.from(formSignInElement.querySelectorAll('input'))       

        inputSignInElement.forEach(
            (input) => {
                input.onblur = () => {
                    if(!input.value.trim()){                       
                        showError(input, 'Vui lòng nhập trường này')                        
                    } else{                       
                        showSuccess(input , '');
                    }
                }
                input.oninput = function(){
                    oninput(input, '')
                }
            }
        )

        // Submit
        formSignInElement.onsubmit = (e) => {
            e.preventDefault()
            checkEmtyErorr(inputSignInElement);
            checkValueSignIn()
        }
    }
}

function showError(input, message1){
    const message = input.parentElement.querySelector('.form-message')
    message.innerHTML = message1
    input.classList.add('invalid')
}
function showSuccess(input, message2) {
    const message = input.parentElement.querySelector(".form-message");
    message.innerHTML = message2;
    input.classList.remove("invalid");
    input.classList.add("success");
}
function oninput(input, message3){
    const message = input.parentElement.querySelector(".form-message");
    message.innerHTML = message3;
    input.classList.remove("invalid");
}
function checkEmail(input, message1){
    if (input.name == "email-signup" || input.name == "email-signin") {
        const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        const message = input.parentElement.querySelector(".form-message");

        if (!regex.test(input.value.trim())) {
            showError(input, message1);
            message.innerHTML = message1;
        } else {
            showSuccess(input, "");
        }
    }
    
}
function checkPassword(input, min){
    if(input.name == 'password-signup' || input.name == 'password-signin'){
        const message = input.parentElement.querySelector(".form-message");
        
        if(input.value.length < min){
            message.innerHTML = `Vui lòng nhập ít nhất ${min} kí tự`
        }
    }
}
function checkConfirmPassword(input, message1){
    if(input.name == 'confirm-password-signup' || input.name == 'confirm-password-signin'){
        const message = input.parentElement.querySelector(".form-message");
        const passwordSignUpValue = $('#password-signup').value
        if(!(input.value == passwordSignUpValue)){
            message.innerHTML = message1
        }
    }
}

// Hàm submit
function checkEmtyErorr(listInput){
    listInput.forEach((input) => {
        if (!input.value.trim()) {
            showError(input, "Vui lòng nhập trường này");
        } else {
            showSuccess(input, "");
            checkEmail(input, "Vui lòng nhâp đúng email");
        }
    })
}
// Hàm saveValue
function saveValueSignUp(){
    const username = $("#fullname-signup").value;
    const email = $("#email-signup").value;
    const password = $("#password-signup").value;
    const confirmPassword = $("#confirm-password-signup").value;
    if(username.trim() && email.trim() && password.trim() && confirmPassword.trim() && password == confirmPassword){
        const user= {
            username: username,
            email: email,
            password: password
        }
        localStorage.setItem(username, JSON.stringify(user));
        showSuccessToast();
        const formSignUp = document.getElementById("form-signup");
        const formSignIn = document.getElementById("form-signin");
        formSignUp.style.display = 'none';
        formSignIn.style.display = 'block';
    }
}
// Hàm check value đăng nhập
function checkValueSignIn() {
    const username = $("#fullname-signin").value;
    const password = $("#password-signin").value;
    if(username.trim() && password.trim() ){
        const checkList = JSON.parse(localStorage.getItem(username)) ?? '';
        console.log(checkList)
        if(username == checkList.username && password == checkList.password){
            showSuccessToastSignIn()
            setTimeout(function() {
                const overlayLogin = $(".overlay-login");
                const login = $(".login");
                overlayLogin.style.display = 'none';
                login.style.display = 'none';
            },1000)
        } else  {
            showErrorToastSignIn()
        }
    }
}

Validator()

