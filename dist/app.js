import { TaskModel } from "./models/TaskModel.js";
import { Column } from "./components/Column.js";
import { createId } from "./utils/dom.js";
export class TaskBoard {
  static init() {
    ["todo", "in-progress", "done"].forEach((status) => {
      new Column(status);
    });
    this.tasks = this.loadFromLocalStorage();
    this.renderBoard();
  }
  static addTask(status) {
    const content = prompt("Enter task:");
    if (!content) return;
    const task = {
      id: createId(),
      content,
      status,
    };
    this.tasks.push(task);
    this.saveToLocalStorage();
    this.renderBoard();
  }
  static renderBoard() {
    ["todo", "in-progress", "done"].forEach((status) => {
      const container = document.getElementById(`${status}-list`);
      container.innerHTML = "";
      this.tasks
        .filter((task) => task.status === status)
        .forEach((task) => {
          const card = new TaskModel(task);
          container.appendChild(card.render());
        });
    });
  }
  static saveToLocalStorage() {
    localStorage.setItem("taskboard-data", JSON.stringify(this.tasks));
  }
  static loadFromLocalStorage() {
    const data = localStorage.getItem("taskboard-data");
    return data ? JSON.parse(data) : [];
  }
}
TaskBoard.tasks = [];
TaskBoard.init();
window.addTask = TaskBoard.addTask.bind(TaskBoard);
