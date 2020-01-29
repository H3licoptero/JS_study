'use strict';

let isNumber = function(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);

};

// Variables
let money,
  income = "Фриланс",
  addExpenses = prompt("Перечислите возможные расходы за рассчитываемый период через запятую",""),
  deposit = confirm("Есть ли у Вас депозит в банке?"),
  mission = 100000,
  period = 6,
  requiredExpenses = [];


  
// Functions

let start = function() {
  money = prompt("Ваш месячный доход?");

  while (!isNumber(money)) {
    money = prompt("Ваш месячный доход?");
  }
};

start();

//Показывает типы входящих данных
let showTypeOf = function(data) {
  console.log(data, typeof data);
};

// Обязательные расходы 
let getExpensesMonth = function() {
  let sum = 0;

  for (let i = 0; i < 2; i++) {


     requiredExpenses[i] = prompt("Введите обязательную статью расходов.", "");
    

      sum += +prompt("Во сколько это обойдётся?", "");
  }
  console.log(requiredExpenses);
  return sum;
};

let expensesAmount = getExpensesMonth();

// Возвращает накопления за месяц 
function getAccumulatedMonth() {
    return money - expensesAmount;
}  

let accumulatedMonth = getAccumulatedMonth();
let budgetDay = accumulatedMonth / 30;


// Подсчитывает за какой период будет достигнута цель
function getTargetMonth() {
  return mission / accumulatedMonth;
}

// Статус 
let getStatusIncome = function() {
    if (budgetDay === 0) {
     return("Пора в жизни что-то менять!");
    } else if (budgetDay >= 1200) {
    return "У Вас Высокий уровень дохода!";
    } else if (budgetDay >= 600) {
    return "У Вас средний уровень дохода.";
    }  else if (budgetDay > 0 ) {
    return "К сожалению, у Вас уровень дохода ниже среднего.";
    } else if (budgetDay < 0) {
    return "Что-то пошло не так!";
    }
};


// Conclusions
showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);
console.log(addExpenses.split(", "));
console.log("Расходы на месяц составят: " + expensesAmount);  
console.log("Цель будет достигнута за " + Math.max(Math.round(getTargetMonth())) + " месяцев!");
console.log("Бюджет на день: " + Math.min(Math.round(budgetDay)));
console.log(getStatusIncome());



 


