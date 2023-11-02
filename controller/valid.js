// Email validation
const validEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return emailRegex.test(email);
};

// Password validation
const validPass = (password) => {
    // Password should be at least 8 characters long and include at least one digit, one special character, one uppercase letter, and one lowercase letter.
    const passwordRegex = /^(?=.*\d)(?=.*\W+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).{8,}$/;
    return passwordRegex.test(password);
};

// Mobile validation (example: 10-digit phone number)
const validPhone = (mobile) => {
    // You can specify a regular expression for mobile validation here.
    // Example: 10-digit phone number validation
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(mobile);
};

module.exports = { validEmail, validPass, validPhone };
