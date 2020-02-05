'use strict';


let books = document.querySelectorAll(".books"),
  book = document.querySelectorAll('.book');
    
books[0].insertBefore(book[0], book[1]);  

document.body.style.backgroundImage = "url(./image/you-dont-know-js.jpg)";

let adv = document.querySelector(".adv");
adv.remove();

let bookThree = document.getElementsByTagName("a")[4];
bookThree.textContent = "Книга 3. this и Прототипы Объектов";



let bookSix = document.querySelectorAll('ul'),
    bookLi = document.querySelectorAll('li');

bookSix[5].insertBefore(bookLi[55], bookLi[48]);
bookSix[5].insertBefore(bookLi[49], bookLi[48]);  
bookSix[5].insertBefore(bookLi[50], bookLi[49]);  
bookSix[5].insertBefore(bookLi[50], bookLi[48]); 
bookSix[5].insertBefore(bookLi[52], bookLi[51]);
bookSix[5].insertBefore(bookLi[53], bookLi[51]);       




books[0].insertBefore(book[1], book[0]);
books[0].insertBefore(book[4], book[2]);  
books[0].insertBefore(book[2], book[5]);
books[0].insertBefore(book[5], book[2]);


console.log(books);
console.log(book);
console.log(adv);
console.log(bookThree);
console.log(bookSix);
console.log(bookLi);





