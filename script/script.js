'use strict';

// Variables
let money = prompt("Ваш месячный доход?", ""),
  income = "60000",
  addExpenses = prompt("Перечислите возможные расходы за рассчитываемый период через запятую",""),
  deposit = confirm("Есть ли у Вас депозит в банке?"),
  mission = 100000,
  period = 6,
  requiredExpenses1 = prompt("Введите обязательную статью расходов.", ""),
  total1 = +prompt("Во сколько это обойдётся?", ""),
  requiredExpenses2 = prompt("Введите обязательную статью расходов.", ""),
  total2 = +prompt("Во сколько это обойдётся?", ""),
  budgetMonth = money - (total1 + total2),
  goal = mission / budgetMonth,
  budgetDay = budgetMonth / 30;


// Conditions
 if (budgetDay === 0) {
  console.log("Пора в жизни что-то менять!");
} else if (budgetDay >= 1200) {
    console.log('У Вас Высокий уровень дохода!');
} else if (budgetDay >= 600) {
    console.log('У Вас средний уровень дохода.');
}  else if (budgetDay > 0 ) {
    console.log('К сожалению, у Вас уровень дохода ниже среднего.');
} else if (-budgetDay) {
    console.log('Что-то пошло не так!');
}


// Conclusions
console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);
console.log(addExpenses.split(', '));
console.log("Период равен " + period + "-ти" + " месяцам.");
console.log ("Цель заработать " + mission + "$.");
console.log('Бюджет на месяц: ' + budgetMonth);
console.log('Цель будет достигнута за ' + Math.max(Math.round(goal)) + ' месяцев!');
console.log('Бюджет на день: ' + Math.min(Math.round(budgetDay)));
