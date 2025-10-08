// Retrieve from localStorage or initialize empty arrays
let projects = JSON.parse(localStorage.getItem("projects")) || [];
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// DOM elements
const projectInput = document.getElementById("projectName");
const projectList = document.getElementById("projectList");
const projectSelect = document.getElementById("projectSelect");
const addProjectBtn = document.getElementById("addProjectBtn");

const taskName = document.getElementById("taskName");
const taskStatus = document.getElementById("taskStatus");
const taskUser = document.getElementById("taskUser");
const taskList = document.getElementById("taskList");
const addTaskBtn = document.getElementById("addTaskBtn");

// Save to localStorage
function saveData() {
  localStorage.setItem("projects", JSON.stringify(projects));
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Render Projects
function renderProjects() {
  projectList.innerHTML = "";
  projectSelect.innerHTML = "";
  projects.forEach((p, i) => {
    const li = document.createElement("li");
    li.textContent = p.name;
    li.innerHTML += ` <button onclick="deleteProject(${i})">Delete</button>`;
    projectList.appendChild(li);

    const option = document.createElement("option");
    option.value = p.name;
    option.textContent = p.name;
    projectSelect.appendChild(option);
  });
}

// Render Tasks
function renderTasks() {
  taskList.innerHTML = "";
  tasks.forEach((t, i) => {
    const li = document.createElement("li");
    li.textContent = `${t.name} [${t.status}] - ${t.user} (${t.project})`;
    li.innerHTML += ` <button onclick="deleteTask(${i})">Delete</button>`;
    taskList.appendChild(li);
  });
}

// Add Project
addProjectBtn.addEventListener("click", () => {
  if (projectInput.value.trim() === "") return;
  projects.push({ name: projectInput.value.trim() });
  projectInput.value = "";
  saveData();
  renderProjects();
});

// Add Task
addTaskBtn.addEventListener("click", () => {
  if (taskName.value.trim() === "") return;
  const newTask = {
    name: taskName.value.trim(),
    status: taskStatus.value,
    user: taskUser.value.trim() || "Unassigned",
    project: projectSelect.value || "No Project"
  };
  tasks.push(newTask);
  taskName.value = "";
  taskUser.value = "";
  saveData();
  renderTasks();
});

// Delete Project
function deleteProject(index) {
  const projectName = projects[index].name;
  projects.splice(index, 1);
  tasks = tasks.filter(t => t.project !== projectName);
  saveData();
  renderProjects();
  renderTasks();
}

// Delete Task
function deleteTask(index) {
  tasks.splice(index, 1);
  saveData();
  renderTasks();
}

// Initial Render
renderProjects();
renderTasks();
