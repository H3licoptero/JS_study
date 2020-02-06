'use strict';


let books = document.querySelectorAll(".books"),
  book = document.querySelectorAll('.book');
    
books[0].insertBefore(book[0], book[1]);  

document.body.style.backgroundImage = "url(./image/you-dont-know-js.jpg)";

let adv = document.querySelector(".adv");
adv.remove();

let bookThree = document.getElementsByTagName("a")[4];
bookThree.textContent = "Книга 3. this и Прототипы Объектов";



let bookTwo = document.querySelectorAll('ul'),
    bookLiTwo = document.querySelectorAll('li');

    

bookTwo[0].insertBefore(bookLiTwo[2], bookLiTwo[2]);
bookTwo[0].insertBefore(bookLiTwo[4], bookLiTwo[5]);
bookTwo[0].insertBefore(bookLiTwo[6], bookLiTwo[4]);
bookTwo[0].insertBefore(bookLiTwo[8], bookLiTwo[4]);
bookTwo[0].insertBefore(bookLiTwo[2], bookLiTwo[10]);



let bookFive = document.querySelectorAll('ul'),
    bookLi = document.querySelectorAll('li');

bookFive[5].insertBefore(bookLi[55], bookLi[48]);
bookFive[5].insertBefore(bookLi[49], bookLi[48]);  
bookFive[5].insertBefore(bookLi[50], bookLi[49]);  
bookFive[5].insertBefore(bookLi[50], bookLi[48]); 
bookFive[5].insertBefore(bookLi[52], bookLi[51]);
bookFive[5].insertBefore(bookLi[53], bookLi[51]);       

books[0].insertBefore(book[1], book[0]);
books[0].insertBefore(book[4], book[2]);  
books[0].insertBefore(book[2], book[5]);
books[0].insertBefore(book[5], book[2]);


let newTitle = document.createElement('li');
newTitle.textContent = "Глава 8: За пределами ES6"; 

let bookSix = document.querySelectorAll('ul'),
 bookSixLi = document.querySelectorAll('li');


bookSix[5].appendChild(newTitle);



bookSix[5].insertBefore(bookSixLi[26], bookSix[42]);
bookSix[5].insertBefore(bookSixLi[25], null);
bookSix[5].insertBefore(bookSixLi[26], null);
bookSix[5].insertBefore(bookSixLi[25], bookSixLi[26]);
bookSix[5].removeChild(bookSixLi[56]);


 let bookThreeUl = document.querySelectorAll('ul'),
  bookThreeLi = document.querySelectorAll('li');



console.log(books);
console.log(book);
console.log(adv);
console.log(bookThree);
console.log(bookFive);
console.log(bookLi);
console.log(newTitle.innerHTML);
console.log(newTitle);
console.log(bookThreeUl);
console.log(bookThreeLi);

