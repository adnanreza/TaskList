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
  // Add task event
  form.addEventListener("submit", addTask);
  // Remove task event -- use event delegation!
  taskList.addEventListener("click", removeTask);
  // Clear tasks event
  clearBtn.addEventListener("click", clearTasks);
  // Filter tasks event
  filter.addEventListener("keyup", filterTasks);
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

// function: removeTask
function removeTask(e) {
  if (e.target.parentElement.classList.contains("delete-item")) {
    if (confirm("Are you sure!")) {
      e.target.parentElement.parentElement.remove();
    }
  }
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
