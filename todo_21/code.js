"use strict";

import ItemDeal from "./ItemDeal";
import { getRandom, getUniq, json } from "./nordic_random";
// я тут комментарий написал

fetch("https://todopavel2.herokuapp.com/deals")
    .then(response => response.json())
    .then(json => drawOnLoad(json))

const {
  motivation_array,
  important_color,
  animation_in,
  animation_out,
  Month_Array,
} = json;



const mot_speech = document.querySelector(".Mot_speech");
console.log(mot_speech.__proto__);

const select = document.getElementById("important");

const field = document.querySelector("input");

const button = document.querySelector(".button_plus");

const deals = document.getElementById("deals");

//пишем смену наших цитат
setInterval(() => {
  mot_speech.innerHTML = motivation_array[getUniq()];
}, 5000);

//получает из объект localStorage данные по ключу
//ключ - время создания в Unix - времени
// значение - экземпляр класса ItemDeal
//getItem(key) – получить данные по ключу key
//key(index) – получить ключ на заданной позиции.
//setItem - в localStorage назначить значение

//функция добавления дела
// addTask - имя функции
// Прочитать значние field, если не пустой input - проверка ввода
// создаем объект todo
// сохранение в JSON
//сохраняем это в localStorage
// вызвали функцию создания HTML
//очистить field

function addTask() {
  let content = field.value;
  if (!content) {
    // если content == пустой строке
    //то пустая строка + ! = true
    //тогда логическое выражения выполнится и функция прервет работу
    return;
  }

  let todo = new ItemDeal(content, select.value - 1);

  fetch('https://todopavel2.herokuapp.com/deals', {
    method: 'POST',
    body: JSON.stringify({
      prioritet: todo.color,
      content: todo.text,
      create_date: todo.now,
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })  .then((response) => response.json())
      .then((json) => GenerateDOM(json))
  // let todo_to_JSON = JSON.stringify(todo);
  // localStorage.setItem(+todo.now, todo_to_JSON);
  field.value = "";
}

button.addEventListener("click", addTask);
//дальше вешаем события на Enter
document.addEventListener("keypress", (event) => {
  console.log(event);
  if (event.key == "Enter") {
    addTask();
    //https://keycode.info/
  }
});
//показать сохраненные дела - общая задача
//подзадачи
//нужно взять дела из localStorage - for
//парсим из JSON
//заново генерируем Date
//отобразить GenerateDOM
function drawOnLoad(arr) {
  for (let i = 0; i < arr.length; i++) {
    //Приняв число i, метод вернёт имя по номеру ключа в localStorage
    // let lk_ley = localStorage.key(i);
    // let content = localStorage.getItem(lk_ley);
    // let todo = JSON.parse(content);
    // let tempo_data = Date.parse(todo.now);
    // todo.now = new Date(tempo_data);
    GenerateDOM(arr[i]);
  }
}
// drawOnLoad();



function GenerateDOM(obj) {
  // todo удалить pen
  deals.insertAdjacentHTML(
    "afterbegin",
    `
   <div class="wrap_task ${important_color[obj.prioritet]} " id=${obj.id}> 

  <p class="todo_text"> ${obj.content} </p>
  <p>  ${obj.create_date.substring(0, 10)} </p>

  <div> 
   <!-- <i class="material-icons icon_edit">edit</i> -->
   
   <i class="material-icons icon_delete">delete</i> 
   </div>
  </div>`
  );
}

deals.addEventListener("click", (e) => {
  //  удаление дела
  let trash = e.target.closest(".icon_delete");
  let wrap_task = trash.parentNode.parentNode;
  fetch(`https://todopavel2.herokuapp.com/deal/${wrap_task.id}`,{
  // fetch(`http://localhost:3000/deal:${wrap_task.id}`, {
    method: 'DELETE'
  })  .then((response) => response.json())
      .then((json) => alert(json.message))
  wrap_task.remove();
  // localStorage.removeItem(wrap_task.getAttribute("id"));
});

deals.addEventListener("click", (e) => {
  // редактирование дела
  // let pen = e.target.closest(".icon_edit");
  let todo_text = e.target.closest(".todo_text");
  let wrap_task = todo_text.parentNode;
  todo_text.contentEditable = "true";

  //получения выделения или положения курсора

  /*
  let selection = window.getSelection();
  // Вариант с полным выделением текста
  let range = document.createRange();
  // создание пространства символов
  range.selectNodeContents(todo_text);
  // создание пространства, которое ровно содержимому переданного узла


  selection.removeAllRanges();
  selection.addRange(range);
  todo_text.focus();
  */

  let selection = window.getSelection();
  selection.collapse(todo_text, 1);

  // вариант, где курсор в конце текста

  // вызываем объект, который был выделен
  // let selection = window.getSelection();
  /*
    показывает пространство выбранного текста
   */
  // let range = document.createRange(); // создать определенного рода range, т.е. некоторое пространство
  // range.selectNodeContents(todo_text); //получаем содержимое узла
  // selection.removeAllRanges(); // вырубаем все остальные выделения
  // selection.addRange(range); // накидываем выбор узла
  // selection.deleteFromDocument(); -- удалить выделенное
  // selection.collapse(todo_text, 1);

  wrap_task.addEventListener("keypress", (e) => {
    console.log(e);
    if (e.key == "Enter") {
      let data = localStorage.getItem(wrap_task.id);
      let obj = JSON.parse(data);
      obj.text = todo_text.textContent;
      let obj_to_JSON = JSON.stringify(obj);
      localStorage.setItem(wrap_task.id, obj_to_JSON);
      todo_text.contentEditable = "false";
    }
  });
});
