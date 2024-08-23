import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  public apiUrl = 'https://maksimsimanskiy-dabdab-server-8a22.twc1.net/api/';
  
  public headers_json = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer your_token_here' // Замените на ваш токен, если требуется
  });
  public headers_multi = new HttpHeaders({
    'Content-Type': 'multipart/form-data',
    'Authorization': 'Bearer your_token_here' // Замените на ваш токен, если требуется
  });

  // Кэшированные данные
  public cachedUserData: any = null;
  public cachedTop: any[] = null;
  public cachedTask: any[] = null;
  public completedTask: any[] = null;
  public cachedPoints: number | 0 = 0;
  public referals: any | 0 = 0;

  constructor(public http:HttpClient) {}

  // Метод для получения данных пользователя

  // Метод для обновления данных пользователя и кэширования
  cashUserData(data: any): void {
    this.cachedUserData = data;
  }
  cashTop(data: any): void {
    this.cachedTop = data;
  }
  cashUserTask(data: any): void {
    this.completedTask = data;
  }
  cashAllTask(data: any): void {
    this.cachedTask = data;
  }
  cashUserPoints(points: number): void{
    this.cachedPoints += points;
  }

}
