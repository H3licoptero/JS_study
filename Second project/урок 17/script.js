"use strict";

// создаем объект со временем
let date = new Date();

// тут будем проверять время суток
let timeOfDay = date.getHours();

let timeOfDayFunc = () => {
  if (timeOfDay >= 6 && timeOfDay < 12) {
    return ("Доброе утро!");
  } else if (timeOfDay >= 12 && timeOfDay < 18) {
    return ("Добрый день!");
  } else if (timeOfDay >= 18 && timeOfDay < 22) {
    return ("Добрый вечер!");
  } else if (timeOfDay >= 22 || timeOfDay < 6) {
    return ("Доброй ночи!");
  }
  return timeOfDay;
};

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

let ourDay = date,
 happyDay = new Date(2020, 11, 31),
 diff = Math.ceil((happyDay - ourDay) / (1000 * 60 * 60 * 24));

alert(`${timeOfDayFunc()}
Сегодня: ${days[daysOfWeek]}                    
Текущее время: ${date.toLocaleTimeString("en")}
До Нового Года осталось: ${diff} дней!`);

