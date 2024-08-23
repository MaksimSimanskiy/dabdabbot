import { Component,inject,OnInit } from '@angular/core';
import { TaskComponent } from '../task.component';
import { CommonModule } from '@angular/common';
import { DataService } from '../../services/data/data.service';
import { UserComponent } from '../../user/user.component';


@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule],
  providers:[TaskComponent, UserComponent],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss'
})
export class TaskListComponent implements OnInit  {
  user = inject(UserComponent);
 data = inject(DataService);
  tasks: any[] = [];
  userTask: string[] = [];
  task = inject(TaskComponent);

ngOnInit(): void {
  if(this.data.cachedTask == null) {

    this.task.getAllTask().subscribe({
      next: (task) => { 
        if(this.data.completedTask !== null){
        for(let i of task ){
          for(let k of this.data.completedTask ){           
              if(i._id == k){
                i.completed = true;
              }
        }
        };
      }
        this.tasks = task;
         // Сохраняем данные в свойстве tasks
        this.data.cachedTask = task;
      },  
      error: (e) =>  console.log(e) 
  })  
  } else {
    this.tasks = this.data.cachedTask
  }
}

loadingTasks: { [key: number]: boolean } = {}; // Для отслеживания загрузки задач


  startTask(task: any) {
    this.loadingTasks[task._id] = true; // Устанавливаем состояние загрузки
    // Отправка запроса на сервер
    this.task.addTaskForUser(task._id)
      .subscribe({
        next:(response) => setTimeout(() => {
          task.completed = true; // Помечаем задачу как выполненную
          this.loadingTasks[task._id] = false; // Сбрасываем состояние загрузки
        }, 3000), // Задержка на 1 минуту (60000 мс)
      complete:() => {
        console.log("ended");
        this.data.cashUserPoints(task.points);
        this.user.updateUserPoints(this.data.cachedPoints).subscribe((v)=>
          {
            console.log("Updated",this.data.cachedPoints);
          }
        )
      }
      });
  }
}
