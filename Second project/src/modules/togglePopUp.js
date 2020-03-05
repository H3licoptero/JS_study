'use strict';

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

 export default togglePopUp;