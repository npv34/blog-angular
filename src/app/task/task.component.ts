import {Component, OnInit} from '@angular/core';
import {TaskService} from './task.service';
import {Task} from './task';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  tasks: Task[] = [];
  constructor(public taskService: TaskService) {
  }

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.taskService.getTasks().subscribe(data => this.tasks = data, error => (this.tasks = []));
  }

}
