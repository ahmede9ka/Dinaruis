import { Component } from '@angular/core';
import { AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { gsap } from 'gsap';
@Component({
  selector: 'app-header',
  standalone:true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements AfterViewInit {
  @ViewChild('title', { static: false }) title!: ElementRef;

  @ViewChild('cards', { static: false }) cards!: ElementRef;

ngAfterViewInit() {
  gsap.from(this.title.nativeElement, {
    opacity: 0,
    y: -50,
    duration: 2,
    ease: "power2.out"
  });
}

}
