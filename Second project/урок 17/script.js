"use strict";

// создаем объект со временем
let date = new Date();

// тут будем проверять время суток
let timeOfDay = date.getHours();

let timeOfDayFunc = () => {
  if (timeOfDay > 6 && timeOfDay < 12) {
    console.log("Доброе утро!");
  } else if (timeOfDay > 12 && timeOfDay < 18) {
    console.log("Доброе утро!");
  } else if (timeOfDay > 18 && timeOfDay < 22) {
    console.log("Добрый вечер!");
  } else if (timeOfDay > 22 || timeOfDay < 6) {
    console.log("Доброй ночи!");
  }
};
// timeOfDayFunc();

// создаем массив с днями недели (обращаем внимание на ключ!!!, он должен)
// соответствовать тому, что передаст метод getData()
let days = [
  "Воскресение",
  "Понедельник",
  "Втроник",
  "Среда",
  "Четверг",
  "Пятница",
  "Суббота"
];

// в новую перенную кладём значение, которе получает день недели
// с помощью метода getDay()
let daysOfWeek = date.getDay();

// наш массив будет получать значение метода через переменную daysOfWeek
// в котором лежит наша дата и выводить на страницу
// alert(`Сегодня: ${days[daysOfWeek]}`);

// alert(`Текущее время: ${date.toLocaleTimeString('en')}`);


let ourDay = date; 
let happyDay = new Date(2020, 11, 31);

let diff = Math.ceil((happyDay - ourDay) / (1000 * 60 * 60 * 24));

// alert(`До Нового Года осталось: ${diff} дней!`);

alert(`${timeOfDayFunc()}
Сегодня: ${days[daysOfWeek]}
Текущее время: ${date.toLocaleTimeString("en")}
До Нового Года осталось: ${diff} дней!`);

