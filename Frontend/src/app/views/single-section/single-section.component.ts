import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
@Component({
  selector: 'app-single-section',
  standalone:true,
  imports: [],
  templateUrl: './single-section.component.html',
  styleUrl: './single-section.component.css'
})
export class SingleSectionComponent implements AfterViewInit {
  @ViewChild('title', { static: false }) title!: ElementRef;
  ngAfterViewInit() {
    gsap.from(this.title.nativeElement, {
      opacity: 0,
      y: -50,
      duration: 2,
      ease: "power2.out",
      scrollTrigger: {
        trigger: this.title.nativeElement,
        start: "100% bottom",  // Triggers when 90% of the title is visible
        toggleActions: "play none none none"
      }
    });
  }
}
