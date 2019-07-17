// Define UI Vars
const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");

// Load all event listeners
loadEventListeners();

// function: loadEventListeners
function loadEventListeners() {
  // DOM load even
  document.addEventListener("DOMContentLoaded", getTasks);
  // Add task event
  form.addEventListener("submit", addTask);
  // Remove task event -- use event delegation!
  taskList.addEventListener("click", removeTask);
  // Clear tasks event
  clearBtn.addEventListener("click", clearTasks);
  // Filter tasks event
  filter.addEventListener("keyup", filterTasks);
}

// function: getTasksFromLS
function getTasks() {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    //some task(s) stored in local storage
    tasks = JSON.parse(localStorage.getItem("tasks"));
    //loop through via forEach
    tasks.forEach(function(task) {
      // Create li element
      const li = document.createElement("li");
      li.className = "collection-item";
      // Create text node and append to li
      li.appendChild(document.createTextNode(task));
      // Create new link element for X
      const link = document.createElement("a");
      // Add class for link element
      link.className = "delete-item secondary-content";
      // Add icon html
      link.innerHTML = '<i class="fa fa-remove" />';
      // Append the link to li
      li.appendChild(link);

      // Append the li to ul
      taskList.appendChild(li);
    });
  }
}

// function: addTask
function addTask(e) {
  if (taskInput.value === "") {
    alert("Please add a task before entering!");
    return;
  }

  // Create li element
  const li = document.createElement("li");
  li.className = "collection-item";
  // Create text node and append to li
  li.appendChild(document.createTextNode(taskInput.value));
  // Create new link element for X
  const link = document.createElement("a");
  // Add class for link element
  link.className = "delete-item secondary-content";
  // Add icon html
  link.innerHTML = '<i class="fa fa-remove" />';
  // Append the link to li
  li.appendChild(link);

  // Append the li to ul
  taskList.appendChild(li);

  // Store in local storage
  storeTaskInLocalStorage(taskInput.value);

  //Clear input
  taskInput.value = "";

  e.preventDefault();
}

// function: storeTaskInLocalStorage
function storeTaskInLocalStorage(task) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    //some task(s) stored in local storage
    tasks = JSON.parse(localStorage.getItem("tasks"));
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
}

// function: removeTask
function removeTask(e) {
  if (e.target.parentElement.classList.contains("delete-item")) {
    if (confirm("Are you sure!")) {
      e.target.parentElement.parentElement.remove();
      //Remove from local storage
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}

// function: removeTaskFromLocalStorage
function removeTaskFromLocalStorage(taskItem) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    //some task(s) stored in local storage
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.forEach(function(task, index) {
    if (taskItem.textContent === task) {
      tasks.splice(index, 1); //
    }
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// function: clearTasks
function clearTasks(e) {
  /**
   * Hacky way:
   * taskList.innerHTML = '';
   * Ref: https://jsperf.com/innerhtml-vs-removechild/47
   */
  // loop through and remove first child while it exists
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }

  // clear from local storage
  clearTasksFromLocalStorage();
}

// function: clearLocalStorage
function clearTasksFromLocalStorage() {
  localStorage.clear();
}

// function: filterTasks
function filterTasks(e) {
  const text = e.target.value.toLowerCase();
  //querySelectorAll returns nodelist - use forEach
  document.querySelectorAll(".collection-item").forEach(function(task) {
    const item = task.firstChild.textContent;
    if (item.toLowerCase().indexOf(text) != -1) {
      task.style.display = "block";
    } else {
      task.style.display = "none";
    }
  });
}
