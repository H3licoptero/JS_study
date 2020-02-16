"use strict";

function DomElement(selector, height, width, bg, fontSize) {
  this.selector = selector;
  this.height = height;
  this.width = width;
  this.bg = bg;
  this.fontSize = fontSize;
}

DomElement.prototype.createElem = function() {
  if(this.selector.charAt(0) === '.') {
     let item = document.createElement('div');
     item.classList.add(this.selector.substring(1));
     item.className = 'block';
     item.style.height = this.height;
     item.style.width = this.width;
     item.style.background = this.bg;
     item.style.fontSize = this.fontSize;
     item.textContent = this.selector.substring(1);
     document.body.append(item);

     console.log(item);
  } else if(this.selector.charAt(0) === '#') {
     let itemTwo = document.createElement("p");
     itemTwo.classList.add(this.selector.substring(1));
     itemTwo.className = 'best';
     itemTwo.style.height = this.height;
     itemTwo.style.width = this.width;
     itemTwo.style.background = this.bg;
     itemTwo.style.fontSize = this.fontSize;
     itemTwo.textContent = this.selector.substring(1);
     document.body.append(itemTwo);

     console.log(itemTwo);
  } else {
    alert('Ничего не создано!');
  }

};

 let input = document.querySelector(".create"),
   button = document.querySelector(".enter"),
   string;

button.addEventListener('click', function() {
   let string = input.value;
   input.value = '';
   let element = new DomElement(string, "150px", "300px", "gold", "30px");
   element.createElem();
});



