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
