import { Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { ShopComponent } from './shop/shop.component';
import { TaskComponent } from './task/task.component';
import { TaskListComponent } from './task/task-list/task-list.component';
import { TopComponent } from './top/top.component';

export const routes: Routes = [
    {path: '', component:MainComponent, pathMatch:'full',data: { animation: 'mainPage' }},
    {path: 'shop',component:ShopComponent, data: { animation: 'shopPage' }},
    {path: 'task',component:TaskListComponent, data: { animation: 'taskPage' }},
    {path: 'top',component:TopComponent, data: { animation: 'topPage' }}
];
