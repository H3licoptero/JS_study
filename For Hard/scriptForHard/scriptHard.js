'use strict';

let lang = prompt('', '');

    if (lang === 'ru') {
        alert('Понедельник, вторник, среда, четверг, пятница');
    } else if (lang === 'en') {
        alert('Monday, tuesday, wednesday, thursday, friday');
    }

    switch (lang) {
        case 'ru':
             alert("Понедельник, вторник, среда, четверг, пятница");
             break;
        case 'en':
            alert("Monday, tuesday, wednesday, thursday, friday");
            break;
    }

let arr = {
  "ru":
   ["Понедельник, вторник, среда, четверг, пятница"],
  "en":
   ["Monday, tuesday, wednesday, thursday, friday"]
};

alert(arr[lang]);


let person = prompt("Введите имя ", " ");
let namePerson = ( person === 'Артём') ? console.log("Директор") :
    (person === 'Максим') ? console.log('Преподаватель') : console.log('Студент');

    