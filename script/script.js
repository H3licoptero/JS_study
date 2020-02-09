"use strict";

let calculate = document.getElementById("start"),
  incomeBtn = document.getElementsByTagName("button")[0],
  expnesesBtn = document.getElementsByTagName("button")[1],
  depositCheck = document.querySelector("#deposit-check"),
  additionalIncomeItem = document.querySelectorAll(".additional_income-item");

let salaryAmount = document.querySelector(".salary-amount"),
  incomeTitle = document.querySelectorAll(".income-title")[1],
  incomeAmount = document.querySelector(".income-amount"),
  expensesTitle = document.querySelectorAll(".expenses-title")[1],
  expensesItems = document.querySelectorAll(".expenses-items"),
  additionalExpensesItem = document.querySelector(".additional_expenses-item"),
  periodSelect = document.querySelector(".period-select"),
  periodAmount = document.querySelector(".period-amount"),
  targetAmount = document.querySelector(".target-amount"),
  incomeItems = document.querySelectorAll(".income-items");

let budgetMonth = document.getElementsByClassName("budget_month-value")[0],
  budgetDay = document.getElementsByClassName("budget_day-value")[0],
  expensesMonth = document.getElementsByClassName("expenses_month-value")[0],
  additionalIncome = document.getElementsByClassName("additional_income-value")[0],
  additionalExpensesValue = document.getElementsByClassName("additional_expenses-value")[0],
  incomePeriodValue = document.getElementsByClassName("income_period-value")[0],
  targetMonth = document.getElementsByClassName("target_month-value")[0];
 

// Check number
let isNumber = function(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};


// наш основной объект
let appData = {
  income: {},
  incomeMonth: 0,
  addIncome: [],
  expenses: {},
  addExpenses: [],
  deposit: false,
  percentDeposit: 0,
  moneyDeposit: 0,
  budget: 0,
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,

  // перенесли ф-ию start в appData. Ф-ия для укзания месячного дохода.
  start: function() {

    if(salaryAmount.value === '') {
       return;
     }
  

    //поле с суммой нашего месячног дохода
    appData.budget = +salaryAmount.value;

    // вызов наших методов рассчёта
    appData.getExpenses();
    appData.getIncome();
    appData.getExpensesMonth();
    appData.getAddExpenses();
    appData.getAddIncome();
    appData.getBudget();

    appData.showResult();
  },

 


  //метод для вывода всех наших рассчётов в поля всего блока result(html)
  showResult: function() {
    budgetMonth.value = appData.budgetMonth;
    budgetDay.value = appData.budgetDay;
    expensesMonth.value = appData.expensesMonth;
    additionalExpensesValue.value = appData.addExpenses.join(", ");
    additionalIncome.value = appData.addIncome.join(", ");
    targetMonth.value = Math.ceil(appData.getTargetMonth());
    incomePeriodValue.value = appData.calcSavedMoney();
  },

  getExpensesMonth: function() {
    for (let key in appData.expenses) {
      appData.expensesMonth += appData.expenses[key];
    }
  },

  //тут рассчитывается месячный доход с учётом расходов(budgetMonth), а так же расчитывается доход на день
  getBudget: function() {
    appData.budgetMonth = +appData.budget + appData.incomeMonth - appData.expensesMonth;
    appData.budgetDay = Math.ceil(appData.budgetMonth / 30);
  },

  //рассчитываем возможный доход запись в поля "additional_income-item"
  getAddIncome: function() {
    additionalIncomeItem.forEach(function(item) {
      let itemValue = item.value.trim();
      if (itemValue !== "") {
        appData.addIncome.push(itemValue);
      }
    });
  },

  //записываем наши возможные расходы в поле "возможные расходы"(additional_expenses-item)
  getAddExpenses: function() {
    let additionalExpensesAdd = additionalExpensesItem.value.split(",");
    additionalExpensesAdd.forEach(function(item) {
      item = item.trim();
      if (item !== "") {
        appData.addExpenses.push(item);
      }
    });
  },

  //добавляем поля для наших возможных доходов
  addIncomeBlock: function() {
    let incomeItemClone = incomeItems[0].cloneNode(true);
    incomeItems[0].parentNode.insertBefore(incomeItemClone, incomeBtn);
    incomeItems = document.querySelectorAll(".income-items");
    if (incomeItems.length === 3) {
      incomeBtn.style.display = "none";
    }
  },

  //рассчитываем доп.доход в модальых окнах
  getIncome: function() {
  incomeItems.forEach(function(item) {
     let itemsIncome = item.querySelector(".income-title").value;
     let cashItems = item.querySelector(".income-amount").value;

     if(itemsIncome !== '' && cashItems !== '') {
       appData.income[itemsIncome] = +cashItems;
     }
   });
  },

  //цель за месяц
  getTargetMonth: function() {
    return targetAmount.value / appData.budgetMonth;
  },

  //условия для проверки уровня доходов
  getStatusIncome: function() {
    if (appData.budgetDay === 0) {
      return "Пора в жизни что-то менять!";
    } else if (appData.budgetDay >= 1200) {
      return "У Вас Высокий уровень дохода!";
    } else if (appData.budgetDay >= 600) {
      return "У Вас средний уровень дохода.";
    } else if (appData.budgetDay > 0) {
      return "К сожалению, у Вас уровень дохода ниже среднего.";
    } else if (appData.budgetDay < 0) {
      return "Что-то пошло не так!";
    }
  },

  //условия для рассчёта цели по времени(в месяцах)
  resultTargetMonth: function() {
    if (appData.getTargetMonth() < 0) {
      return "Цель не будет достигнута";
    } else if (appData.getTargetMonth() > 0) {
      return (
        "Цель будет достигнута за " +
        Math.max(Math.round(appData.getTargetMonth())) +
        " месяцев!"
      );
    }
  },

  //блок для занаесения значений в поле обязательных расходов(expenses)
  addExpensesBlock: function() {
    let expensesItemClone = expensesItems[0].cloneNode(true);
    expensesItems[0].parentNode.insertBefore(expensesItemClone, expnesesBtn);
    expensesItems = document.querySelectorAll(".expenses-items");
    if (expensesItems.length === 3) {
      expnesesBtn.style.display = "none";
    }
  },

  //метод для записи в поля "Наименование" и "Сумма" в обязательных расходах
  getExpenses: function() {
    expensesItems.forEach(function(item) {
      let itemExpenses = item.querySelector(".expenses-title").value;
      let cashExpenses = item.querySelector(".expenses-amount").value;
      if (itemExpenses !== "" && cashExpenses !== "") {
        appData.expenses[itemExpenses] = +cashExpenses;
      }
    });
  },

  getInfoDeposit: function() {
    while (
      !isNumber(appData.percentDeposit) ||
      appData.percentDeposit === 0 ||
      appData.percentDeposit === ""
    ) {
      appData.percentDeposit = +prompt("Какой годовой процент?", "");
    }

    while (
      !isNumber(appData.moneyDeposit) ||
      appData.moneyDeposit === 0 ||
      appData.moneyDeposit === ""
    ) {
      appData.moneyDeposit = +prompt("Какая сумма заложена?", "");
    }
  },

  // метод для рассчёта результата
  calcSavedMoney: function() {
    return appData.budgetMonth * periodSelect.value;
  },


   /* изменения значений при использовании скролла periodSelect,
   динамическое изменение "накоплений за период" после расчёта */
  // rangeSelect: function() {
    // periodSelect.oninput = function() {
    //   // let periodAmount = document.querySelector(".period-amount");

    //   periodAmount.innerHTML = periodSelect.value;
    //   targetMonth.value = periodSelect.value;
    //   incomePeriodValue.value = appData.calcSavedMoney();
    // };
  // }
};


calculate.addEventListener('click', appData.start);
incomeBtn.addEventListener("click", appData.addIncomeBlock);
expnesesBtn.addEventListener('click', appData.addExpensesBlock);


appData.getTargetMonth();
console.log("Расходы на месяц составят: " + appData.expensesMonth);
console.log(appData.getStatusIncome());

/* изменения значений при использовании скролла periodSelect,
  динамическое изменение "накоплений за период" после расчёта */
periodSelect.oninput = function() {
   periodAmount.textContent = periodSelect.value;
   targetMonth.value = periodSelect.value;
   incomePeriodValue.value = appData.calcSavedMoney();
};


