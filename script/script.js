"use strict";

// Check number
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
    let result = 0;

     for (let key in appData.expenses) {
       result += appData.expenses[key];
     }

     appData.expensesMonth = result;
     return result;
  },

  getBudget: function() {
    let dayInMonth = 30;

    appData.budgetMonth = +appData.budget - appData.getExpensesMonth();
    appData.budgetDay = appData.budgetMonth / dayInMonth;

    return appData.budgetDay, appData.budgetMonth;    
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
      return ("Цель будет достигнута за " + Math.max(Math.round(appData.getTargetMonth())) + " месяцев!");
    }
  },

  asking: function() {
    let addExpenses = prompt("Перечислите возможные расходы за рассчитываемый период через запятую","");
    appData.addExpenses = addExpenses.toLocaleLowerCase().split(", ");
    appData.deposit = confirm("Есть ли у Вас депозит в банке?");

    for (let i = 0; i < 2; i++) {
      let key = prompt("Введите обязательную статью расходов.", "");
      let price = +prompt("Во сколько это обойдётся?", "");

      appData.expenses[key] = price;

      while (!isNumber(price) || price === null || price === "" || price === 0) {
        price = prompt("Во сколько это обойдётся?", "");
      }

      key += price;
    }
  }
};

appData.asking();
appData.getExpensesMonth();
appData.getBudget();
appData.getTargetMonth();
appData.getStatusIncome();

console.log("Расходы на месяц составят: " + appData.getExpensesMonth());
console.log(appData.resultTargetMonth());
console.log(appData.getStatusIncome());
// for(let key in appData) {
//   console.log("Наша программа включает в себя данные: " + appData[key]); // и вот тут может задание не так понял
// }
console.log(appData);