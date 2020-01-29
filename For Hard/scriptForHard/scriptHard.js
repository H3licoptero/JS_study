"use strict";

function getMessage(arg) {
  let message = prompt("Введите строку", arg);

  if ((!String(message)) || (Number(message))) {
    alert("Only strings!");
  } else if (message.length > 30) {
    alert(message.substr(0, 30) + "...");
  } else if (String(message)) {
    alert(message.trim());
  } 
}

getMessage();
