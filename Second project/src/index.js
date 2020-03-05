"use strict";

import "@babel/polyfill";
import "nodelist-foreach-polyfill";
import elementClosest from "element-closest";
elementClosest(window);

import countTimer from './modules/countTimer';
import toggleMenu from "./modules/toggleMenu";
import togglePopUp from "./modules/togglePopUp";
import tabs from "./modules/tabs";
import slider from "./modules/slider";
import calc from "./modules/calc";
import sendForm from "./modules/sendForm";
import changeImage from "./modules/changeImage";


countTimer();
// Меню
toggleMenu();
// popup окно
togglePopUp();
// табы
tabs();
// slider
slider();
// Калькулятор
calc(100);
// отправка формы с использованием ajax
sendForm();
// картинки по атрибутам
changeImage();
