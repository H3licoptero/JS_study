"use strict";

let calculate = document.getElementById("start"),
  cancel = document.getElementById('cancel'),
  incomeBtn = document.getElementsByTagName("button")[0],
  expensesBtn = document.getElementsByTagName("button")[1],
  depositCheck = document.querySelector("#deposit-check"),
  additionalIncomeItem = document.querySelectorAll(".additional_income-item"),
  data = document.getElementsByClassName('data'),
  inputs = document.querySelectorAll("input[type = text]");

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
    // блокировка рассчёта при пустых полях
    if (salaryAmount.value === "") {
      return;
    }

    cancel.style.display = 'block';
    calculate.style.display = 'none';

    inputs = document.querySelectorAll('input[type = text]');
    for(let i = 0; i < inputs.length; i++) {
      inputs[i].setAttribute('disabled', 1);
    
      incomeBtn.setAttribute('disabled', true);
      expensesBtn.setAttribute('disabled', true);
    }

    //поле с суммой нашего месячного дохода
    this.budget = +salaryAmount.value;

    // вызов наших методов рассчёта
    this.getExpenses();
    this.getIncome();
    this.getExpensesMonth();
    this.getAddExpenses();
    this.getAddIncome();
    this.getBudget();

    this.showResult();
  },

  /* изменения значений при использовании скролла periodSelect,
  динамическое изменение "накоплений за период" после расчёта */
  calcPeriod: function() {
    incomePeriodValue.value = salaryAmount.value * periodSelect.value;
    periodAmount.textContent = periodSelect.value; 
  },

  //метод для вывода всех наших рассчётов в поля всего блока result(html)
  showResult: function() {
    budgetMonth.value = this.budgetMonth;
    budgetDay.value = this.budgetDay;
    expensesMonth.value = this.expensesMonth;
    additionalExpensesValue.value = this.addExpenses.join(", ");
    additionalIncome.value = this.addIncome.join(", ");
    targetMonth.value = Math.ceil(this.getTargetMonth());
    incomePeriodValue.value = this.calcSavedMoney();
    periodSelect.addEventListener("change", this.calcPeriod());
  },

  getExpensesMonth: function() {
    for (let key in appData.expenses) {
      appData.expensesMonth += appData.expenses[key];
    } 
  },

  //тут рассчитывается месячный доход с учётом расходов(budgetMonth), а так же расчитывается доход на день
  getBudget: function() {
    this.budgetMonth = +this.budget + this.incomeMonth - this.expensesMonth;
    this.budgetDay = Math.ceil(this.budgetMonth / 30); 
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

      if (itemsIncome !== "" && cashItems !== "") {
        appData.income[itemsIncome] = +cashItems;
      }
    });    
  },

  //цель за месяц
  getTargetMonth: function() {
    return targetAmount.value / this.budgetMonth; 
  },

  //условия для проверки уровня доходов
  getStatusIncome: function() {
    if (this.budgetDay === 0) {
      return "Пора в жизни что-то менять!";
    } else if (this.budgetDay >= 1200) {
      return "У Вас Высокий уровень дохода!";
    } else if (this.budgetDay >= 600) {
      return "У Вас средний уровень дохода.";
    } else if (this.budgetDay > 0) {
      return "К сожалению, у Вас уровень дохода ниже среднего.";
    } else if (this.budgetDay < 0) {
      return "Что-то пошло не так!";
    }
  },

  //условия для рассчёта цели по времени(в месяцах)
  resultTargetMonth: function() {
    if (this.getTargetMonth() < 0) {
      return "Цель не будет достигнута";
    } else if (this.getTargetMonth() > 0) {
      return (
        "Цель будет достигнута за " +
        Math.max(Math.round(this.getTargetMonth())) +
        " месяцев!"
      );
    }
  },

  //блок для занаесения значений в поле обязательных расходов(expenses)
  addExpensesBlock: function() {
    let expensesItemClone = expensesItems[0].cloneNode(true);
    expensesItems[0].parentNode.insertBefore(expensesItemClone, expensesBtn);
    expensesItems = document.querySelectorAll(".expenses-items");
    if (expensesItems.length === 3) {
      expensesBtn.style.display = "none";
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
      !isNumber(this.percentDeposit) ||
      this.percentDeposit === 0 ||
      this.percentDeposit === ""
    ) {
      this.percentDeposit = +prompt("Какой годовой процент?", "");
    }

    while (
      !isNumber(appData.moneyDeposit) ||
      this.moneyDeposit === 0 ||
      this.moneyDeposit === ""
    ) {
      this.moneyDeposit = +prompt("Какая сумма заложена?", "");
    }
  },

  // метод для рассчёта результата
  calcSavedMoney: function() {
    return appData.budgetMonth * periodSelect.value;
  },

  reset: function() {

    this.income = {};
    this.incomeMonth = 0;
    this.addIncom = [];
    this.expenses = {};
    this.addExpenses = [];
    this.deposit = false;
    this.percentDeposit = 0;
    this.moneyDeposit = 0;
    this.budget = 0;
    this.budgetDay = 0;
    this.budgetMonth = 0;
    this.expensesMonth = 0;

    cancel.style.display = "none";
    calculate.style.display = "block";
   
    for (let i = 0; i < inputs.length; i++) {
      inputs[i].value = '';
      inputs[i].removeAttribute("disabled", 1);
      periodSelect.value = 1;
      periodAmount.textContent = periodSelect.value = 1;
      incomeBtn.removeAttribute("disabled", true);
      expensesBtn.removeAttribute("disabled", true);
    }

    for(let i = 0; i < incomeItems.length; i++) {
      if(i !== 0) {
        incomeItems[i].remove();
      }
      incomeBtn.style.display = 'block';
    }

    for(let i = 0; i < expensesItems.length; i++) {
      if(i !== 0) {
         expensesItems[i].remove();
      }
      expensesBtn.style.display = "block";
    }
    
  }
};


calculate.addEventListener('click', function() {
  appData.start();
});

incomeBtn.addEventListener("click", function() {
  appData.addIncomeBlock();
});

expensesBtn.addEventListener('click', function() {
  appData.addExpensesBlock();
});

cancel.addEventListener('click', function() {
  appData.reset();
});


periodSelect.oninput = function() {
  periodAmount.value = appData.calcPeriod();
};