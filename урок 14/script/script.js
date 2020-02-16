"use strict";

function DomElement(selector, height, width, bg, fontSize) {

  this.selector = selector;
  this.height = height;
  this.width = width;
  this.bg = bg;
  this.fontSize = fontSize;

}

let createElement = document.querySelector(".create"),
  enter = document.querySelector(".enter");

enter.addEventListener("click", function() {
  let newEl = document.createElement("p");
  let newDiv = document.createElement("div");

  if (createElement.value.charAt(0) === ".") {
    newDiv.className = "block";
    newDiv.style.backgroundColor = 'beige';
    newDiv.style.fontSize = '30px';
    newDiv.textContent = createElement.value.slice(1);
    document.body.append(newDiv);
  } else if (createElement.value.charAt(0) === "#") {
    newEl.className = "best";
    newEl.style.backgroundColor = "gold";
    newEl.style.fontSize = "30px";
    newEl.textContent = createElement.value.slice(1);
    document.body.append(newEl);
  }
});



// DomElement.prototype.createElem = function() {
//   let element = this.selector;
//   if(element.startsWith('.') === true){
//     element = document.createElement('div');
//     element.className = 'block';
//     element.style.height = this.heigth;
//     element.style.width = this.width;
//     element.style.backgroundColor = this.bg;
//     element.style.fontSize = this.fontSize;
//     document.body.append(element);
//   }
// };

// let element = new DomElement(".div", "100px", "200px", "beige", "20px");

// console.log(element);

// DomElement.prototype.createElem(element);


