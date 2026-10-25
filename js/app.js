const firstNumber = document.querySelector("#firstNumber");
const secondNumber = document.querySelector("#secondNumber");
const calculateError = document.querySelector(".calculateError");
const calculateForm = document.querySelector("#calculateForm");
const calculateButton = document.querySelector("#calculateButton");
const calculateResult = document.querySelector(".calculateResult");
const tabs = document.querySelectorAll(".btn");
const forms = document.querySelectorAll(".form");
const tabIndicator = document.querySelector(".tab-indicator");

function moveIndicator(activeTab) {
  if (!tabIndicator || !activeTab) return;

  tabIndicator.style.width = `${activeTab.offsetWidth}px`;
  tabIndicator.style.transform = `translateX(${activeTab.offsetLeft}px)`;
}

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const target = tab.dataset.target;

    tabs.forEach((item) => {
      item.classList.toggle("active", item === tab);
    });

    forms.forEach((form) => {
      form.classList.toggle("active", form.id === target);
    });

    moveIndicator(tab);
  });
});

window.addEventListener("resize", () => {
  const activeTab = document.querySelector(".btn.active");
  moveIndicator(activeTab);
});

moveIndicator(document.querySelector(".btn.active"));

calculateForm.addEventListener("submit", calculateHandler);
function calculateHandler(event) {
  event.preventDefault();
  const selectedRadio = document.querySelector(
    'input[name="operator"]:checked',
  );
  let result = "";

  const number1 = firstNumber.value.trim();
  const number2 = secondNumber.value.trim();
  const operator = selectedRadio.value;

  if (number1 === "" || number2 === "") {
    showError(calculateError, "please enter both of number.");
  } else {
    result = validationNumber(Number(number1), Number(number2), operator);
  }

  showAnimatedResult(calculateResult, result, false);
  firstNumber.value = "";
  secondNumber.value = "";
}

function calculate(num1, num2, operator) {
  switch (operator) {
    case "+":
      return num1 + num2;
    case "-":
      return num1 - num2;
    case "/":
      return num1 / num2;
    case "*":
      return num1 * num2;
    case "%":
      return num1 % num2;
    case "**":
      if (num1 === 0 && num2 === 0) {
        return 0;
      }
      return num1 ** num2;
    case "//":
      return Math.trunc(num1 / num2);
    default:
      return "The operator is invalid.";
  }
}

function validationNumber(num1, num2, operator) {
  if (
    num2 === 0 &&
    (operator === "/" || operator === "%" || operator === "//")
  ) {
    showError(calculateError, "it can't divide on zero.");
    return "";
  } else {
    showError(calculateError, "");
    return calculate(num1, num2, operator);
  }
}

// isPrime ?
const isPrimeForm = document.querySelector("#isPrimeForm");
const primeNumber = document.querySelector("#primeNumber");
const isPrimeButton = document.querySelector("#isPrimeButton");
const isPrimeError = document.querySelector(".isPrimeError");
const isPrimeResult = document.querySelector(".isPrimeResult");

isPrimeForm.addEventListener("submit", isPrimeHandler);
function isPrimeHandler(event) {
  event.preventDefault();
  const number = primeNumber.value.trim();
  let result = "";

  if (number === "") {
    showError(isPrimeError, "please enter a number.");
  } else {
    result = isPrime(Number(number));
    showError(isPrimeError, "");
  }

  showAnimatedResult(isPrimeResult, result, true);
  primeNumber.value = null;
}

function isPrime(num) {
  if (num < 2) {
    return `${num} is <span class="prime-not">not</span> a prime number.`;
  }
  for (let i = 2; i < num; i++) {
    if (num % i === 0) {
      return `${num} is <span class="prime-not">not</span> a prime number.`;
    }
  }
  return `${num} is a <span class="prime">prime</span> number.`;
}

let errorTimer;

function showError(element, message) {
  clearTimeout(errorTimer);
  element.textContent = message;
  errorTimer = setTimeout(() => {
    element.textContent = "";
  }, 8000);
}

function showAnimatedResult(element, content, isHtml) {
  element.innerHTML = "";

  if (content === "") {
    return;
  }

  const source = document.createElement("div");

  if (isHtml) {
    source.innerHTML = content;
  } else {
    source.textContent = String(content);
  }

  let delay = 0;

  function appendAnimatedText(sourceNode, targetNode) {
    sourceNode.childNodes.forEach((child) => {
      if (child.nodeType === Node.TEXT_NODE) {
        const text = child.textContent;

        for (let i = 0; i < text.length; i++) {
          const char = document.createElement("span");
          char.className = "result-char";
          char.style.animationDelay = `${delay * 40}ms`;
          char.textContent = text[i] === " " ? "\u00A0" : text[i];
          targetNode.appendChild(char);
          delay += 1;
        }
      }

      if (child.nodeType === Node.ELEMENT_NODE) {
        const clone = child.cloneNode(false);
        targetNode.appendChild(clone);
        appendAnimatedText(child, clone);
      }
    });
  }

  appendAnimatedText(source, element);
}
