const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");


document.addEventListener("DOMContentLoaded", loadTasks);

addBtn.addEventListener("click", addTask);
taskInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") addTask();
});

function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText === "") {
    alert("Task cannot be empty!");
    return;
  }

  createTaskElement(taskText);
  saveTask(taskText);

  taskInput.value = "";
}


function createTaskElement(taskText, isDone = false) {
  const li = document.createElement("li");
  li.textContent = taskText;

  if (isDone) li.classList.add("done");

  const btnContainer = document.createElement("div");
  btnContainer.classList.add("btns");

  
  const doneBtn = document.createElement("button");
  doneBtn.innerHTML = "✔";
  doneBtn.title = "Mark as Done";
  doneBtn.addEventListener("click", () => {
    li.classList.toggle("done");
    updateStorage();
  });


  const deleteBtn = document.createElement("button");
  deleteBtn.innerHTML = "🗑";
  deleteBtn.title = "Delete Task";
  deleteBtn.addEventListener("click", () => {
    li.remove();
    updateStorage();
  });

  btnContainer.appendChild(doneBtn);
  btnContainer.appendChild(deleteBtn);
  li.appendChild(btnContainer);

  taskList.appendChild(li);
}


function saveTask(taskText) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push({ text: taskText, done: false });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}


function loadTasks() {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach(task => {
    createTaskElement(task.text, task.done);
  });
}


function updateStorage() {
  let updatedTasks = [];
  document.querySelectorAll("#taskList li").forEach(li => {
    updatedTasks.push({
      text: li.childNodes[0].textContent,
      done: li.classList.contains("done")
    });
  });
  localStorage.setItem("tasks", JSON.stringify(updatedTasks));
}
