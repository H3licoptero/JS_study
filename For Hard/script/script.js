'use strict';
 

// через reduce
let num = 266219,
  count = String(num).split(''),
  sort = count.reduce((multiple, value) => multiple * value);
  console.log(sort);
  
let result = sort ** 3,
  firstNumbers = String(result).substr(0,2);

console.log(+firstNumbers);

// через цикл for
let num2 = 266219;
let arr = String(num2).split('');
let countValue,
   sumNumbers,
   multipleNumbers,
   resultCount;

for(let i = 0; i < arr.length; i++) {
    countValue = arr[i];
    arr[0] *= countValue;
    sumNumbers = arr[0] / 2;

    multipleNumbers = sumNumbers ** 3;    
    resultCount = String(multipleNumbers).substr(0, 2);
}

console.log(sumNumbers);
alert(+resultCount);
