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
const searchInput = document.querySelector("#search-input");
let searchValue = searchInput.value;
const todosList = document.querySelector("ul");
let showAutoComplete = false;

const removeTodo = (index) => {
  todos.splice(index, 1);
  createTodos();
};

const autoComplete = document.querySelector("#auto-complete");

document.addEventListener("click", (e) => {
  if (e.target.id !== "search-input") {
    showAutoComplete = false;
    createTodos();
  }
});

searchInput.addEventListener("click", () => {
  showAutoComplete = true;
  createTodos();
});

const handleAutoComplete = () => {
  autoComplete.innerHTML = "";
  if (showAutoComplete) {
    const lcSearchValue = searchValue.toLowerCase();
    const todosIncludesSearchValue = todos.filter((text) =>
      text.toLowerCase().includes(lcSearchValue)
    );
    if (todosIncludesSearchValue.length > 0) {
      autoComplete.style.display = "block";
      todosIncludesSearchValue.forEach((todoIncludes) => {
        const p = document.createElement("p");
        p.addEventListener("click", (e) => {
          e.preventDefault();
          searchInput.value = todoIncludes;
          showAutoComplete = false;
          createTodos();
        });
        p.innerText = todoIncludes;
        autoComplete.append(p);
      });
      return;
    }
  }
  autoComplete.style.display = "none";
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

  handleAutoComplete();
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
