'use strict';

let money = prompt('Ваш месячный доход?', '');

let income = '60000';

let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', '');

let deposit = confirm('Есть ли у Вас депозит в банке?');

let mission = 100000;

let period = 6;



let requiredExpenses1  = prompt("Введите обязательную статью расходов.", '');
let requiredExpenses2 = prompt("Введите обязательную статью расходов.", '');

let total1  = prompt('Во сколько это обойдётся?', '');
let total2 = prompt('Во сколько это обойдётся?', '');

let budgetMonth = money - (Number(total1) + Number(total2)); 

let goal = mission / budgetMonth;

let budgetDay = budgetMonth / 30;



console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);

console.log(addExpenses.length);

console.log("Период равен " + period + "-ти" + " месяцам.");
console.log ("Цель заработать " + mission + "$.");

console.log(requiredExpenses1.split(', '));
console.log(requiredExpenses2.split(', '));

console.log('Бюджет на месяц: ' + budgetMonth);
console.log('Цель будет достигнута за ' + Math.max(Math.round(goal)) + ' месяцев!');

console.log('Бюджет на день: ' + Math.min(Math.round(budgetDay)));



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