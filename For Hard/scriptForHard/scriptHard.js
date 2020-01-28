'use strict';

 function takeInArg(arg) {
    if (arg !== String()) {
         alert('Вводить можно только строки.');
    } else if (arg.length > 30) {
        console.log(takeInArg.trim());
    } else if (arg.length > 30) {
        console.log(arg.substr(0, 30) + '...');
    }
}


let result = prompt('', '');
console.log();
