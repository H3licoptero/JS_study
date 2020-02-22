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
      let dateStop = new Date("23 february 2020").getTime(),
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
  const toggleMenu = () => {
    let btnMenu = document.querySelector(".menu"),
      menu = document.querySelector("menu"),
      closeBtn = document.querySelector(".close-btn"),
      menuItems = menu.querySelectorAll("ul>li");

    // функция, которая при нажатии вызывает и скрывает меню
    const handlerMenu = () => {
      menu.classList.toggle("active-menu");
    };

    btnMenu.addEventListener("click", handlerMenu);
    closeBtn.addEventListener("click", handlerMenu);

    // тут при нажатии на кнопку меню, пользователь будет премещаться по странице
    // меню будет исчезать после отработки события
    menuItems.forEach(elems => elems.addEventListener("click", handlerMenu));
  };

  toggleMenu();

  // popup окно

  const togglePopUp = () => {
    const popup = document.querySelector(".popup"),
      popupContent = document.querySelector(".popup-content"),
      popupBtn = document.querySelectorAll(".popup-btn"),
      popupClose = document.querySelector(".popup-close");

    let block = document.documentElement.clientWidth;

    let paramsAnimation = {count: -55, startPosition: -55, endPostion: 20, speed: 2};

    // функция для анимации и вызова нашего popup-окна
    let popupAnimation = () => {
      popupContent.style.top = paramsAnimation.count + "%";
      paramsAnimation.count += paramsAnimation.speed;

      // условие для выполнения нашей анимации
      if (paramsAnimation.count <= paramsAnimation.endPostion) {
        requestAnimationFrame(popupAnimation);
      } else {
        paramsAnimation.count = paramsAnimation.startPosition;
      }
    };

    popupBtn.forEach(items => {
      items.addEventListener("click", () => {
        if (block < 768){
         popupContent.style.display = 'block';
         paramsAnimation.count = paramsAnimation.endPosition;
         cancelAnimationFrame(popupAnimation);
        }

        popup.style.display = "block";
        requestAnimationFrame(popupAnimation);
      });
    });

    popupClose.addEventListener("click", () => {
      popup.style.display = "none";
      cancelAnimationFrame(popupAnimation);
    });
    console.log(block);
  };

  togglePopUp();
});
