
// Selecting HTML Elements

const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const clearBtn = document.getElementById("clearBtn");

const progressText = document.getElementById("progressText");
const progressFill = document.getElementById("progressFill");
const taskSummary = document.getElementById("taskSummary");
const emptyMessage = document.getElementById("emptyMessage");


// Load Tasks from LocalStorage

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];


// Save Tasks

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}


// Display Tasks

function displayTasks() {

    taskList.innerHTML = "";

    emptyMessage.style.display =
        tasks.length === 0 ? "block" : "none";

    tasks.forEach(function(task) {

        const li = document.createElement("li");
        li.className = "task-item";

        if (task.completed) {
            li.classList.add("completed");
        }

        // Checkbox

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.className = "task-checkbox";
        checkbox.checked = task.completed;

        checkbox.addEventListener("change", function() {

            task.completed = checkbox.checked;

            saveTasks();
            displayTasks();

        });


        // Task Text

        const span = document.createElement("span");
        span.className = "task-text";
        span.textContent = task.text;


        // Delete Button

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.className = "delete-btn";

        deleteBtn.addEventListener("click", function() {

            tasks = tasks.filter(function(item) {
                return item.id !== task.id;
            });

            saveTasks();
            displayTasks();

        });


        // Adding Elements to List

        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(deleteBtn);

        taskList.appendChild(li);

    });

    updateProgress();

}


// Add New Task

function addTask() {

    const taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Please enter a task!");
        return;
    }

    const newTask = {
        id: Date.now(),
        text: taskText,
        completed: false
    };

    tasks.push(newTask);

    saveTasks();

    taskInput.value = "";

    displayTasks();

}


// Update Progress

function updateProgress() {

    const totalTasks = tasks.length;

    const completedTasks = tasks.filter(function(task) {
        return task.completed;
    }).length;

    let percentage = 0;

    if (totalTasks > 0) {
        percentage = Math.round(
            (completedTasks / totalTasks) * 100
        );
    }

    progressText.textContent = percentage + "%";

    progressFill.style.width = percentage + "%";

    taskSummary.textContent =
        completedTasks + " of " + totalTasks + " tasks completed";

}


// Clear All Tasks

function clearAllTasks() {

    if (tasks.length === 0) {
        return;
    }

    const confirmClear = confirm(
        "Are you sure you want to delete all tasks?"
    );

    if (confirmClear) {

        tasks = [];

        saveTasks();

        displayTasks();

    }

}


// Event Listeners

addTaskBtn.addEventListener("click", addTask);

taskInput.addEventListener("keydown", function(event) {

    if (event.key === "Enter") {
        addTask();
    }

});

clearBtn.addEventListener("click", clearAllTasks);


// Initial Display

displayTasks();
