import { Task } from "../interfaces/Task";
import { TaskBoard } from "../app";

export class Column {
  constructor(public status: Task["status"]) {
    const area = document.getElementById(`${status}-list`) as HTMLElement;

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
