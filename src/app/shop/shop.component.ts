import { CommonModule } from '@angular/common';
import { Component ,inject,ViewChild} from '@angular/core';
import { UserComponent } from '../user/user.component';
import { DataService } from '../services/data/data.service';
import { TooltipComponent } from '../tooltip/tooltip.component';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [CommonModule,TooltipComponent],
  templateUrl: './shop.component.html',
})
export class ShopComponent {
  user = inject(UserComponent);
  data = inject(DataService);
  @ViewChild('tooltip') tooltip: TooltipComponent;

  showTooltip() {
    this.tooltip.message = "Скопировано!"; // Устанавливаем сообщение
    this.tooltip.show(); // Показываем подсказку
  }
   copyToClipboard(text:string) {
    this.showTooltip();
    navigator.clipboard.writeText(text).then(() => {
        // Здесь вы можете отобразить всплывающее сообщение "Скопировано!"
        console.log('Ссылка скопирована в буфер обмена');
    });
}
}
