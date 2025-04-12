import { TaskBoard } from "../app.js";
export class Column {
  constructor(status) {
    this.status = status;
    const area = document.getElementById(`${status}-list`);
    area.addEventListener("dragover", (e) => {
      e.preventDefault();
    });
    area.addEventListener("drop", (e) => {
      const taskId = e.dataTransfer?.getData("text/plain");
      if (taskId) {
        const task = TaskBoard.tasks.find((t) => t.id === taskId);
        if (task) {
          task.status = this.status;
          TaskBoard.saveToLocalStorage();
          TaskBoard.renderBoard();
        }
      }
    });
  }
}
