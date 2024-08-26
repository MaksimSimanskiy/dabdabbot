import { Component,inject,OnDestroy,OnInit } from '@angular/core';
import { Router ,ActivatedRoute} from '@angular/router';
import { CommonModule } from '@angular/common';
import { TelegramService } from '../services/telegram.service';
import { Observable } from 'rxjs';
import { DataService } from '../services/data/data.service';
import { UserComponent } from '../user/user.component';


@Component({
  selector: 'app-task',
  standalone: true,
  imports: [CommonModule],
  providers: [UserComponent],
  template:`task`
})
export class TaskComponent extends DataService  {

  private router: Router;
  private route: ActivatedRoute;
  private tg = inject(TelegramService);
  tg_id = this.tg.UserId;
  //this.goBack = this.goBack.bind(this);
 
  createTask(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + 'tasks', data);
  }
  getTask(headers = this.headers_json , task_id: string): Observable<any> {
    return this.http.get<any>(this.apiUrl + `tasks/${task_id}`,{headers});
  }

  addAllTasks(tg_id = this.tg_id ,headers = this.headers_json): Observable<any> {
    return this.http.post<any>(this.apiUrl + `users/tg/${tg_id}/tasks`,`{}`,{headers}); 
  }
  getAllTask(headers = this.headers_json ): Observable<any> {
    return this.http.get<any>(this.apiUrl + `tasks`,{headers});
  }
  addTaskForUser(task_id: string,headers = this.headers_json): Observable<any> {
    return this.http.post<any>(this.apiUrl + `users/tg/${this.tg_id}/task`, `{"taskId":"${task_id}"}`,{headers});
  }
  goBack(){
    this.router.navigate(['/']);
  }
  
}
