import {Component, OnInit} from '@angular/core';
import {TaskService} from './task.service';
import {Task} from './task';
import {FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  tasks: Task[] = [];
  task: Task;
  message: string;
  formCreateTask: FormGroup;


  constructor(private taskService: TaskService,
              private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.getAll();
    this.formCreateTask = this.formBuilder.group({
      title: ['', Validators.required]
    });
  }

  getAll() {
    this.taskService.getTasks().subscribe(data => this.tasks = data, error => (this.tasks = []));
  }

  getTask(id: number) {
    this.taskService.getTaskById(id).subscribe(data => this.task = data);
  }

  delete(id: number) {
    this.taskService.delete(id).subscribe();
    this.getAll();
  }

  create() {
    const task = this.formCreateTask.value;
    this.taskService.create(task).subscribe(
      data => {
        this.message = 'Tạo thành công';
      }
    );
  }

  onSubmit() {
    this.create();
    this.getAll();
  }

  get title() {
    return this.formCreateTask.get('title');
  }

}
