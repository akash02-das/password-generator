// DOM Elements
const resultEl = document.getElementById('result');
const clipboardBtn = document.getElementById('clipboard');
const lengthEl = document.getElementById('length');
const lowercaseEl = document.getElementById('lowercase');
const uppercaseEl = document.getElementById('uppercase');
const numbersEl = document.getElementById('numbers');
const symbolsEl = document.getElementById('symbols');
const generateBtn = document.getElementById('generate');

const randomFunc = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbol
};

// Generate Event Listener
generateBtn.addEventListener('click', () => {
    const length = parseInt(lengthEl.value);
    const hasLower = lowercaseEl.checked;
    const hasUpper = uppercaseEl.checked;
    const hasNumber = numbersEl.checked;
    const hasSymbol = symbolsEl.checked;

    resultEl.innerHTML = generatePassword(length, hasLower, hasUpper, hasNumber, hasSymbol);
});

// Copy password to clipboard
clipboardBtn.addEventListener('click', () => {
    const textarea = document.createElement('textarea');
    const password = resultEl.innerText;

    if (!password) {
        return;
    }

    textarea.value = password;

    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');

    textarea.remove();

    swal({
        title: "Copied!",
        text: "Password copied to clipboard!",
        icon: "success",
        button: "Ok",
    });
});

// Generate Password Function
function generatePassword(length, lower, upper, number, symbol) {
    // 1. Init password variable
    // 2. Filter out unchecked types
    // 3. Loop over length call generator function for each types
    // 4. Add final pw to the pw variable and return

    let generatedPassword = '';

    const typesCount = lower + upper + number + symbol;

    const typesArr = [{
        lower
    }, {
        upper
    }, {
        number
    }, {
        symbol
    }].filter(item => Object.values(item)[0]);

    if (typesCount === 0) {
        return '';
    }

    for (let i = 0; i < length; i += typesCount) {
        typesArr.forEach(type => {
            const funcName = Object.keys(type)[0];

            generatedPassword += randomFunc[funcName]();
        });
    }

    const finalPassword = generatedPassword.slice(0, length);

    return finalPassword;
}

// Browser Character Set - http://www.net-comber.com/charset.html
// Generator Functions

function getRandomLower() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getRandomUpper() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getRandomNumber() {
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function getRandomSymbol() {
    const symbols = '!@#$%^&*(){}[]=<>/,.';
    return symbols[(Math.floor(Math.random() * symbols.length))];
}