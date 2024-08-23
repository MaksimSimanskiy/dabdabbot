import { CommonModule } from '@angular/common';
import { Component ,inject} from '@angular/core';
import { UserComponent } from '../user/user.component';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './shop.component.html',
})
export class ShopComponent {
  user = inject(UserComponent)
}
