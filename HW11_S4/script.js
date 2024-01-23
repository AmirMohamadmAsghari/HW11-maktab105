document.addEventListener("DOMContentLoaded", function () {
  const todoList = document.getElementById("todo-list");
  const ongoingList = document.getElementById("ongoing-list");
  const completedList = document.getElementById("completed-list");
  const addTaskButton = document.getElementById("add-task");
  const taskDescriptionInput = document.getElementById("task-description");
  const taskDateInput = document.getElementById("task-date");
  const taskModal = document.getElementById("task-modal");
  const closeModal = document.querySelector(".close");

  addTaskButton.addEventListener("click", function () {
    const description = taskDescriptionInput.value;
    const date = taskDateInput.value;

    if (description && date) {
      const task = createTaskElement(description, date);
      todoList.appendChild(task);
      saveToLocalStorage();
      clearInputs();
    }
  });

  todoList.addEventListener("click", function (event) {
    if (event.target.tagName === "LI") {
      moveTask(event.target, todoList, ongoingList);
      saveToLocalStorage();
    }
  });

  ongoingList.addEventListener("click", function (event) {
    if (event.target.tagName === "LI") {
      moveTask(event.target, ongoingList, completedList);
      saveToLocalStorage();
    }
  });

  completedList.addEventListener("click", function (event) {
    if (event.target.tagName === "LI") {
      // You can add additional actions for completed tasks if needed
      // For example, removing from completedList and updating local storage
      event.target.remove();
      saveToLocalStorage();
    }
  });

  // Open the modal when clicking the "Add Task" button
  document
    .getElementById("add-task-button")
    .addEventListener("click", function () {
      taskModal.style.display = "block";
    });

  // Close the modal when clicking the close button
  closeModal.addEventListener("click", function () {
    taskModal.style.display = "none";
  });

  // Close the modal if the user clicks outside the modal
  window.addEventListener("click", function (event) {
    if (event.target === taskModal) {
      taskModal.style.display = "none";
    }
  });

  // Helper function to create a new task element
  function createTaskElement(description, date) {
    const task = document.createElement("li");
    task.textContent = `${description} - ${date}`;
    return task;
  }

  // Helper function to move a task from one list to another
  function moveTask(taskElement, fromList, toList) {
    // Clone the task element
    const clonedTask = taskElement.cloneNode(true);

    // Append the cloned task to the destination list
    toList.appendChild(clonedTask);

    // Remove the original task element from the source list
    taskElement.remove();

    saveToLocalStorage();
  }

  // Helper function to save tasks to local storage
  function saveToLocalStorage() {
    localStorage.setItem("todoList", todoList.innerHTML);
    localStorage.setItem("ongoingList", ongoingList.innerHTML);
    localStorage.setItem("completedList", completedList.innerHTML);
  }

  // Helper function to load tasks from local storage
  function loadFromLocalStorage() {
    todoList.innerHTML = localStorage.getItem("todoList") || "";
    ongoingList.innerHTML = localStorage.getItem("ongoingList") || "";
    completedList.innerHTML = localStorage.getItem("completedList") || "";
  }

  // Helper function to clear input fields
  function clearInputs() {
    taskDescriptionInput.value = "";
    taskDateInput.value = "";
  }

  // Load tasks from local storage on page load
  loadFromLocalStorage();
});
