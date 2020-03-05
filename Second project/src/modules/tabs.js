'use strict';

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

  export default tabs;