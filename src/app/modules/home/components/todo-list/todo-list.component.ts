import { Component, DoCheck, OnInit } from '@angular/core';

//Interface
import { TaskList } from './../../models/task-list';
// ****************************** //
@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements DoCheck {
  // ****************************** //
  constructor() {}

  // ****************************** //
  ngDoCheck(): void {
    this.setLocalStorage();
  }

  // ****************************** //
  public taskList: Array<TaskList> = JSON.parse(
    localStorage.getItem('list') || '[]'
  );

  // ****************************** //
  public deleteItemTaskList(event: number) {
    this.taskList.splice(event, 1);
  }

  // ****************************** //
  public deleteAllTaskList() {
    const confirm = window.confirm('Você deseja realmente deletar tudo?');
    if (confirm) {
      this.taskList = [];
    }
  }

  // ****************************** //
  public setEmitTaskList(event: string) {
    let task: TaskList = { task: event, checked: false };
    this.taskList.push(task);
  }

  // ****************************** //
  public validationInput(event: string, index: number) {
    if (!event.length) {
      const confirm = window.confirm('Tarefa vazia! Deseja deletar?');
      if (confirm) {
        this.deleteItemTaskList(index);
      }
    }
  }

  // ****************************** //
  public setLocalStorage() {
    if (this.taskList) {
      this.taskList.sort(
        (first, last) => Number(first.checked) - Number(last.checked)
      );
      localStorage.setItem('list', JSON.stringify(this.taskList));
    }
  }
}
