import { CommonModule } from '@angular/common';
import { Component ,inject,OnInit,ViewChild} from '@angular/core';
import { UserComponent } from '../user/user.component';
import { DataService } from '../services/data/data.service';
import { TooltipComponent } from '../tooltip/tooltip.component';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [CommonModule,TooltipComponent],
  templateUrl: './shop.component.html',
})
export class ShopComponent implements OnInit  {
  user = inject(UserComponent);
  data = inject(DataService);
  ref_code;
  @ViewChild('tooltip') tooltip: TooltipComponent;


  ngOnInit(): void {
  }
  showTooltip() {
    this.tooltip.message = "Скопировано!"; // Устанавливаем сообщение
    this.tooltip.show(); // Показываем подсказку
  }
  getRef(){
    if(this.data.cachedUserData !== null){
      return this.ref_code = this.data.cachedUserData.referral_code;
    }
  }
   copyToClipboard(text:string) {
    this.showTooltip();
    navigator.clipboard.writeText(text).then(() => {
        // Здесь вы можете отобразить всплывающее сообщение "Скопировано!"
        console.log('Ссылка скопирована в буфер обмена');
    });
}
}
