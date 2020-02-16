"use strict";

function DomElement(selector, height, width, bg, fontSize) {

  this.selector = selector;
  this.height = height;
  this.width = width;
  this.bg = bg;
  this.fontSize = fontSize;

}

DomElement.prototype.createElem = function() {
  
  let createElement = document.querySelector(".create"), // это инпут, где вводится сообщение
    enter = document.querySelector(".enter"); // это конпка ввода

  enter.addEventListener("click", function() {

    let elementDiv = document.createElement("div"); //создаем div
    let elementParagraph = document.createElement("p"); // создаем параграф

    this.selector = createElement;
    if (this.selector.value.charAt(0) === ".") {
      elementDiv.className = "block";
      elementDiv.style.height = this.height;
      elementDiv.style.width = this.width;
      elementDiv.style.backgroundColor = this.bg;
      elementDiv.style.fontSize = this.fontSize;
      elementDiv.textContent = this.selector.value.slice(1);
      document.body.append(elementDiv);

    } else if (this.selector.value.charAt(0) === "#") {
      elementParagraph.className = "best";
      elementParagraph.style.height = this.height;
      elementParagraph.style.width = this.width;
      elementParagraph.style.backgroundColor = this.bg;
      elementParagraph.style.fontSize = this.fontSize;
      elementParagraph.textContent = this.selector.value.slice(1);
      document.body.append(elementParagraph);
    }
  });

  
};

 let element = new DomElement(".div", "100px", "200px", "beige", "20px");


DomElement.prototype.createElem(element);



// console.log(DomElement(element));



// let createElement = document.querySelector(".create"),
//   enter = document.querySelector(".enter");

// enter.addEventListener("click", function() {
//   let newEl = document.createElement("p");
//   let newDiv = document.createElement("div");

//   if (createElement.value.charAt(0) === ".") {
//     newDiv.className = "block";
//     newDiv.style.backgroundColor = 'beige';
//     newDiv.style.fontSize = '30px';
//     newDiv.textContent = createElement.value.slice(1);
//     document.body.append(newDiv);

//   } else if (createElement.value.charAt(0) === "#") {
//     newEl.className = "best";
//     newEl.style.backgroundColor = "gold";
//     newEl.style.fontSize = "30px";
//     newEl.textContent = createElement.value.slice(1);
//     document.body.append(newEl);
//   }
// });


