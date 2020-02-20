window.addEventListener("DOMContentLoaded", function() {
  "use strict";

  const countTimer = () => {
    // наши элементы из вёрстки
    let timerHours = document.querySelector("#timer-hours"),
      timerMinutes = document.querySelector("#timer-minutes"),
      timerSeconds = document.querySelector("#timer-seconds");
    let intervalCount;
    // функция, которая получает данные по времени
    function getTimeRemaining() {
      // время, которое мы получаем в миллисекундах(.getTime), до нашего дедлайна
      let dateStop = new Date("21 february 2020").getTime(),
        // тут текущее время которое мы получаем из расчётов в мллисекундах с
        // 1970-го года(timestamp)
        dateNow = new Date().getTime(),
        // тут мы получаем время которое расчитывается до дедлайна от настоящего
        //(разница между текущей датой и дедлайном)
        timeRemainig = (dateStop - dateNow) / 1000,
        seconds = Math.floor(timeRemainig % 60), // тут получаем наши секунды
        minutes = Math.floor((timeRemainig / 60) % 60), // тут минуты
        hours = Math.floor(timeRemainig / 60 / 60); // тут часы

      // это объект, куда мы помещаем наши часы, минуты и секунды
      return { timeRemainig, hours, minutes, seconds };
    }

    // ф-ия которая выводит данные по времени на нашу страницу
    function updateClock() {
      let timer = getTimeRemaining();

      // выводим наше время в наш проект
      timerHours.textContent = timer.hours;
      timerMinutes.textContent = timer.minutes;
      timerSeconds.textContent = timer.seconds;

      // добавляем нули перед нашими часами, минутами и секундами там, где это требуется
      if (timer.hours <= 9) {
        timerHours.textContent = "0" + timer.hours;
      }

      if (timer.minutes <= 9) {
        timerMinutes.textContent = "0" + timer.minutes;
      }

      if (timer.seconds <= 9) {
        timerSeconds.textContent = "0" + timer.seconds;
      }

      // если таймер доходит до нуля по всем параметрам, тогда он останавливается
      // и не переходит в отрицательное значение
      if (timer.timeRemainig <= 0) {
        timerHours.textContent = "00";
        timerMinutes.textContent = "00";
        timerSeconds.textContent = "00";
        clearInterval(intervalCount);
      }
    }

    intervalCount = setInterval(updateClock, 1000);    
    
  };

  countTimer();

  // Меню
  
});







