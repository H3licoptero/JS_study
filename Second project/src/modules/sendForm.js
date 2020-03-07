"use strict";

const sendForm = () => {
  // создаём переменные с текущим статусом после отправки данных
  const errorMessage = "Что-то пошло не так...",
    loadMessage = "Загрузка...",
    succsessMessage = "Спасибо, мы скоро с вами свяжемся!";

  // получаем наши формы
  const forms = document.querySelectorAll("form");

  // создаем элемент с сообщением о статусе запроса
  const statusMessage = document.createElement("div");
  statusMessage.style.cssText = "font-size: 2rem;";

  // только русские буквы и пробелы на ввод в "поле с именем"
  const formName = document.querySelectorAll("[name=user_name]");

  // ввод только для цифр в поля "номер телефона"
  const formPhone = document.querySelectorAll(".form-phone");

  formName.forEach(elems =>
    elems.addEventListener("input", event => {
      let target = event.target;
      target.value = target.value.replace(/[^а-яА-ЯЁё ]$/gi, "");
    })
  );

  formPhone.forEach(el =>
    el.addEventListener("input", event => {
      let target = event.target;
      target.value = target.value.replace(/[^+\d]/g, "");
    })
  );

  // только русские буквы и пробелы на ввод в "поле с сообщением"
  const formMessage = document.querySelector("[name=user_message]");

  formMessage.addEventListener("input", event => {
    let target = event.target;
    target.value = target.value.replace(/[^а-яА-ЯЁё.,\?\!\+\-;:() ]$/gi, "");
  });

  const postData = body => {
    return fetch("./server.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    });
  };

  forms.forEach(el =>
    el.addEventListener("submit", event => {
      let target = event.target;

      event.preventDefault();
      el.appendChild(statusMessage);
      statusMessage.textContent = loadMessage;
      const formData = new FormData(el);
      let body = {};

      formData.forEach((value, key) => {
        body[key] = value;
      });

      postData(body)
        .then(response => {
          if (response.status === 400) {
            throw new Error("data is not found");
          }

          if (response.status !== 200) {
            throw new Error("status network not 200");
          }

          statusMessage.textContent = succsessMessage;
          setTimeout(() => (statusMessage.textContent = ""), 5000);
          el.reset();
        })
        .catch(error => {
          statusMessage.textContent = errorMessage;
          setTimeout(() => (statusMessage.textContent = ""), 5000);
          console.error(error);
        });
    })
  );
};

export default sendForm;
