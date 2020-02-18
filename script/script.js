"use strict";

let calculate = document.getElementById("start"),
  cancel = document.getElementById("cancel"),
  incomeBtn = document.getElementsByTagName("button")[0],
  expensesBtn = document.getElementsByTagName("button")[1],
  depositCheck = document.querySelector("#deposit-check"),
  additionalIncomeItem = document.querySelectorAll(".additional_income-item"),
  data = document.getElementsByClassName("data"),
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
  incomeItems = document.querySelectorAll(".income-items"),
  depositBank = document.querySelector('.deposit-bank'),
  depositAmount = document.querySelector('.deposit-amount'),
  depositPercent = document.querySelector('.deposit-percent');

let budgetMonth = document.getElementsByClassName("budget_month-value")[0],
  budgetDay = document.getElementsByClassName("budget_day-value")[0],
  expensesMonth = document.getElementsByClassName("expenses_month-value")[0],
  additionalIncome = document.getElementsByClassName("additional_income-value")[0],
  additionalExpensesValue = document.getElementsByClassName("additional_expenses-value")[0],
  incomePeriodValue = document.getElementsByClassName("income_period-value")[0],
  targetMonth = document.getElementsByClassName("target_month-value")[0];

class AppData {
  constructor() {
    this.income = {};
    this.incomeMonth = 0;
    this.addIncome = [];
    this.expenses = {};
    this.addExpenses = [];
    this.deposit = false;
    this.percentDeposit = 0;
    this.moneyDeposit = 0;
    this.budget = 0;
    this.budgetDay = 0;
    this.budgetMonth = 0;
    this.expensesMonth = 0;
  }

  isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }

  start() {
    // блокировка рассчёта при пустых полях
    if (salaryAmount.value === "") {
      return;
    }

    cancel.style.display = "block";
    calculate.style.display = "none";

    inputs = document.querySelectorAll("input[type = text]");
    for (let i = 0; i < inputs.length; i++) {
      inputs[i].setAttribute("disabled", 1);

      incomeBtn.setAttribute("disabled", true);
      expensesBtn.setAttribute("disabled", true);
    }



    //поле с суммой нашего месячного дохода
    this.budget = +salaryAmount.value;

    // вызов наших методов рассчёта
    this.getExpenses();
    this.getIncome();
    this.getExpensesMonth();
    this.getAddExpenses();
    this.getAddIncome();
    this.getInfoDeposit();
    this.getBudget();
    this.depositPersentRender();

    this.showResult();
  }

  /* изменения значений при использовании скролла periodSelect,
  динамическое изменение "накоплений за период" после расчёта */
  calcPeriod() {
    const monthDeposit = this.moneyDeposit * (this.percentDeposit / 100);
    incomePeriodValue.value = salaryAmount.value * periodSelect.value + monthDeposit;
    periodAmount.textContent = periodSelect.value;
  }

  //метод для вывода всех наших рассчётов в поля всего блока result(html)
  showResult() {
    budgetMonth.value = this.budgetMonth;
    budgetDay.value = this.budgetDay;
    expensesMonth.value = this.expensesMonth;
    additionalExpensesValue.value = this.addExpenses.join(", ");
    additionalIncome.value = this.addIncome.join(", ");
    targetMonth.value = Math.ceil(this.getTargetMonth());
    incomePeriodValue.value = this.calcSavedMoney();
    periodSelect.addEventListener("change", () => {
      this.calcPeriod();
    });
  }

  //запись расходов в наш объект expenses
  getExpensesMonth() {
    for (let key in this.expenses) {
      this.expensesMonth += this.expenses[key];
    }
  }

  //тут рассчитывается месячный доход с учётом расходов(budgetMonth), а так же расчитывается доход на день
  getBudget() {
    const monthDeposit = this.moneyDeposit * (this.percentDeposit / 100);
    this.budgetMonth = +this.budget + this.incomeMonth - this.expensesMonth + monthDeposit;
    this.budgetDay = Math.ceil(this.budgetMonth / 30);
  }

  //рассчитываем возможный доход запись в поля "additional_income-item"
  getAddIncome() {
    additionalIncomeItem.forEach(item => {
      let itemValue = item.value.trim();
      if (itemValue !== "") {
        this.addIncome.push(itemValue);
      }
    });
  }

  //записываем наши возможные расходы в поле "возможные расходы"(additional_expenses-item)
  getAddExpenses() {
    const additionalExpensesAdd = additionalExpensesItem.value.split(",");
    additionalExpensesAdd.forEach(item => {
      item = item.trim();
      if (item !== "") {
        this.addExpenses.push(item);
      }
    });
  }

  //добавляем поля для наших возможных доходов
  addIncomeBlock() {
    const incomeItemClone = incomeItems[0].cloneNode(true);
    incomeItems[0].parentNode.insertBefore(incomeItemClone, incomeBtn);
    incomeItems = document.querySelectorAll(".income-items");
    if (incomeItems.length === 3) {
      incomeBtn.style.display = "none";
    }
  }

  // рассчитываем доп.доход в модальных окнах
  getIncome() {
    incomeItems.forEach(item => {
      let itemsIncome = item.querySelector(".income-title").value;
      let cashItems = item.querySelector(".income-amount").value;

      if (itemsIncome !== "" && cashItems !== "") {
        this.income[itemsIncome] = +cashItems;
      }
    });
    for (let key in this.income) {
      this.incomeMonth += +this.income[key];
    }
  }

  //блок для занаесения значений в поле обязательных расходов(expenses)
  addExpensesBlock() {
    const expensesItemClone = expensesItems[0].cloneNode(true);
    expensesItems[0].parentNode.insertBefore(expensesItemClone, expensesBtn);
    expensesItems = document.querySelectorAll(".expenses-items");
    if (expensesItems.length === 3) {
      expensesBtn.style.display = "none";
    }
  }

  // метод для записи в поля "Наименование" и "Сумма" в обязательных расходах
  getExpenses() {
    expensesItems.forEach(item => {
      let itemExpenses = item.querySelector(".expenses-title").value;
      let cashExpenses = item.querySelector(".expenses-amount").value;
      if (itemExpenses !== "" && cashExpenses !== "") {
        this.expenses[itemExpenses] = +cashExpenses;
      }
    });
  }

  //цель за месяц
  getTargetMonth() {
    return targetAmount.value / this.budgetMonth;
  }

  //условия для проверки уровня доходов
  getStatusIncome() {
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
  }

  //условия для рассчёта цели по времени(в месяцах)
  resultTargetMonth() {
    if (this.getTargetMonth() < 0) {
      return "Цель не будет достигнута";
    } else if (this.getTargetMonth() > 0) {
      return (
        "Цель будет достигнута за " +
        Math.max(Math.round(this.getTargetMonth())) +
        " месяцев!"
      );
    }
  }

  //депозит
  getInfoDeposit() {
    if(this.deposit) {
      this.percentDeposit = depositPercent.value;
      this.moneyDeposit = depositAmount.value;
    }
  }

  // метод для рассчёта результата
  calcSavedMoney() {
    return this.budgetMonth * periodSelect.value;
  }

  // сброс к первоначальному виду
  reset() {
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

    depositBank.style.display = "none";
    depositBank.value = '';
    depositPercent.style.display = "none";
    depositPercent.value = '';
    depositAmount.style.display = "none";
    depositCheck.checked = false;


    for (let i = 0; i < inputs.length; i++) {
      inputs[i].value = "";
      inputs[i].removeAttribute("disabled", 1);
      periodSelect.value = 1;
      periodAmount.textContent = periodSelect.value = 1;
      incomeBtn.removeAttribute("disabled", true);
      expensesBtn.removeAttribute("disabled", true);
    }

    for (let i = 0; i < incomeItems.length; i++) {
      if (i !== 0) {
        incomeItems[i].remove();
      }
      incomeBtn.style.display = "block";
    }

    for (let i = 0; i < expensesItems.length; i++) {
      if (i !== 0) {
        expensesItems[i].remove();
      }
      expensesBtn.style.display = "block";
    }    
  }


 // добавляем скрытое поле процент по депозиту
  changePersent() {
    const valueSelect = this.value;
    if(valueSelect === 'other') {
      depositPercent.style.display = 'inline-block';
      depositPercent.value = '';
    } else {
      depositPercent.value = valueSelect;
      depositPercent.style.display = "none";
    }
  }

  // метод для проверки на корректные данные в поле процент по депозиту(скрытое поле)
  depositPersentRender() {
      if (depositPercent.value > 100 || isNaN(depositPercent.value)) {
        alert("Введите корректное значение в поле проценты!");
        depositPercent.value = '';
      }
  } 

  //метод для депозита
  depositHandler() {
    if(depositCheck.checked) {
      depositBank.style.display = 'inline-block';
      depositAmount.style.display = 'inline-block';
      this.deposit = true;
      depositBank.addEventListener('change', this.changePersent);
    } else {
      depositBank.style.display = "none";
      depositAmount.style.display = "none";
      depositBank.value = '';
      depositAmount.value = '';
      this.deposit = false;
      depositBank.removeEventListener('change', this.changePersent);
    }
  }

  // обработчики событий
  eventsListeners() {
    calculate.addEventListener("click", () => {
      this.start();
    });

    incomeBtn.addEventListener("click", () => {
      this.addIncomeBlock();
    });

    expensesBtn.addEventListener("click", () => {
      this.addExpensesBlock();
    });

    cancel.addEventListener("click", () => {
      this.reset();
    });

    periodSelect.addEventListener("input", () => {
      periodAmount.value = this.calcPeriod();
    });

    depositCheck.addEventListener('change', () => {
      this.depositHandler();
    });

    depositPercent.addEventListener('change', () => {
       this.depositPersentRender();
    });
  }
}

const appData = new AppData();
appData.eventsListeners();


