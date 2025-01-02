const numericInputs = document.querySelectorAll('[inputmode="numeric"]');
numericInputs.forEach(element => {
    element.addEventListener("input", (event) => {
        event.target.value = event.target.value.replace(/\D/g, "");
    });
});

const inputCardNumber = document.getElementById("card-number");
inputCardNumber.addEventListener("input", () => inputCardNumber.value = formatNumber(inputCardNumber.value.replaceAll(" ", "")));
const formatNumber = (number) => number.split("").reduce((seed, next, index) => {
if (index !== 0 && !(index % 4)) seed += " ";
    return seed + next;
}, "");

const initialValues = {
    "cardholder-mirror": "JANE APPLESEED",
    "card-number-mirror": "0000 0000 0000 0000",
    "month-mirror": "00",
    "year-mirror": "00",
    "cvc-mirror": "000"
};

function atualizarMirror(event) {
    const idMirror = event.target.id + "-mirror";
    let value = event.target.value;
    if (value === "") {
        value = initialValues[idMirror];
    } else if (idMirror === "cardholder-mirror") {
        value = value.toUpperCase();
    }
    document.getElementById(idMirror).innerText = value;
    checkInputs(event.target);
}

document.getElementById("cardholder").addEventListener("input", atualizarMirror);
document.getElementById("card-number").addEventListener("input", atualizarMirror);
document.getElementById("month").addEventListener("input", atualizarMirror);
document.getElementById("year").addEventListener("input", atualizarMirror);
document.getElementById("cvc").addEventListener("input", atualizarMirror);

function checkInputs(input) {
    const valueCheck = input.value;
    
    if (valueCheck === "") {
        if (!input.parentNode.querySelector(`.error-message.blank-error.${input.id}`)) {
            const errorMessage = document.createElement('span');
            errorMessage.className = `error-message blank-error ${input.id}`;
            errorMessage.innerText = "Can't be blank";
            input.parentNode.appendChild(errorMessage);
            input.style.borderColor = 'hsl(0, 100%, 66%)';
            input.style.marginBottom = '10px';
        }
    } else if (input.parentNode.querySelector(`.error-message.blank-error.${input.id}`)) {
        input.parentNode.querySelector(`.error-message.blank-error.${input.id}`).remove();
        input.style.borderColor = 'hsl(270, 3%, 87%)';
        input.style.marginBottom = '0';
    }

    if (input.id === 'cardholder' && /\d/.test(valueCheck)) {
        if (!document.querySelector(`.error-message.letters-only.${input.id}`)) {
            const errorMessage = document.createElement('span');
            errorMessage.className = `error-message letters-only ${input.id}`;
            errorMessage.innerText = "Wrong format, letters only";
            input.parentNode.appendChild(errorMessage);
            input.style.borderColor = 'hsl(0, 100%, 66%)';
            input.style.marginBottom = '10px';
        }
    } else if (input.parentNode.querySelector(`.error-message.letters-only.${input.id}`)) {
        input.parentNode.querySelector(`.error-message.letters-only.${input.id}`).remove();
        input.style.borderColor = 'hsl(270, 3%, 87%)';
        input.style.marginBottom = '0';
    }

    if (input.id === 'card-number' && (valueCheck.length < 19 && valueCheck.length > 0)) {
        if (!document.querySelector(`.error-message.invalid-number.${input.id}`)) {
            const errorMessage = document.createElement('span');
            errorMessage.className = `error-message invalid-number ${input.id}`;
            errorMessage.innerText = "Invalid card number";
            input.parentNode.appendChild(errorMessage);
            input.style.borderColor = 'hsl(0, 100%, 66%)';
            input.style.marginBottom = '10px';
        }
    } else if (input.parentNode.querySelector(`.error-message.invalid-number.${input.id}`)) {
        input.parentNode.querySelector(`.error-message.invalid-number.${input.id}`).remove();
        input.style.borderColor = 'hsl(270, 3%, 87%)';
        input.style.marginBottom = '0';
    }

    if (input.id === 'cvc' && (valueCheck.length < 3 && valueCheck.length > 0)) {
        if (!document.querySelector(`.error-message.invalid-cvc.${input.id}`)) {
            const errorMessage = document.createElement('span');
            errorMessage.className = `error-message invalid-cvc ${input.id}`;
            errorMessage.innerText = "Invalid cvc";
            input.parentNode.appendChild(errorMessage);
            input.style.borderColor = 'hsl(0, 100%, 66%)';
            input.style.marginBottom = '10px';
        }
    } else if (input.parentNode.querySelector(`.error-message.invalid-cvc.${input.id}`)) {
        input.parentNode.querySelector(`.error-message.invalid-cvc.${input.id}`).remove();
        input.style.borderColor = 'hsl(270, 3%, 87%)';
        input.style.marginBottom = '0';
    }

    if (input.id === 'month' && (valueCheck > 12 || valueCheck < 1) && valueCheck !== "") {
        if (!document.querySelector(`.error-message.month-error.${input.id}`)) {
            const errorMessage = document.createElement('span');
            errorMessage.className = `error-message month-error ${input.id}`;
            errorMessage.innerText = "Invalid month, 1-12";
            input.parentNode.appendChild(errorMessage);
            input.style.borderColor = 'hsl(0, 100%, 66%)';
            input.style.marginBottom = '10px';
        }
    } else if (input.parentNode.querySelector(`.error-message.month-error.${input.id}`)) {
        input.parentNode.querySelector(`.error-message.month-error.${input.id}`).remove();
        input.style.borderColor = 'hsl(270, 3%, 87%)';
        input.style.marginBottom = '0';
    }
}

let completeState = 0;

function submit(e) {
    e.preventDefault();

    if (completeState === 0) {
        const inputs = document.getElementsByTagName('input');
        let hasErrors = false;
        Array.from(inputs).forEach(input => {
            if (!input.value) {
                checkInputs(input);
                hasErrors = true;
            }
        });
    
        if (!hasErrors) {
            const form = document.querySelector('.card-forms');
            const divs = form.querySelectorAll('div');
            divs.forEach(div => div.remove());

            form.style.gridTemplateAreas = `
                "complete"
                "thank"
                "message"
                "confirm"
            `;
            form.style.justifyItems = 'center';

            const image = document.createElement('img');
            image.id = 'complete-icon';
            image.src = 'images/icon-complete.svg';
            image.alt = 'Complete icon'; 
            form.appendChild(image);

            const thank = document.createElement('p');
            thank.id = 'thank';
            thank.innerText = 'THANK YOU!';
            form.appendChild(thank);

            const message = document.createElement('p');
            message.id = 'message';
            message.innerText = 'We`ve added your card details';
            form.appendChild(message);

            completeState = 1;
            return false;
        }
        return false;
    }
    else {
        location.reload(true); 
    }
}

const form = document.querySelector('form');
form.addEventListener('submit', submit, false);
