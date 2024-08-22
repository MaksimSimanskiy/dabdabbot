import { Component, inject } from '@angular/core';
import { Observable , of} from 'rxjs';
import { TelegramService } from '../services/telegram.service';
import { DataService } from '../services/data/data.service';


@Component({
  selector: 'app-user',
  standalone: true,
  imports: [],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent extends DataService{
  
  tgService = inject(TelegramService);
  public tg_id = this.tgService.UserId;
  public user_name = this.tgService.UserName;
  public points: number = 0; // Накопленные очки



  createUser(  refer:string,headers = this.headers_json ): Observable<any> {
    return this.http.post<any>(this.apiUrl + 'users', `{"name":"${this.user_name}","tg_id":"${this.tg_id}","invited_by":"${refer}"}`,{headers});
    
  }

  getCountRefs(headers = this.headers_json ): Observable<any> {
    return this.http.get<any>(this.apiUrl + `users/tg/${this.tg_id}/referrals`,{headers});
  }

  getUserPoints(headers = this.headers_json): Observable<any> {

      return this.http.get<any>(this.apiUrl + `users/tg/${this.tg_id}?field=points`,{headers})

  }

  getUser(headers = this.headers_json): Observable<any> {
 
    return this.http.get<any>(`${this.apiUrl}users/tg/${this.tg_id}`,{headers})
    
  }

  getUserTask(headers = this.headers_json): Observable<any> {
    return this.http.get<any>(this.apiUrl + `users/tg/${this.tg_id}/tasks`,{headers});
  }
  getUserField(  field:string,headers = this.headers_json): Observable<any> {
    return this.http.get<any>(this.apiUrl + `users/tg/${this.tg_id}?field=${field}`,{headers});
  }
  updateUserPoints(points: number,headers = this.headers_json): Observable<any> {
    this.cachedPoints = points;
    return this.http.patch<any>(this.apiUrl + `users/tg/${this.tg_id}`,`{"points":${points}}`,{headers}); 
  }
  updateUserRef(ref: String,headers = this.headers_json): Observable<any> {
    return this.http.patch<any>(this.apiUrl + `users/tg/${this.tg_id}`,`{"invited_by":${ref}}`,{headers});
  }
  updateUserImage(avatar: String,headers = this.headers_json): Observable<any> {
    return this.http.patch<any>(this.apiUrl + `users/tg/${this.tg_id}`,`{"avatar":${avatar}}`,{headers});
  }
}