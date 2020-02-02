"use strict";

// Variables

let isNumber = function(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

// Тут модальное окно с запросом для указания месячного дохода
let money,
  start = function() {
    do {
      money = prompt("Ваш месячный доход?");
    } while (!isNumber(money));
  };
start();

// Объект с нашим проектом
let appData = {
  income: {},
  addIncome: [],
  expenses: {},
  addExpenses: [],
  deposit: false,
  mission: 100000,
  period: 6,
  budget: money,
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,

  getExpensesMonth: function() {
    // let sum = 0;
    // let requiredExpenses = [];

    // for (let i = 0; i < 2; i++) {
    //   requiredExpenses[i] = prompt("Введите обязательную статью расходов.", "");

    //   let price = prompt("Во сколько это обойдётся?", "");

    //   while (!isNumber(price) || price === null || price === "") {
    //     price = prompt("Во сколько это обойдётся?", "");
    //   }

    //   sum += +price;
    // }

    // console.log(requiredExpenses);
    // return sum;
  },

  getAccumulatedMonth: function() {
    return money - expensesAmount;
  },

  getTargetMonth: function() {
    return appData.mission / accumulatedMonth;
  },

  getStatusIncome: function() {
    if (budgetDay === 0) {
      return "Пора в жизни что-то менять!";
    } else if (budgetDay >= 1200) {
      return "У Вас Высокий уровень дохода!";
    } else if (budgetDay >= 600) {
      return "У Вас средний уровень дохода.";
    } else if (budgetDay > 0) {
      return "К сожалению, у Вас уровень дохода ниже среднего.";
    } else if (budgetDay < 0) {
      return "Что-то пошло не так!";
    }
  },

  asking: function() {
    let addExpenses = prompt(
      "Перечислите возможные расходы за рассчитываемый период через запятую",
      ""
    );
    appData.addExpenses = addExpenses.toLocaleLowerCase().split(", ");
    appData.deposit = confirm("Есть ли у Вас депозит в банке?");

    for (let i = 0; i < 2; i++) {

      let key = prompt("Введите обязательную статью расходов.", "");
      let price = +prompt("Во сколько это обойдётся?", "");

      appData.expenses[key] = price;

      while(!isNumber(price) || price === null || price === "") {
        price = prompt("Во сколько это обойдётся?", "");
      }

      key += price;
    }
  },
};


console.log(appData.expenses);



appData.asking();

// Переопределили переменную
let expensesAmount = appData.getExpensesMonth();
let accumulatedMonth = appData.getAccumulatedMonth();
let budgetDay = accumulatedMonth / 30;

let resultTargetMonth = function() {
  if (appData.getTargetMonth() < 0) {
    return "Цель не будет достигнута";
  } else if (appData.getTargetMonth() > 0) {
    return (
      "Цель будет достигнута за " +
      Math.max(Math.round(appData.getTargetMonth())) +
      " месяцев!"
    );
  }
};

console.log(appData);
console.log("Расходы на месяц составят: " + expensesAmount);
console.log(resultTargetMonth());
console.log("Бюджет на день: " + Math.min(Math.round(budgetDay)));
console.log(appData.getStatusIncome());



