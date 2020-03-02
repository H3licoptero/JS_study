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
      let dateStop = new Date("1 march 2020").getTime(),
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
      menu = document.querySelector("menu");

    // обработчик события, который при нажатии вызывает меню
    btnMenu.addEventListener("click", () => {
      let target = event.target;

      if (target.closest(".menu")) {
        menu.classList.toggle("active-menu");
      }
    });

    // обработчик, который закрывает меню если нажать на "х",
    // или если переместиться по странице
    menu.addEventListener("click", () => {
      let target = event.target;

      if (target.closest(".close-btn") || target.closest("a")) {
        menu.classList.toggle("active-menu");
      }
    });
  };

  toggleMenu();

  // popup окно

  const togglePopUp = () => {
    const popup = document.querySelector(".popup"),
      popupContent = document.querySelector(".popup-content"),
      popupBtn = document.querySelectorAll(".popup-btn");

    let block = document.documentElement.clientWidth;

    let paramsAnimation = {
      count: -55,
      startPosition: -55,
      endPostion: 20,
      speed: 2
    };

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
        if (block < 768) {
          popupContent.style.display = "block";
          paramsAnimation.count = paramsAnimation.endPosition;
          cancelAnimationFrame(popupAnimation);
        }

        popup.style.display = "block";
        requestAnimationFrame(popupAnimation);
      });
    });

    // обработчик для закрытия всех окон
    popup.addEventListener("click", event => {
      let target = event.target;

      if (target.classList.contains("popup-close")) {
        popup.style.display = "none";
      } else {
        target = target.closest(".popup-content");

        if (!target) {
          popup.style.display = "none";
        }
      }
    });
  };

  togglePopUp();

  // табы
  const tabs = () => {
    // получаем наши элементы со страницы
    const tabHeader = document.querySelector(".service-header"),
      tab = tabHeader.querySelectorAll(".service-header-tab"),
      tabContent = document.querySelectorAll(".service-tab");

    // пишем фунцкцию для активации и скрытия окон с услугами
    const toggleTabContent = index => {
      for (let i = 0; i < tabContent.length; i++) {
        if (index === i) {
          tab[i].classList.add("active");
          tabContent[i].classList.remove("d-none");
        } else {
          tab[i].classList.remove("active");
          tabContent[i].classList.add("d-none");
        }
      }
    };

    // обработчик событий для того, чтоб отрабатывало всё, включая и наш span
    // имеющийся в вёрстке
    tabHeader.addEventListener("click", event => {
      let target = event.target;
      target = target.closest(".service-header-tab");

      if (target) {
        tab.forEach((item, i) => {
          if (item === target) {
            toggleTabContent(i);
          }
        });
      }
    });
  };

  tabs();

  // slider

  const slider = () => {
    const slide = document.querySelectorAll(".portfolio-item"),
      btn = document.querySelectorAll(".portfolio-btn"),
      slider = document.querySelector(".portfolio-content");

    // получаем наш список с точками
    let portfolioDots = document.querySelector(".portfolio-dots");

    // номер слайда
    let currentSlide = 0,
      interval;

    // функция для создания точек, равному количеству слайдов
    const countSlide = () => {
      slide.forEach((item, i) => {
        let newDot = document.createElement("li");
        newDot.classList.toggle("dot");
        portfolioDots.appendChild(newDot);

        if (i === 0) {
          newDot.classList.add("dot-active");
        }
      });
    };
    countSlide();

    //основные ф-ии для работы со слайдами
    const prevSlide = (elem, index, strClass) => {
      elem[index].classList.remove(strClass);
    };

    const nextSlide = (elem, index, strClass) => {
      elem[index].classList.add(strClass);
    };

    let dot = document.querySelectorAll(".dot");

    // ф-ия для работы слайдера
    const autoPlaySlide = () => {
      prevSlide(slide, currentSlide, "portfolio-item-active");
      prevSlide(dot, currentSlide, "dot-active");

      currentSlide++;

      if (currentSlide >= slide.length) {
        currentSlide = 0;
      }

      nextSlide(slide, currentSlide, "portfolio-item-active");
      nextSlide(dot, currentSlide, "dot-active");
    };

    const startSlide = (time = 3000) => {
      interval = setInterval(autoPlaySlide, time);
    };

    const stopSlide = () => {
      clearInterval(interval);
    };

    slider.addEventListener("click", event => {
      event.preventDefault();

      let target = event.target;

      if (!target.matches(".portfolio-btn, .dot")) {
        return;
      }

      // убираем активные классы
      prevSlide(slide, currentSlide, "portfolio-item-active");
      prevSlide(dot, currentSlide, "dot-active");

      if (target.matches("#arrow-right")) {
        currentSlide++;
      } else if (target.matches("#arrow-left")) {
        currentSlide--;
      } else if (target.matches(".dot")) {
        dot.forEach((elem, index) => {
          if (elem === target) {
            currentSlide = index;
          }
        });
      }

      if (currentSlide >= slide.length) {
        currentSlide = 0;
      }

      if (currentSlide < 0) {
        currentSlide = slide.length - 1;
      }

      // добавляем активные классы после условий
      nextSlide(slide, currentSlide, "portfolio-item-active");
      nextSlide(dot, currentSlide, "dot-active");
    });

    slider.addEventListener("mouseover", event => {
      if (
        event.target.matches(".portfolio-btn") ||
        event.target.matches(".dot")
      ) {
        stopSlide();
      }
    });

    slider.addEventListener("mouseout", event => {
      if (
        event.target.matches(".portfolio-btn") ||
        event.target.matches(".dot")
      ) {
        startSlide();
      }
    });

    startSlide(1500);
  };

  slider();

  // Калькулятор
  const calc = (price = 100) => {
    let calcBlock = document.querySelector(".calc-block"),
      calcType = document.querySelector(".calc-type"),
      calcSquare = document.querySelector(".calc-square"),
      calcCount = document.querySelector(".calc-count"),
      calcDay = document.querySelector(".calc-day"),
      totalValue = document.getElementById("total");

    const countSum = () => {
      let total = 0,
        countValue = 1,
        dayValue = 1;

      let typeValue = calcType.options[calcType.selectedIndex].value,
        squareValue = +calcSquare.value;

      if (calcCount.value > 1) {
        countValue += (calcCount.value - 1) / 10;
      }

      if (calcDay.value && calcDay.value < 5) {
        dayValue *= 2;
      } else if (calcDay.value && calcDay.value < 10) {
        dayValue *= 1.5;
      }

      if (typeValue && squareValue) {
        total = price * typeValue * squareValue * countValue * dayValue;
      }

      totalValue.textContent = Math.ceil(total);
    };

    calcBlock.addEventListener("change", event => {
      let target = event.target;

      if (target.matches("input") || target.matches("select")) {
        countSum();
      }
    });

    // проверка ввода на числа
    let checkInputs = () => {
      let inputBlock = document.querySelectorAll(".calc-item");

      inputBlock.forEach(el =>
        el.addEventListener("input", event => {
          let target = event.target;
          if (target.matches("input")) {
            target.value = target.value.replace(/\D/g);
          }
        })
      );
    };

    checkInputs();
  };

  calc(100);

  // отправка формы с использованием ajax
  const sendForm = () => {
    // создаём переменные с текущим статусом после отправки данных
    const errorMessage = "Что-то пошло не так...",
      loadMessage = "Загрузка...",
      succsessMessage = "Спасибо, мы скоро с вами свяжемся!";

    // получаем наши формы
    const forms = document.querySelectorAll("form");

    // создаем элемент с сообщением о статусе запроса
    const statusMessage = document.createElement("div");
    statusMessage.style.cssText = "font-size: 2rem;";

    // только русские буквы и пробелы на ввод в "поле с именем" и "сообщение"
    const formName = document.querySelectorAll("[name=user_name], [name=user_message]");

    // ввод только для цифр в поля "номер телефона"
    const formPhone = document.querySelectorAll(".form-phone");

    formName.forEach(elems =>
      elems.addEventListener("input", event => {
        let target = event.target;
        target.value = target.value.replace(/[^а-яА-ЯЁё ]$/gi, "");
      })
    );

    formPhone.forEach(el =>
      el.addEventListener("input", event => {
        let target = event.target;
        target.value = target.value.replace(/[^+\d]/g, "");
      })
    );

    const postData = (body, outputData, errorData) => {
      const request = new XMLHttpRequest();
      request.addEventListener("readystatechange", () => {
        if (request.readyState !== 4) {
          return;
        }
        if (request.status === 200) {
          outputData();
        } else {
          errorData(request.status);
        }
      });
      request.open("POST", "./server.php");
      request.setRequestHeader("Content-Type", "application/json");

      request.send(JSON.stringify(body));
    };

    forms.forEach(el =>
      el.addEventListener("submit", event => {
        let target = event.target;

        event.preventDefault();
        el.appendChild(statusMessage);
        statusMessage.textContent = loadMessage;
        const formData = new FormData(el);
        let body = {};

        formData.forEach((value, key) => {
          body[key] = value;
        });

        postData(
          body,
          () => {
            statusMessage.textContent = succsessMessage;
            el.reset();
          },
          error => {
            statusMessage.textContent = errorMessage;
            console.error(error);
          }
        );
      })
    );
  };

  sendForm();

  // картинки по атрибутам
  const changeImage = () => {
    let imgBlock = document.querySelectorAll(".command__photo"),
      photo;

    // эта переменная будет хранить текущее значение, чтоб в дальнейшем её можно было
    // восстановить, т.к. dataset перезапишет текущее значение и вернуть его  будет невозможно

    imgBlock.forEach(elem =>
      elem.addEventListener("mouseenter", event => {
        photo = event.target.src;
        event.target.src = event.target.dataset.img;
      })
    );

    imgBlock.forEach(elem =>
      elem.addEventListener("mouseleave", event => {
        event.target.src = photo;
      })
    );
  };

  changeImage();
});
