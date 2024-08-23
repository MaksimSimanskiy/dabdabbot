import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bottom-menu',
  standalone: true,
  imports: [],
  templateUrl: './bottom-menu.component.html',
  styleUrl: './bottom-menu.component.scss'
})
export class BottomMenuComponent {
  constructor(private router: Router) {}

  navigateTo(route: string) {
    this.router.navigate([`${route}`]);
  }
}