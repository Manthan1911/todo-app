let currTheme = document.documentElement.getAttribute('data-theme');
var todoList = [
    {
        text: "wakeup early at 5:00 AM",
        checked: false
    },
    {
        text: "brush your teeth daily 2 times",
        checked: false
    },
    {
        text: "exercise daily in morning",
        checked: false
    }
];
var todoListOutputContainer = document.getElementById('todo-list-display');

init();
renderTodos(todoList);

// ----------------------------- ADD-NEW ToDo -----------------------------
function addNewTodo(todoText) {
    if (todoText != "" && todoText != 0 && todoText.length != 0 && !todoList.includes(todoText)) {
        todoList.push({ text: todoText, checked: false });
    }
    else {
        alert("please enter some text");
    }
}
// ----------------------------- RE-RENDERING  the display ----------------------------- 
function renderTodos(todoList) {
    todoListOutputContainer.textContent = "";
    let availableTodosCount = document.getElementById('availableTodosCount');
    availableTodosCount.textContent = todoList.length;
    let currEllId = 0;
    for (let i = 0; i < todoList.length; i++) {
        currEllId++;
        todoListOutputContainer.insertAdjacentHTML('afterbegin', returnTodoBaseFormat(todoList[i], currEllId));
    }
    handleDeleteTodo();
    handleEditTodo();
}
function returnTodoBaseFormat(currEll, currEllId) {
    const baseTodoFormat = `<div id="todo-${currEllId}"class="d-flex output_inputBox jc-sb brdr-y">
                                <button class="btn--edit bg-none">
                                    <svg class="icon">
                                        <use xlink:href="./images/defs.svg#icon-check"></use>
                                    </svg>
                                </button>
                                <p class="todo--text ${currEll.checked ? "txt-lt" : ""}">${currEll.text}</p>
                                <button class="btn--delete bg-none">
                                    <svg class="icon">
                                        <use xlink:href="./images/defs.svg#icon-cross"></use>
                                    </svg>
                                </button>
                            </div>`;
    return baseTodoFormat;
}


// ----------------------------- THEME--BTN -----------------------------
function init() {
    document.getElementById('form__todo-text').focus();
    // console.log("Current theme : ", localStorage.getItem("theme"));
    let localStorageThemeValue = localStorage.getItem("theme");
    if (localStorageThemeValue == null) {
        localStorage.setItem("theme", currTheme);
    }
    else {

        if (localStorageThemeValue != "dark" && localStorageThemeValue != "light") {
            currTheme = "light";
            localStorage.setItem("theme", currTheme);
        }
        else {
            currTheme = localStorageThemeValue;
        }
    }
    // change();
}

// ----------------------------- Changes the theme btn from moon to sun and vice-versa -----------------------------
function change() {
    var oldThemeBtn = document.documentElement.getAttribute("data-theme");
    var themeIcon = document.querySelector("#theme-btn > svg > use");
    let iconName = themeIcon.getAttribute("xlink:href").split("-");
    if (currTheme == "light") {
        currTheme = "dark";
        iconName[1] = "moon";
    }
    else {
        currTheme = "light";
        iconName[1] = "sun";
    }
    themeIcon.setAttribute("xlink:href", iconName.join("-"));
    document.documentElement.setAttribute("data-theme", currTheme);
    localStorage.setItem("theme", currTheme);
}

// ----------------------------- ON-SUBMIT FORM -----------------------------

document.getElementById('todo-form').addEventListener("submit", (e) => {
    e.preventDefault();
    var todoText = document.getElementById('form__todo-text');
    addNewTodo(todoText.value);
    renderTodos(todoList);
    todoText.value = "";
});

// ----------------------------- filter--BTNs -----------------------------
for (let currFilterBtn of document.querySelectorAll(".filter--btn")) {
    currFilterBtn.addEventListener("click", (e) => {
        e.preventDefault();
        switch (currFilterBtn.textContent.toLowerCase()) {
            case "all":
                renderTodos(todoList);
                break;
            case "active":
                renderTodos(todoList.filter(todo => !todo.checked));
                break;
            case "completed":
                renderTodos(todoList.filter(todo => todo.checked));
                break;
            case "clear completed":
                todoList = todoList.filter(todo => !todo.checked);
                renderTodos(todoList);
                break;
        }
    });
}


// ----------------------------- DELETE--TODO -----------------------------
function handleDeleteTodo() {
    for (let currDeleteBtn of document.querySelectorAll(".btn--delete")) {
        currDeleteBtn.addEventListener("click", (e) => {
            e.preventDefault();
            var currDeleteBtnArrIdx = currDeleteBtn.parentElement.id.split('-')[1] - 1;
            if (todoList[currDeleteBtnArrIdx].checked == true) {
                todoList.splice(currDeleteBtnArrIdx, 1);
            }
            else {
                alert("Please mark your todo as checked before deleting.");
            }
            renderTodos(todoList);
        });
    }
}

// ----------------------------- EDIT--TODO -----------------------------
function handleEditTodo() {
    for (let currEditBtn of document.querySelectorAll(".btn--edit")) {
        currEditBtn.addEventListener("click", (e) => {
            e.preventDefault();
            let currDivId = currEditBtn.parentElement.id;
            let currTodoTag = document.querySelector(`#${currDivId} > .todo--text`);

            var currEditBtnArrIdx = currDivId.split('-')[1] - 1;
            if (todoList[currEditBtnArrIdx].checked == true) {
                todoList[currEditBtnArrIdx].checked = false;
                currTodoTag.style.textDecoration = "none";
            }
            else {
                todoList[currEditBtnArrIdx].checked = true;
                currTodoTag.style.textDecoration = "line-through";
            }
        });
    }
}