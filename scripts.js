document.getElementById("todo-form").addEventListener("submit", function (event) {
    event.preventDefault();
    const taskInput = document.getElementById("todo-input");
    const task = taskInput.value.trim();

    if (task) {
        addTaskToList(task);
        taskInput.value = "";
    }
});

// Lisää tehtävän listalle
function addTaskToList(task, completed = false) {
    const todoList = document.getElementById("todo-list");
    const li = document.createElement("li");
    li.className = "todo-item";
    if (completed) li.classList.add("completed");

    // Luo "Done"-nappi
    const doneButton = document.createElement("button");
    doneButton.className = "done-button";
    doneButton.textContent = "✔";
    if (completed) doneButton.classList.add("completed");
    doneButton.onclick = () => {
        li.classList.toggle("completed");
        doneButton.classList.toggle("completed");
        saveTasks();
    };

    // Luo "Delete"-nappi
    const deleteButton = document.createElement("button");
    deleteButton.className = "delete-button";
    deleteButton.textContent = "✖";
    deleteButton.onclick = () => {
        li.remove();
        saveTasks();
    };

    // Lisää elementit listaelementtiin
    li.appendChild(doneButton);
    li.appendChild(document.createTextNode(task));
    li.appendChild(deleteButton);

    // Lisää listaelementti tehtävälistaan
    todoList.appendChild(li);
    saveTasks();
}

// Tallentaa tehtävät LocalStorageen
function saveTasks() {
    const tasks = [];
    document.querySelectorAll("#todo-list li").forEach(li => {
        tasks.push({
            text: li.childNodes[1].textContent.trim(),
            completed: li.classList.contains("completed"),
        });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Lataa tallennetut tehtävät
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => addTaskToList(task.text, task.completed));
}

// Lataa tehtävät DOM:n latautuessa
document.addEventListener("DOMContentLoaded", loadTasks);

// Rekisteröi Service Worker
if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker
            .register("/service-worker.js")
            .then((registration) => console.log("Service Worker registered:", registration))
            .catch((error) => console.log("Service Worker registration failed:", error));
    });
}
