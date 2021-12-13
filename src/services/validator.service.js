function isString(options) {
    return typeof options.value === 'string'
        || options.message
        || `${options.fieldName} must be a string`;
}

function isEmail(options) {
    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;;
    return regex.test(options.value)
        || options.message
        || `${options.fieldName} must be a valid email address`;
}

function min(options) {
    const number = options.number || 6;
    return !options.value || options.value.length >= number
        || options.message
        || `${options.fieldName} should be at least ${number} characters`;
}

function required(options) {
    return options.value != ''
        || options.message
        || `${options.fieldName} is required`;
}

function alphaNum(options) {
    return /^[a-z0-9-_ ]+$/i.test(options.value)
        || options.message
        || `${options.fieldName} must contain only letters, numbers, hyphen (-), or underscore (_)`;
}

function isSameAs(options) {
    return options.value === options.obj[options.target]
        || options.message
        || `${options.fieldName} does not match ${options.target}`;
}

async function involveLetterAndNumberAndSpecialCharacter(options) {
    const { value } = options;
    var pattern = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[-+_!@#$%^&*.,?]).+$");
    if (pattern.test(value))
        return true;
    return "Password should include at least 1 uppercase, 1 lowercase, 1 special character, and 1 number."
}

const schema = {
    username: [
        { validator: required, options: { message: 'Username is required.' } },
        { validator: isString },
        { validator: alphaNum, options: { message: 'Username must contain only letters, numbers, hyphen (-), or underscore (_)' } },
        { validator: min, options: { number: 6, message: 'Username should be at least 6 characters' } },
    ],
    email: [
        { validator: isString },
        { validator: required, options: { message: 'Email is required' } },
        { validator: isEmail, options: { message: 'Email is not valid' } },
    ],
    firstname: [
        { validator: isString },
        { validator: required, options: { message: 'First Name is required' } },
    ],
    lastname: [
        { validator: isString },
        { validator: required, options: { message: 'Last Name is required' } },
    ],
    password: [
        { validator: isString },
        { validator: required, options: { message: 'Password is required' }, hasTag: 'register' },
        { validator: min, options: { number: 8, message: 'Password should be at least 8 characters' } },
        // { validator: involveLetterAndNumberAndSpecialCharacter },
    ],
    passwordConfirm: [
        { validator: isString },
        { validator: isSameAs, options: { target: 'password', message: 'Confirmation password must match password' } },
    ],
};

function validateField(fieldName, obj, options) {
    const value = obj[fieldName];
    const tests = schema[fieldName];
    if (!tests) {
        return true;
    }
    for (let i = 0; i < tests.length; i++) {
        const { validator, options: testOptions, hasTag } = tests[i];
        if (!hasTag || (options && options.tags && options.tags.indexOf(hasTag) > -1)) {
            const result = validator({
                ...testOptions,
                fieldName,
                value,
                obj,
            });
            if (result !== true) {
                return result;
            }
        }
    }
    return true;
}

export function ValidateFields(obj, options) {
    const fields = Object.keys(obj);
    const errors = {};
    for (let f = 0; f < fields.length; f++) {
        const fieldName = fields[f];
        const result = validateField(fieldName, obj, options);
        if (result !== true) {
            errors[fieldName] = result;
        }
    }

    if (Object.keys(errors).length > 0) {
        return errors;
    }

    return true;
}
