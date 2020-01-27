let money = prompt('Ваш месячный доход?', 60000);

let income = '60000';

let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');

let deposit = confirm('Если у Вас депозит в банке?');

let mission = 100000;

let period = 10;

let requiredExpenses1 = prompt('Введите обязательную статью расходов.');
let requiredExpenses2 = prompt('Введите обязательную статью расходов.');

let total1 = prompt('Во сколько это обойдётся?');
let total2 = prompt('Во сколько это обойдётся?');

let budgetMonth; 


console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);

console.log(addExpenses.length);

console.log("Период равен " + period + "-ти" + " месяцам.");
console.log ("Цель заработать " + mission + "$.");

let budgetDay = money / 30;

console.log(budgetDay);