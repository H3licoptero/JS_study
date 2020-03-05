'use strict';

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

    // только русские буквы и пробелы на ввод в "поле с именем" и "сообщение"
    const formName = document.querySelectorAll(
      "[name=user_name], [name=user_message]"
    );

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
            el.reset();
          })
          .catch(error => {
            statusMessage.textContent = errorMessage;
            console.error(error);
          });
      })
    );
  };

  export default sendForm;