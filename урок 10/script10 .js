'use strict';

let books = document.querySelectorAll(".books"),
  book = document.querySelectorAll('.book');
    
books[0].insertBefore(book[0], book[1]);  

let bookThree = document.querySelectorAll('.book')[4];
// bookThree.


console.log(bookThree);
console.log(books);
console.log(book);

books[0].insertBefore(book[1], book[0]);
books[0].insertBefore(book[4], book[2]);  
books[0].insertBefore(book[2], book[5]);
books[0].insertBefore(book[5], book[2]);

let adv = document.querySelector('.adv');
adv.remove();


console.log(adv);
