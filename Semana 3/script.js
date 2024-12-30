const input = document.getElementById("card-number");
input.addEventListener("input", () => input.value = formatNumber(input.value.replaceAll(" ", "")));

const formatNumber = (number) => number.split("").reduce((seed, next, index) => {
if (index !== 0 && !(index % 4)) seed += " ";
    return seed + next;
}, "");

function atualizarMirror(idMirror) {
    const inputValue = document.getElementById(idMirror.replace("-mirror", "")).value;
    document.getElementById(idMirror).innerText = inputValue;
}