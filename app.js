const fs = require("fs");
const path = "./tasks.json";

// intialise file
if (!fs.existsSync(path)) {
  fs.writeFileSync(path, JSON.stringify([]));
}

const getTasks = () => {
  return JSON.parse(fs.readFileSync(path, "utf-8"));
};

const saveTasks = (tasks) => {
  fs.writeFileSync(path, JSON.stringify(tasks));
};

// Helper function to generate a unique ID
const generateId = (tasks) => {
  if (tasks.length === 0) return 1;
  const maxId = Math.max(...tasks.map((task) => task.id));
  return maxId + 1;
};

const addTask = (title) => {
  const tasks = getTasks();
  const taskId = generateId(tasks);
  tasks.push({ id: taskId, title, status: "not done" });
  saveTasks(tasks);
  console.log(`Task added with title: ${title}`);
};

const updateTask = (id, title) => {
  const tasks = getTasks();
  const task = tasks.find((task) => task.id === parseInt(id));
  if (task) {
    let newTasks = tasks.filter((task) => task.id !== parseInt(id));
    task.title = title;
    newTasks.push(task);
    saveTasks(newTasks);
    console.log(`task with the title: ${title} is updated`);
  } else {
    console.log("task not found");
  }
};

const deleteTask = (id) => {
  const tasks = getTasks();
  let taskFound = false;
  const task = tasks.find((task) => task.id === parseInt(id));
  if (task) {
    taskFound = true;
  }
  const newTasks = tasks.filter((task) => task.id !== parseInt(id));
  if (!taskFound) {
    console.log("task not found");
  } else {
    saveTasks(newTasks);
    console.log("task deleted");
  }
};

const changeTaskStatus = (id, status) => {
  const tasks = getTasks();
  const task = tasks.find((task) => task.id === parseInt(id));
  let newtasks;
  if (task) {
    newtasks = tasks.filter((task) => task.id !== parseInt(id));
    task.status = status;
    newtasks.push(task);
    saveTasks(newtasks);
    console.log(`task status updated to ${status}`);
  } else {
    console.log("task not found");
  }
};

const listUndoneTasks = () => {
  const tasks = getTasks();
  const undoneTasks = tasks.filter((task) => task.status === "not done");
  console.log(undoneTasks);
};

const listTasksByStatus = (status) => {
  const tasks = getTasks();
  const tasksByStatus = tasks.filter((task) => task.status === status);
  console.log(tasksByStatus);
};

const listAllTasks = () => {
  const tasks = getTasks();
  console.log(tasks);
};
// CLI commands for methods
const [, , command, arg1, arg2] = process.argv;

// switch case with commands
switch (command) {
  case "add":
    addTask(arg1);
    break;
  case "update":
    updateTask(arg1, arg2);
    break;
  case "delete":
    deleteTask(arg1);
    break;
  case "progress":
    changeTaskStatus(arg1, arg2);
    break;
  case "notdone":
    listUndoneTasks();
    break;
  case "listbystatus":
    listTasksByStatus(arg1);
    break;
  case "list":
    listAllTasks();
  default:
    console.log("command not found");
    break;
}
