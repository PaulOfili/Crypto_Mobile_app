import zxcvbn from 'zxcvbn';

export function checkEmail(email){
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
}

export function checkPhoneNumber(phone) {
    return /^[0]\d{10}$/i.test(phone);
}

export function checkPassword(password) {
    return zxcvbn(password).score > 0;
}

export function checkConfirmPassword(password, confirmPassword) {
    return password === confirmPassword;
}