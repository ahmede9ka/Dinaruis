import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Input } from '@angular/core';
@Component({
  selector: 'app-card',
  standalone:true,
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  @Input() title!: string;           // Title for the card
  @Input() description!: string;     // Description for the card
  @Input() iconPath!: string;        // Icon path for the SVG
  @Input() isSelected: boolean = false; 
}
