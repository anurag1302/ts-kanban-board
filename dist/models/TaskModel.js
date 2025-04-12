export class TaskModel {
    constructor(task) {
        this.task = task;
    }
    render() {
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
