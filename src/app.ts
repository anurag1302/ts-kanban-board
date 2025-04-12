import { Task } from "./interfaces/Task";
import { TaskModel } from "./models/TaskModel";
import { Column } from "./components/Column";
import { createId } from "./utils/dom";

declare global {
  interface Window {
    addTask: (status: Task["status"]) => void;
  }
}

export class TaskBoard {
  static tasks: Task[] = [];

  static init() {
    ["todo", "in-progress", "done"].forEach((status) => {
      new Column(status as Task["status"]);
    });

    this.tasks = this.loadFromLocalStorage();
    this.renderBoard();
  }

  static addTask(status: Task["status"]) {
    const content = prompt("Enter task:");
    if (!content) return;

    const task: Task = {
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
      const container = document.getElementById(`${status}-list`)!;
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

  static loadFromLocalStorage(): Task[] {
    const data = localStorage.getItem("taskboard-data");
    return data ? JSON.parse(data) : [];
  }
}

TaskBoard.init();
window.addTask = TaskBoard.addTask.bind(TaskBoard);
