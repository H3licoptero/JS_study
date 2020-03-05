'use strict';

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

 export default toggleMenu;