"use strict";

let calculate = document.getElementById("start"),
  incomeBtn = document.getElementsByTagName("button")[0],
  expnesesBtn = document.getElementsByTagName("button")[1],
  depositCheck = document.querySelector("#deposit-check"),
  additionalIncomeItem = document.querySelectorAll(".additional_income-item")[0],
  additionalIncomeItem2 = document.querySelectorAll(".additional_income-item")[1];

let salaryAmount = document.querySelector(".salary-amount"),
  incomeTitle = document.querySelectorAll(".income-title")[1],
  incomeAmount = document.querySelector(".income-amount"),
  expensesTitle = document.querySelectorAll(".expenses-title")[1],
  expensesAmount = document.querySelector(".expenses-amount"),
  additionalExpensesItem = document.querySelector(".additional_expenses-item"),
  targetAmount = document.querySelector(".target-amount");

let budgetMonth = document.getElementsByClassName("budget_month-value")[0],
  budgetDay = document.getElementsByClassName("budget_day-value")[0],
  expensesMonth = document.getElementsByClassName("expenses_month-value")[0],
  additionalIncome = document.getElementsByClassName("additional_income-value")[0],
  additionalExpenses = document.getElementsByClassName("additional_expenses-value")[0],
  incomePeriod = document.getElementsByClassName("income_period-value")[0],
  targetMonth = document.getElementsByClassName("target_month-value")[0];

// Check number
let isNumber = function(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

// Тут модальное окно с запросом для указания месячного дохода
let money,
  start = function() {
    do {
      money = +prompt("Ваш месячный доход?");
    } while (!isNumber(money) || money === 0 || money === "");
  };
start();

// Объект с нашим проектом
let appData = {
  income: {},
  addIncome: [],
  expenses: {},
  addExpenses: [],
  deposit: false,
  percentDeposit: 0,
  moneyDeposit: 0,
  mission: 100000,
  period: 6,
  budget: money,
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,

  getExpensesMonth: function() {
    for (let key in appData.expenses) {
      appData.expensesMonth += appData.expenses[key];
    }
  },

  getBudget: function() {
    appData.budgetMonth = +appData.budget - appData.expensesMonth;
    appData.budgetDay = Math.floor(appData.budgetMonth / 30);
  },

  getTargetMonth: function() {
    return appData.mission / appData.budgetMonth;
  },

  getStatusIncome: function() {
    if (appData.budgetDay === 0) {
      return "Пора в жизни что-то менять!";
    } else if (appData.budgetDay >= 1200) {
      return "У Вас Высокий уровень дохода!";
    } else if (appData.budgetDay >= 600) {
      return "У Вас средний уровень дохода.";
    } else if (appData.budgetDay > 0) {
      return "К сожалению, у Вас уровень дохода ниже среднего.";
    } else if (appData.budgetDay < 0) {
      return "Что-то пошло не так!";
    }
  },

  resultTargetMonth: function() {
    if (appData.getTargetMonth() < 0) {
      return "Цель не будет достигнута";
    } else if (appData.getTargetMonth() > 0) {
      return (
        "Цель будет достигнута за " +
        Math.max(Math.round(appData.getTargetMonth())) +
        " месяцев!"
      );
    }
  },

  asking: function() {
    let itemIncome;
    let cashIncome;

    if (confirm("Есть ли у Вас дополнительный источник дохода?")) {
      itemIncome = prompt("Какой у Вас дополнительный источник дохода?", "");

      while (
        isNumber(itemIncome) ||
        itemIncome === null ||
        itemIncome.trim() === ""
      ) {
        itemIncome = prompt("Какой у Вас дополнительный источник дохода?", "");
      }

      cashIncome = +prompt("Сколько в месяц Вы на этом зарабатываете?", "");

      while (!isNumber(cashIncome) || cashIncome === 0 || cashIncome === "") {
        cashIncome = +prompt("Сколько в месяц Вы на этом зарабатываете?", "");
      }

      appData.income[itemIncome] = +cashIncome;
    }

    let addExpenses = prompt("Перечислите возможные расходы за рассчитываемый период через запятую","");
    appData.addExpenses = addExpenses.split(",");

    for (let i = 0; i < appData.addExpenses.length; i++) {
      let itemExpenses = appData.addExpenses[i].trim();
      appData.addExpenses[i] = itemExpenses.charAt(0).toUpperCase() + itemExpenses.slice(1).toLowerCase();
    }
    console.log(appData.addExpenses.join(", "));

    appData.deposit = confirm("Есть ли у Вас депозит в банке?");

    let key;
    let price;

    for (let i = 0; i < 2; i++) {
      key = prompt("Введите обязательную статью расходов.", "");

      while (isNumber(key) || key === null || key.trim() === "") {
        key = prompt("Введите обязательную статью расходов.", "");
      }

      price = +prompt("Во сколько это обойдётся?", "");

      while (!isNumber(price) || price === null || price === "" || price === 0) {
        price = +prompt("Во сколько это обойдётся?", "");
      }

      appData.expenses[key] = +price;
    }
  },

  getInfoDeposit: function() {
    while (!isNumber(appData.percentDeposit) || appData.percentDeposit === 0 || appData.percentDeposit === "") {
      appData.percentDeposit = +prompt("Какой годовой процент?", "");
    }

    while (
      !isNumber(appData.moneyDeposit) || appData.moneyDeposit === 0 || appData.moneyDeposit === "") {
      appData.moneyDeposit = +prompt("Какая сумма заложена?", "");
    }
  },

  calcSavedMoney: function() {
    return appData.budgetMonth * appData.period;
  }
};

appData.asking();
appData.getExpensesMonth();
appData.getBudget();
appData.getTargetMonth();
appData.getStatusIncome();

console.log("Расходы на месяц составят: " + appData.expensesMonth);
console.log(appData.resultTargetMonth());
console.log(appData.getStatusIncome());
for(let key in appData) {
  console.log("Наша программа включает в себя данные: " + key);
}
console.log(appData);
appData.getInfoDeposit();
console.log(
  appData.calcSavedMoney(),
  appData.moneyDeposit,
  appData.percentDeposit
);

console.log(
  calculate,
  incomeBtn,
  expnesesBtn,
  depositCheck
);
console.log(additionalIncomeItem, additionalIncomeItem2);

console.log(
  salaryAmount,
  incomeTitle,
  incomeAmount,
  expensesTitle,
  expensesAmount,
  additionalExpensesItem,
  targetAmount
);

console.log(
  budgetMonth,
  budgetDay,
  expensesMonth,
  additionalIncome,
  additionalExpenses,
  incomePeriod,
  targetMonth
);
