let todos = [
  "Example input",
  "I need to do this",
  "Another something to do",
  "Another one???",
  "Another one???",
  "Another one???",
  "Another one???",
  "Another one???",
  "Another one???",
  "Another one???",
  "Another one???",
];
let searchValue = document.querySelector("#search-input").value;
const todosList = document.querySelector("ul");

const removeTodo = (index) => {
  todos.splice(index, 1);
  createTodos();
};

const createListItem = (value, index) => {
  const liElem = document.createElement("li");

  const text = document.createElement("span");
  text.innerText = value + " ";
  liElem.append(text);
  // remove button
  const button = document.createElement("button");
  button.innerText = "remove";
  button.addEventListener("click", () => removeTodo(index));
  liElem.append(button);

  return liElem;
};

const createTodos = () => {
  todosList.innerHTML = null;
  const pageSize = 8;
  const todosLength = todos.length;
  todos.slice(0, pageSize).forEach((text, index) => {
    if (text.includes(searchValue)) {
      todosList.append(createListItem(text, index));
    }
  });
  document.querySelector("#left-to-show").innerText = `${
    todosLength - pageSize
  } items not showing...`;
};

//create events
document
  .querySelector("#add-item-button")
  .addEventListener("click", function () {
    const input = document.querySelector("#add-item");

    if (input.value !== "") {
      todos.push(input.value);

      createTodos();
      //clean input
      input.value = "";
    }
  });

document.querySelector("#search-input").addEventListener("input", (event) => {
  searchValue = event.target.value;
  createTodos();
});

window.addEventListener("load", () => {
  createTodos();
});
