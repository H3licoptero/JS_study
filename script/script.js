let money = 60000;

let income = '60000';

let addExpenses = "Жилье, транспорт, одежда, техника";

let deposit = true;

let mission = 100000;

let period = 10;

/* 
 Вот так, как я понял через одно ключевое слово и в столбик.

 let money = 60000,
 income = 60000,
 addExpenses = 'Жилье, транспорт, техника, одежда',
 deposit = true,
 mission = 100000,
 period = 12;
 */

console.log(typeof money, typeof income, typeof deposit);

console.log(addExpenses.length);

console.log("Период равен " + period + "-ти" + " месяцам.");
console.log ("Цель заработать " + mission + "$.");

let budgetDay = money / 30;

console.log(budgetDay);
