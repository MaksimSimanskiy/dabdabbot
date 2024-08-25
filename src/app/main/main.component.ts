import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router'; // Импортируем ActivatedRoute
import { TelegramService } from '../services/telegram.service';
import { UserComponent } from '../user/user.component';
import { DataService } from '../services/data/data.service';
import { TaskComponent } from '../task/task.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CommonModule],
  providers: [UserComponent,TaskComponent],
  templateUrl: 'main.component.html',
  styleUrls: ['main.component.scss'],
})
export class MainComponent implements OnInit, OnDestroy {
  
  task = inject(TaskComponent);
  tg = inject(TelegramService);
  user = inject(UserComponent);
  data = inject(DataService); // Инжектируем DataService
  route = inject(ActivatedRoute); // Инжектируем ActivatedRoute
  hello = "";
  queryParams: any = {};
  ref = "";
  public clickCount:number = 0;
  private clickTimeout: any;
  constructor() {

  }

  createUser() {
    this.user.createUser(this.queryParams['ref']).subscribe((v) => {
      this.hello = `<br> Приветствуем ${this.tg.UserName}`;
      this.data.cashUserData(v); // Кэшируем данные пользователя
    });
  }
  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      params.keys.forEach(key => {
        this.queryParams[key] = params.get(key);
      });
      this.ref = this.tg.RefId;
      console.log('Received Query Params:', this.ref);
      console.log(this.data);
    });
  }

  ngOnDestroy(): void {
    this.hello = "";

  }

  handleClick() {
    this.data.cachedPoints++; // Увеличиваем очки при каждом клике

    if (this.clickTimeout) {
      clearTimeout(this.clickTimeout);
    }

    this.clickTimeout = setTimeout(() => {
      this.user.updateUserPoints(this.data.cachedPoints).subscribe(v => {
        console.log('Очки обновлены:', v);
      });
    }, 3000);
  }
}
