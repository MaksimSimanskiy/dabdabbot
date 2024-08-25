import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tooltip',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.scss']
})
export class TooltipComponent implements OnInit, OnDestroy {
  @Input() message: string = ''; // Сообщение для отображения
  @Input() duration: number = 1000; // Время показа в миллисекундах (по умолчанию 1 секунда)
  
  isVisible: boolean = false;

  ngOnInit(): void {
  }
  ngOnDestroy() {
    // Удаление элемента из DOM после завершения отображения
  
  }
  
  show() {
    this.isVisible = true;
    setTimeout(() => this.hide(), 800); // Подсказка исчезает через 1 секунду
  }

  hide() {
    const tooltipElement = document.querySelector('.tooltip-container');
    if (tooltipElement) {
      tooltipElement.classList.add('hide');
      setTimeout(() => {
        this.isVisible = false;
        tooltipElement.classList.remove('hide');
      }, 800); // Время, соответствующее анимации перехода
    }
  }
}
