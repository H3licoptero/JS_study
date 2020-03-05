'use strict';

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

 export default slider;