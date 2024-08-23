import { Component, OnDestroy, OnInit ,inject} from '@angular/core';
import { DataService } from '../services/data/data.service';
import { Observable ,of} from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-top',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './top.component.html',
  styleUrl: './top.component.scss'
})
export class TopComponent  implements OnInit, OnDestroy{


data = inject(DataService);
  rate: number = 0;
  top: any[] = [];

  ngOnDestroy(): void {
  }
  ngOnInit(): void {
    if( this.data.cachedTop == null) {
    this.getTop().subscribe({
      next: (top) => { 
        this.data.cashTop(top);
        this.top = top; // Сохраняем данные в свойстве tasks
      }, 
      error: (e) =>  console.log(e), 
  })  
  } else {
    this.top = this.data.cachedTop;
  }
}
  getTop(limit = 100, headers = this.data.headers_json): Observable<any> {
    return this.data.http.get<any>(this.data.apiUrl + `users/top/${limit}`,{headers});
  }
}
