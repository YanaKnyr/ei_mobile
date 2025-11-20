// ===== Вставка блоків на сторінку =====
const block5 = document.querySelector('.block5');

block5.insertAdjacentHTML("beforeend", `
    <hr>
    <h5>JS форми</h5>
    <!-- Площа прямокутника -->
    <div id="rectangleArea">
        <h4>Обчислення площі прямокутника</h4>
        <label>Ширина: <input type="number" id="width"></label>
        <label>Висота: <input type="number" id="height"></label>
        <button id="calcAreaBtn">Обчислити</button>
        <p id="areaResult"></p>
    </div>
    <hr>
    <!-- Завдання 3 — 10 чисел -->
    <div id="numbersForm">
        <h3>Введіть 10 чисел:</h3>
        <input id="numbersInput" type="text"
               placeholder="Наприклад: 1 2 3,4 5,6 7 8,9 10">
        <button id="processNumbersBtn">Опрацювати числа</button>
    </div>
    <hr>
`);

const block1 = document.querySelector('.header .phraseX');
const block6 = document.querySelector('.footer .phraseY');
const temp = block1.textContent;
block1.textContent = block6.textContent;
block6.textContent = temp;


document.getElementById("calcAreaBtn").onclick = function () {
    const w = document.getElementById("width").value;
    const h = document.getElementById("height").value;
    const result = document.getElementById("areaResult");

    if (w === "" || h === "") {
        result.textContent = "";
        return;
    }

    const width = Number(w);
    const height = Number(h);

    if (width < 0 || height < 0) {
        alert("Ширина і висота не можуть бути меншими за 0.");
        result.textContent = "";
        return;
    }

    const area = width * height;
    result.textContent = "Площа прямокутника = " + area;
};

function setCookie(name, value, days = 365) {
    const date = new Date();
    date.setTime(date.getTime() + days*24*60*60*1000);
    document.cookie = `${name}=${encodeURIComponent(value)};expires=${date.toUTCString()};path=/`;
}

function getCookie(name) {
    const cookies = document.cookie.split("; ");
    for (let c of cookies) {
        let [key, value] = c.split("=");
        if (key === name) return decodeURIComponent(value);
    }
    return null;
}

function deleteCookie(name) {
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/`;
}

// ===== Перевірка cookies =====
function checkCookies() {
    const numbersForm = document.getElementById("numbersForm");
    const saved = getCookie("minResult");

    if (saved) {
        const keep = confirm("Знайдений попередній результат: " + saved +
                             "\nБажаєте залишити ці дані?");
        if (keep) {
            alert("Дані залишено. Оновіть сторінку, щоб продовжити роботу.");
            numbersForm.style.display = "none";
        } else {
            deleteCookie("minResult");
            alert("Cookies видалено. Сторінка перезавантажиться.");
            location.reload(true);
        }
    } else {
        numbersForm.style.display = "block";
    }
}

window.addEventListener("load", checkCookies);

// ===== Обробка введення чисел =====
document.getElementById("processNumbersBtn").addEventListener("click", function() {
    const input = document.getElementById("numbersInput").value;
    let arr = input.split(/[\s,]+/).filter(x => x !== "").map(Number);

    if (arr.some(isNaN)) {
        alert("Помилка: введіть тільки числа.");
        return;
    }

    if (arr.length !== 10) {
        alert("Помилка: потрібно ввести рівно 10 чисел.");
        return;
    }

    const min = Math.min(...arr);
    const count = arr.filter(x => x === min).length;
    const result = `Мінімальне число: ${min}; Кількість повторень: ${count}`;

    alert(result);
    setCookie("minResult", result);
});
