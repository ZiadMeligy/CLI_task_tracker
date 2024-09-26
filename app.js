const fs = require("fs");
const path = "./tasks.json";

// intialise file
if (!fs.existsSync(path)) {
  fs.writeFileSync(path, JSON.stringify([]));
}

const getTasks = () => {
  JSON.parse(fs.readFileSync(path));
};

const saveTasks = (tasks) => {
  JSON.parse(fs.writeFileSync(path, JSON.stringify(tasks)));
};

// Helper function to generate a unique ID
const generateId = (tasks) => {
  if (tasks.length === 0) return 1; // Start from 1 if no tasks
  const maxId = Math.max(...tasks.map(task => task.id));
  return maxId + 1;
};

const addTask = (title) => {
    const tasks = getTasks();
    taskid=generateId(tasks);
    tasks.push({id:taskid, title, status: "not done" });
    saveTasks(tasks);
    console.log(`task added with the title: ${title}`);
}

const updateTask = (id,title) => {
    const tasks = getTasks();
    const task = tasks.find((task) => task.id === id);
    if (task) {
        task.status = "done";
        saveTasks(tasks);
        console.log(`task with the title: ${title} is updated`);
    }else{
        console.log("task not found")
    }
}

const deleteTask = (id) => {
    const tasks = getTasks();
    const newTasks = tasks.filter((task) => task.id !== id);
    if (newTasks.length === tasks.length) {
        console.log("task not found");
    } else {
        saveTasks(newTasks);
        console.log("task deleted");
    }
}

const changeTaskStatus = (id,status) => {
    const tasks = getTasks();
    const task = tasks.find((task) => task.id === id);
    
    if (task) {
        tasks = tasks.filter((task) => task.id !== id);
        task.status = status;
        tasks.push(task);
        saveTasks(tasks);
        console.log(`task status updated to ${status}`);
    }else{
        console.log("task not found");
    }
}

