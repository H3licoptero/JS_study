'use strict';
 
let num = 266219,
  count = String(num).split(''),
  sort = count.reduce((multiple, value) => multiple * value);
  console.log(sort);
  
let result = sort ** 3,
  firstNumbers = String(result).substr(0,2);

console.log(firstNumbers);