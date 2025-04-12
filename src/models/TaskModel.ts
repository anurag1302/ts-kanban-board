import { Task } from "../interfaces/Task";

export class TaskModel {
  constructor(public task: Task) {}

  render(): HTMLElement {
    const div = document.createElement("div");
    div.className = "task";
    div.draggable = true;
    div.id = this.task.id;
    div.textContent = this.task.content;

    div.addEventListener("dragstart", (e) => {
      e.dataTransfer?.setData("text/plain", this.task.id);
    });

    return div;
  }
}
