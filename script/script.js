'use strict';

// Variables
let money = +prompt("Ваш месячный доход?"),
  income = "Фриланс",
  addExpenses = prompt("Перечислите возможные расходы за рассчитываемый период через запятую",""),
  deposit = confirm("Есть ли у Вас депозит в банке?"),
  mission = 100000,
  period = 6,
  requiredExpenses1 = prompt("Введите обязательную статью расходов.", ""),
  total1 = +prompt("Во сколько это обойдётся?", ""),
  requiredExpenses2 = prompt("Введите обязательную статью расходов.", ""),
  total2 = +prompt("Во сколько это обойдётся?", ""),
  accumulatedMonth = getAccumulatedMonth(),
  budgetDay = accumulatedMonth / 30;


  
// Functions

//Показывает типы входящих данных
let showTypeOf = function(data) {
  console.log(data, typeof data);
};

// Обязательные расходы 
function getExpensesMonth() {
  return total1 + total2;
}

// Возвращает накопления за месяц 
function getAccumulatedMonth() {
    return money - getExpensesMonth();
}                                               

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
console.log('Расходы на месяц составят: ' + getExpensesMonth());  
console.log("Цель будет достигнута за " + Math.max(Math.round(getTargetMonth())) + " месяцев!");
console.log("Бюджет на день: " + Math.min(Math.round(budgetDay)));
console.log(getStatusIncome());



 


