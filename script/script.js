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

let 
    // deposit = confirm("Есть ли у Вас депозит в банке?"),
    requiredExpenses = []; // тут наши обязательные расходы


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
  let sum = 0;

  for (let i = 0; i < 2; i++) {

    requiredExpenses[i] = prompt("Введите обязательную статью расходов.", "");

    let price = prompt("Во сколько это обойдётся?", "");

    while(!isNumber(price) || price === null || price === '') {
      price = prompt("Во сколько это обойдётся?", "");
    }

    sum += +price;
  }

  console.log(requiredExpenses);
  return sum;
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
    let addExpenses = prompt("Перечислите возможные расходы за рассчитываемый период через запятую","");
        appData.addExpenses = addExpenses.split(", ");
        appData.deposit = confirm("Есть ли у Вас депозит в банке?");
  }

};

appData.asking();

// let 
//     // deposit = confirm("Есть ли у Вас депозит в банке?"),
//     requiredExpenses = []; // тут наши обязательные расходы

// Functions

// Здесь мы проверяем входящие значения для перемнной money
// let isNumber = function(n) {
//   return !isNaN(parseFloat(n)) && isFinite(n);
// };

// // Тут модальное окно с запросом для указания месячного дохода
// let start = function() {
//   do {
//     money = prompt("Ваш месячный доход?");
//   } while (!isNumber(money));
// };
// start();

//Показывает типы входящих данных
// let showTypeOf = function(data) {
//   console.log(data, typeof data);
// };

// Обязательные расходы с полями для указания этих расходов
// let getExpensesMonth = function() {
//   let sum = 0;

//   for (let i = 0; i < 2; i++) {

//     requiredExpenses[i] = prompt("Введите обязательную статью расходов.", "");

//     let price = prompt("Во сколько это обойдётся?", "");

//     while(!isNumber(price) || price === null || price === '') {
//       price = prompt("Во сколько это обойдётся?", "");
//     }

//     sum += +price;
//   }

//   console.log(requiredExpenses);
//   return sum;
// };


// Переопределили переменную
let expensesAmount = appData.getExpensesMonth();

// Возвращает накопления за месяц
// function getAccumulatedMonth() {
//   return money - expensesAmount;
// }

let accumulatedMonth = appData.getAccumulatedMonth();
let budgetDay = accumulatedMonth / 30;

// Подсчитывает за какой период будет достигнута цель
// function getTargetMonth() {
//   return appData.mission / accumulatedMonth;
// }

// Статус
// let getStatusIncome = function() {
//   if (budgetDay === 0) {
//     return "Пора в жизни что-то менять!";
//   } else if (budgetDay >= 1200) {
//     return "У Вас Высокий уровень дохода!";
//   } else if (budgetDay >= 600) {
//     return "У Вас средний уровень дохода.";
//   } else if (budgetDay > 0) {
//     return "К сожалению, у Вас уровень дохода ниже среднего.";
//   } else if (budgetDay < 0) {
//     return "Что-то пошло не так!";
//   }
// };

let resultTargetMonth = function() {
  if (appData.getTargetMonth() < 0) {
    return ("Цель не будет достигнута");
  } else if (appData.getTargetMonth() > 0) {
    return ("Цель будет достигнута за " + Math.max(Math.round(appData.getTargetMonth())) + " месяцев!");
  }
};

// Conclusions
// showTypeOf(money);
// showTypeOf(appData.income);
// showTypeOf(appData.deposit);
// console.log(addExpenses.split(", "));
console.log("Расходы на месяц составят: " + expensesAmount);
console.log(resultTargetMonth());
console.log("Бюджет на день: " + Math.min(Math.round(budgetDay)));
console.log(appData.getStatusIncome());
