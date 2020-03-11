'use strict';

function getString(string) {
    if (string.length >= 30) {
      return alert(string.trim().substr(0, 30) + "...");
    } 

    if (!String(string) || Number(string) || !isNaN(string)) {
      return alert("Значение не является строкой!");
    } else if(string) {
      return alert(string.trim());
    }

     alert(string);
}

let check = prompt('', '');

getString(check);