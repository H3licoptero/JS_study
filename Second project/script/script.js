window.addEventListener("DOMContentLoaded", function() {
  "use strict";

  function countTimer(deadline) {
    // наши элементы из вёрстки
    let timerHours = document.querySelector("#timer-hours"),
      timerMinutes = document.querySelector("#timer-minutes"),
      timerSeconds = document.querySelector("#timer-seconds");

    // функция, которая получает данные по времени
    function getTimeRemaining() {
      // время, которое мы получаем в миллисекундах(.getTime), до нашего дедлайна 
      let dateStop = new Date(deadline).getTime(), 

        // тут текущее время которое мы получаем из расчётов в мллисекундах с 
        // 1970-го года
        dateNow = new Date().getTime(),

        // тут мы получаем
        timeRemainig = (dateStop - dateNow) / 1000,
        seconds = Math.floor(timeRemainig % 60), // тут получаем наши секунды
        minutes = Math.floor((timeRemainig / 60) % 60), // тут минуты
        hours = Math.floor(timeRemainig / 60 / 60); // тут часы

      // это объект, куда мы помещаем наши часы, минуты и секунды
      return {timeRemainig, hours, minutes, seconds};
    }

    // ф-ия которая выводит данные по времени на нашу страницу
    function updateClock() {
      let timer = getTimeRemaining();

      // выводим наше время в наш проект
      timerHours.textContent = timer.hours;
      timerMinutes.textContent = timer.minutes;
      timerSeconds.textContent = timer.seconds;

      // условие, при котором время будет выводится в проект
      if (timer.timeRemainig > 0) {
        setInterval(updateClock, 1000);
      }
    }

    updateClock();
  }
 
  // тут вся наша функция + аргументом при вызове установлено время дедлайна, 
  // до которого будет работать таймер
  countTimer("20 february 2020");
  
});


