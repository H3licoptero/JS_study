"use strict";

function DomElement(selector, height, width, bg, fontSize) {

  this.selector = prompt("Create element", selector);
  this.height = height;
  this.width = width;
  this.bg = bg;
  this.fontSize = fontSize;

  function newSelector() {
    let createText = prompt(document.querySelector(".create")),
      enterText = document.querySelector(".enter");
    
       enterText.addEventListener("click", function() {
      let newParagraph = document.createElement("p");
      newParagraph.className = "best";
      newParagraph.textContent = createText.value;
      document.body.append(newParagraph);
    });
  }

  newSelector();

  // function newElem() {
  //   let createText = document.querySelector(".create"),
  //     enterText = document.querySelector(".enter");

  //   enterText.addEventListener("click", function() {
  //     let newParagraph = document.createElement("p");
  //     newParagraph.className = "best";
  //     newParagraph.textContent = createText.value;
  //     document.body.append(newParagraph);
  //   });
  // }

  // function newElemDiv() {
  //   let createText = document.querySelector(".create"),
  //     enterText = document.querySelector(".enter");

  //   enterText.addEventListener("click", function() {
  //     let newDiv = document.createElement("div");
  //     newDiv.className = "block";
  //     newDiv.textContent = createText.value;
  //     document.body.append(newDiv);
  //  });
  // }

  // function createElement(){
  //   let createText = document.querySelector(".create"),
  //     enterText = document.querySelector(".enter");

  //     if(selector.charAt(0) === '.'){
  //   enterText.addEventListener("click", function() {
  //     let newDiv = document.createElement("div");
  //     newDiv.className = "block";
  //     newDiv.textContent = createText.value;
  //     document.body.append(newDiv);
  //   }); 
  // } else if(createText.charAt(0) === '#') {

  //   enterText.addEventListener("click", function() {
  //     let newParagraph = document.createElement("p");
  //     newParagraph.className = "best";
  //     newParagraph.textContent = createText.value;
  //     document.body.append(newParagraph);
  //   });
  //  }
  // }

  // if()

  // newElem();
  // newElemDiv();

  // createElement();
}

let element = new DomElement('div', '100px', '200px', 'red', '30px');
console.log(element);

// let createText = document.querySelector(".create"),
//   enterText = document.querySelector(".enter");

// enterText.addEventListener("click", function() {
//   let newParagraph = document.createElement("p");
//   newParagraph.className = "best";
//   newParagraph.textContent = createText.value;
//   document.body.append(newParagraph);
// });
DomElement();
