import { Component, inject,OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TelegramService } from './services/telegram.service';
import { HttpClient } from '@angular/common/http';
import { BottomMenuComponent } from './bottom-menu/bottom-menu.component';
import { UserComponent } from './user/user.component';
import { MainComponent } from './main/main.component';
import { DataService } from './services/data/data.service';
import { TaskComponent } from './task/task.component';
import { trigger, transition, style, animate, query, group } from '@angular/animations';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,BottomMenuComponent],
  providers: [ UserComponent,MainComponent,TaskComponent],
  animations: [
    trigger('routeAnimations', [
      transition('* <=> *', [
        style({ position: 'relative' }),
        query(':enter, :leave', [
          style({
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%'
          })
        ], { optional: true }),
        query(':enter', [
          style({ left: '-100%' }),
          animate('300ms ease-out', style({ left: '0%' }))
        ], { optional: true }),
        query(':leave', [
          animate('300ms ease-out', style({ left: '100%' }))
        ], { optional: true })
      ])
    ])
  ]
  ,
  template: `<div [@routeAnimations]="prepareRoute(outlet)"><router-outlet #outlet="outlet" /> </div>    <app-bottom-menu></app-bottom-menu>
  `,
 
})
export class AppComponent implements OnInit{
  title = 'dabdabbot';
  telegram = inject(TelegramService);
  user = inject(UserComponent);
  main = inject(MainComponent);
  data = inject(DataService);
  task = inject(TaskComponent);
  constructor(){
    this.telegram.tg.ready();
    if( this.data.cachedUserData == null) {
  
      this.user.getUser().subscribe({
        next: (v) => {
            if (v.message === "User not found") {
              this.main.createUser();
            } else {
              this.user.getCountRefs();
              this.data.cashUserData(v);
                this.data.cashUserPoints(v.points);
                this.data.cashUserTask(v.tasks);
            }

        },
        error: (e) => console.log(e),
      });
    } else {
  
    }
  }
  ngOnInit(): void {
    
  }
  private removePreloader() {
    const preloader = document.getElementById('preloader');
    preloader.classList.add('fade-out');
    if (preloader) {
      preloader.style.display = 'none';
    }
  }
  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
}
