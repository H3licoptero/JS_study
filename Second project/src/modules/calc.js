'use strict';

const calc = (price = 100) => {
  let calcBlock = document.querySelector(".calc-block"),
    calcType = document.querySelector(".calc-type"),
    calcSquare = document.querySelector(".calc-square"),
    calcCount = document.querySelector(".calc-count"),
    calcDay = document.querySelector(".calc-day"),
    totalValue = document.getElementById("total");

  const countSum = () => {
    let total = 0,
      countValue = 1,
      dayValue = 1;

    let typeValue = calcType.options[calcType.selectedIndex].value,
      squareValue = +calcSquare.value;

    if (calcCount.value > 1) {
      countValue += (calcCount.value - 1) / 10;
    }

    if (calcDay.value && calcDay.value < 5) {
      dayValue *= 2;
    } else if (calcDay.value && calcDay.value < 10) {
      dayValue *= 1.5;
    }

    if (typeValue && squareValue) {
      total = price * typeValue * squareValue * countValue * dayValue;
    }

    totalValue.textContent = Math.ceil(total);
  };

  calcBlock.addEventListener("change", event => {
    let target = event.target;

    if (target.matches("input") || target.matches("select")) {
      countSum();
    }
  });

  // проверка ввода на числа
  let checkInputs = () => {
    let inputBlock = document.querySelectorAll(".calc-item");

    inputBlock.forEach(el =>
      el.addEventListener("input", event => {
        let target = event.target;
        if (target.matches("input")) {
          target.value = target.value.replace(/\D/g);
        }
      })
    );
  };

  checkInputs();
};

export default calc;