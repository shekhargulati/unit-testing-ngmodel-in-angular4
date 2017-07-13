import { Component, Injectable } from '@angular/core';
import { TaskService } from './task.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Task 1';
  updateCount = 0;

  constructor(private taskService: TaskService) { }

  onUpdate(title) {
    this.taskService.update(title)
      .then(res => {
        this.title = title;
        this.updateCount++;
      });
  }
}
