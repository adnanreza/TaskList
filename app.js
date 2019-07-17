// Define UI Vars
const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const clearBtb = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");

// Load all event listeners
loadEventListeners();

// function: loadEventListeners
function loadEventListeners() {
  //Add task event
  form.addEventListener("submit", addTask);
}

// function: addTask
function addTask(e) {
  if (taskInput.value === "") {
    alert("Please add a task before entering!");
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

  //Clear input
  taskInput.value = "";

  e.preventDefault();
}
