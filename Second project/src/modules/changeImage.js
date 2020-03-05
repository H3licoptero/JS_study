'use strict';

  const changeImage = () => {
    let imgBlock = document.querySelectorAll(".command__photo"),
      photo;

    // эта переменная будет хранить текущее значение, чтоб в дальнейшем её можно было
    // восстановить, т.к. dataset перезапишет текущее значение и вернуть его  будет невозможно

    imgBlock.forEach(elem =>
      elem.addEventListener("mouseenter", event => {
        photo = event.target.src;
        event.target.src = event.target.dataset.img;
      })
    );

    imgBlock.forEach(elem =>
      elem.addEventListener("mouseleave", event => {
        event.target.src = photo;
      })
    );
  };

  export default changeImage;