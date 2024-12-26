window.addEventListener("load", () => {
  let loginName = document.querySelector(".greet-user-name");
  let loginUser = JSON.parse(localStorage.getItem("loginUser"));

  if (loginUser) {
    loginName.textContent = loginUser.userName;
  }

  let todayDate = document.querySelector(".today-d");
  let todayMonth = document.querySelector(".today-m");
  let todayYear = document.querySelector(".today-y");
  let todayDay = document.querySelector(".today-day");
  let date = new Date();

  const weekDay = [
    "Sunday",
    "Monday",
    "Tuesday",
    "wednesday",
    "Tharsday",
    "Friday",
    "Saturday",
  ];
  todayDay.textContent = weekDay[date.getDay()];
  todayDate.textContent = date.getDate();

  const monthName = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  todayMonth.textContent = monthName[date.getMonth()];
  todayYear.textContent = date.getFullYear();

  // ============ Greet function ============

  let greetImage = document.getElementById("greet-img-icon");
  let greetWord = document.querySelector(".greet-word");

  let crunnetHour = date.getHours();

  if (crunnetHour >= 0 && crunnetHour < 12) {
    greetImage.src = "assets/images/good-morning.png";
    greetWord.textContent = "Good Morning";
  } else if (crunnetHour >= 12 && crunnetHour < 18) {
    greetImage.src = "assets/images/cloud.png";
    greetWord.textContent = "Good Afternon";
  } else {
    greetImage.src = "assets/images/night.png";
    greetWord.textContent = "Good Evening";
  }
});

// ==============================
// new task
//  =============================

// debugger;
let newTask = document.querySelector(".new-task");

let assignTask = document.querySelector(".assign-task");

let closeAssignTask = document.querySelector(".close-assign-task");
let updateTaskBtn = document.getElementById("update-task-box");
let submitTaskbtn = document.getElementById('submit-task-box');

newTask.addEventListener("click", () => {
  updateTaskBtn.style.display = 'none';
  submitTaskbtn.style.display = 'block';
  assignTask.classList.add("active-assign-task");
});

closeAssignTask.addEventListener("click", () => {
  assignTask.classList.remove("active-assign-task");
});

let taskAssign = document.getElementById("task-assign");

taskAssign.addEventListener("submit", (e) => {
  e.preventDefault();

  let taskTitle = document.querySelector(".task-title").value;
  let taskDec = document.querySelector(".task-dec").value;
  let taskEndDate = document.querySelector(".task-end-date").value;

  let taskData = JSON.parse(localStorage.getItem("taskdata")) || [];

  let taskAssingData = {
    Title: taskTitle,
    Decription: taskDec,
    endDate: taskEndDate,
  };

  taskData.push(taskAssingData);

  localStorage.setItem("taskdata", JSON.stringify(taskData));

  displayTasks();

  taskAssign.reset();
  alert("New Task Added");
  assignTask.classList.remove("active-assign-task");
});

// ============ display tasks =======

function displayTasks() {
  let taskData = JSON.parse(localStorage.getItem("taskdata")) || [];

  let taskContainer = document.querySelector(".new-task-items");

  taskContainer.innerHTML = "";
  taskData.forEach((task, index) => {
    let taskItem = document.createElement("div");
    taskItem.className = "task-item new-items";
    taskItem.setAttribute("draggable", "true");
    taskItem.setAttribute("data-id", index);

    taskItem.innerHTML = `
      <span class="task-edite" title="Eited Task"><i class="fa-solid fa-pen"></i></span>  
        <span class="date">${new Date().toLocaleDateString()}</span>
        <h2>${task.Title}</h2>
        <p>${task.Decription}</p>
  
        <div class="task-details">
            <div class="end-task">
                End date: ${task.endDate}
            </div>
            <button class="Completed-btn">Completed</button>
        </div>`;

    taskContainer.appendChild(taskItem);

    taskItem.addEventListener("dragstart", (e) => {
      e.dataTransfer.setData("text/plain", index);
      setTimeout(() => {
        e.target.classList.add("hide-task-card");
      }, 0);
    });

    let completeBtn = taskItem.querySelector(".Completed-btn");

    completeBtn.addEventListener("click", () => {
      markCompleteTask(index);
    });

  });

  let EditTask = document.querySelectorAll('.task-edite');
  EditTask.forEach((itemstask, index) => {
    itemstask.addEventListener('click', () => {
     submitTaskbtn.style.display = 'none';
      updateTaskBtn.style.display = 'block';
    taskEdit(index);
    
    });
    
  })
}
// ============= task Edit =========
// let assignBtn = document.getElementById('assign-task-btn');
let updateTask = document.getElementById('update-task');

function taskEdit(index) {
  assignTask.classList.add("active-assign-task");

  let taskData = JSON.parse(localStorage.getItem("taskdata")) || [];

  console.log(taskData[index]);
  

  document.querySelector(".task-title").value = taskData[index].Title;
  document.querySelector(".task-dec").value = taskData[index].Decription;
  document.querySelector(".task-end-date").value = taskData[index].endDate;

  updateTask.setAttribute("data-id", index);
}

// Bind the saveEditedTask to a button click
updateTask.addEventListener("click", saveEditedTask);

// Save Edited Task Function
function saveEditedTask() {
  let taskData = JSON.parse(localStorage.getItem("taskdata")) || [];

  let index = updateTask.getAttribute("data-id");

  if (index !== null && taskData[index]) {
    let updatedTitle = document.querySelector(".task-title").value;
    let updatedDesc = document.querySelector(".task-dec").value;
    let updatedEndDate = document.querySelector(".task-end-date").value;
  
    taskData[index].Title = updatedTitle;
    taskData[index].Decription = updatedDesc;
    taskData[index].endDate = updatedEndDate;
  
    // Save the updated tasks back to localStorage
    localStorage.setItem("taskdata", JSON.stringify(taskData));

    // Clear the input fields
    document.querySelector(".task-title").value = '';
    document.querySelector(".task-dec").value = '';
    document.querySelector(".task-end-date").value = '';
  
    // Refresh the task display
    displayTasks();
  
    // Close the edit form or modal
    assignTask.classList.remove("active-assign-task");
  } else {
    console.error("Invalid task index or task data not found.");
  }
}


const assignTaskContainer = document.querySelectorAll(".task-box");

assignTaskContainer.forEach((box) => {
  box.addEventListener("dragenter", (e) => {
    e.preventDefault();
    e.target.classList.add("drag-over");
  });

  box.addEventListener("dragover", (e) => {
    e.preventDefault();
    e.target.classList.add("drag-over");
  });

  box.addEventListener("drop", (e) => {
    e.preventDefault();
    e.target.classList.remove("drag-over");

    let taskId = e.dataTransfer.getData("text");
    let taskData = JSON.parse(localStorage.getItem("taskdata")) || [];

    let task = taskData[taskId];

    let droppedTask = document.createElement("div");
    droppedTask.className = "task-item";
    droppedTask.setAttribute("draggable", "true");

    droppedTask.innerHTML = `
      <span class="date">${new Date().toLocaleDateString()}</span>
      <h2>${task.Title}</h2>
      <p>${task.Decription}</p>
      <div class="task-details">
          <div class="end-task">
              End date: ${task.endDate}
          </div>
          <button class="Completed-btn">Completed</button>
      </div>`;

    e.target.querySelector(".task-container").appendChild(droppedTask);

    if (e.target.classList.contains("panding-task")) {
      markPandingTask(taskId);

    } else if (e.target.classList.contains("complete-task")) {
      
      markCompleteTask(taskId);
    }
  });

  box.addEventListener("dragleave", (e) => {
    e.target.classList.remove("drag-over");
  });

  box.addEventListener("dragend", (e) => {
    e.target.classList.remove("drag-over");
  });
});

function markPandingTask(taskId) {
  let taskData = JSON.parse(localStorage.getItem("taskdata")) || [];

  let pandingItem = taskData.splice(taskId, 1)[0];

  let pandingItems = JSON.parse(localStorage.getItem("pandingitems")) || [];

  pandingItems.push(pandingItem);

  localStorage.setItem("taskdata", JSON.stringify(taskData));
  localStorage.setItem("pandingitems", JSON.stringify(pandingItems));

  displayTasks();

  displayPandingTask();
}

function displayPandingTask() {
  let pandingItems = JSON.parse(localStorage.getItem("pandingitems")) || [];

  let pandingTaskItems = document.querySelector(".panding-tasks-items");

  pandingTaskItems.innerHTML = "";

  pandingItems.forEach((task, index) => {
    let taskItem = document.createElement("div");
    taskItem.className = "task-item";

    taskItem.innerHTML = `  
        <span class="date">${new Date().toLocaleDateString()}</span>
      <h2>${task.Title}</h2>
      <div class="task-details">
          <div class="end-task">
              End date: ${task.endDate}
          </div>
          <button class="Completed-btn">Completed</button>
      </div>`;

    pandingTaskItems.appendChild(taskItem);

    let completeBtn = taskItem.querySelector(".Completed-btn");

    completeBtn.addEventListener("click", () => {

      let taskData = JSON.parse(localStorage.getItem("pandingitems")) || [];

      let completeItem = taskData.splice(index, 1)[0];
    
      completeTasks = JSON.parse(localStorage.getItem("completetasks")) || [];
    
      completeTasks.push(completeItem);
    
      localStorage.setItem("pandingitems", JSON.stringify(taskData));
      localStorage.setItem("completetasks", JSON.stringify(completeTasks));
  pandingTaskItems.innerHTML = "";
    
      displayTasks();
      completeTaskDisplay();
    });
  });
}


function markCompleteTask(index) {
  let taskData = JSON.parse(localStorage.getItem("taskdata")) || [];

  let completeItem = taskData.splice(index, 1)[0];

  let completeTasks = JSON.parse(localStorage.getItem("completetasks")) || [];

  completeTasks.push(completeItem);

  localStorage.setItem("taskdata", JSON.stringify(taskData));
  localStorage.setItem("completetasks", JSON.stringify(completeTasks));

  displayTasks();
  completeTaskDisplay();
}

function completeTaskDisplay() {
  let completeTasks = JSON.parse(localStorage.getItem("completetasks")) || [];

  let completeContainer = document.querySelector(".completed-tasks-items");

  completeContainer.innerHTML = "";

  completeTasks.forEach((task, index) => {
    let taskItem = document.createElement("div");
    taskItem.className = "task-item completed-items";

    taskItem.innerHTML = `  
        <span class="date">${new Date().toLocaleDateString()}</span>
        <h2>${task.Title}</h2>
        <p>${task.Decription}</p>
        <span class="trash-items"><i class="fa-solid fa-trash"></i></span>`;
    completeContainer.appendChild(taskItem);
  });

  let completeTrash = document.querySelectorAll('.trash-items');

  completeTrash.forEach((taskIcon, index) => {
    taskIcon.addEventListener('click', () => {
      trashItems(index);
    });
  });
}

function trashItems(index) {
  let completeTasks = JSON.parse(localStorage.getItem("completetasks")) || [];

  completeTasks.splice(index, 1);

  localStorage.setItem("completetasks", JSON.stringify(completeTasks));

  completeTaskDisplay();
}

window.addEventListener("load", () => {
  displayTasks();
  completeTaskDisplay();
  displayPandingTask();
});

