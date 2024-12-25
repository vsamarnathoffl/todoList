document.addEventListener("DOMContentLoaded", () => {
  const todoInput = document.getElementById("todoInput");
  const listOfTask = document.getElementById("listOfTask");
  const addButton = document.getElementById("addButton");

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach((task) => {
    renderTask(task);
  });

  addButton.addEventListener("click", () => {
    const textInput = todoInput.value.trim();
    todoInput.value="";
    if (textInput === "") return;

    newTask = {
      id: Date.now(),
      text: textInput,
      completed: false,
    };

    tasks.push(newTask);
    saveTask();
    renderTask(newTask);

  });

  function renderTask(task) {
    const li = document.createElement("li");
    li.setAttribute("data-id", task.id);
    li.innerHTML = `
    <span>${task.text}</span>
    <button>delete</delete>`;

    if (task.completed) li.classList.add("completed");

    li.addEventListener("click", (e) => {
      if (e.target.tagName === "BUTTON") return;
      task.completed = !task.completed;
      li.classList.toggle("completed");
      saveTask();
    });

    li.querySelector("button").addEventListener("click", (e) => {
      e.stopPropagation();
      tasks = tasks.filter((t) => t.id !== task.id);
      saveTask();
      li.remove();
    });

    listOfTask.appendChild(li);
  }
  function saveTask() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
});
