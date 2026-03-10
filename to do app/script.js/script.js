const input = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const list = document.getElementById("taskList");
const clearBtn = document.getElementById("clearBtn");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks(){
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks(){
    list.innerHTML = "";

    tasks.forEach((task, index) => {

        const li = document.createElement("li");

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;

        checkbox.addEventListener("change", () => {
            tasks[index].completed = checkbox.checked;
            saveTasks();
            renderTasks();
        });

        const span = document.createElement("span");
        span.textContent = task.text;

        if(task.completed){
            span.classList.add("completed");
        }

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Удалить";

        deleteBtn.addEventListener("click", () => {
            tasks.splice(index,1);
            saveTasks();
            renderTasks();
        });

        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(deleteBtn);

        list.appendChild(li);

    });

}

addBtn.addEventListener("click", () => {

    const text = input.value.trim();

    if(text === "") return;

    tasks.push({
        text: text,
        completed: false
    });

    input.value = "";

    saveTasks();
    renderTasks();

});

clearBtn.addEventListener("click", () => {
    tasks = [];
    saveTasks();
    renderTasks();
});

renderTasks();