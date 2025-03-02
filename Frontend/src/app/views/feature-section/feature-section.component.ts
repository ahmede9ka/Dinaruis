
import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
@Component({
  selector: 'app-feature-section',
  standalone:true,
  imports: [],
  templateUrl: './feature-section.component.html',
  styleUrl: './feature-section.component.css'
})
export class FeatureSectionComponent implements AfterViewInit {
  @ViewChild('cards', { static: false }) cards!: ElementRef;

  ngAfterViewInit() {
    setTimeout(() => {
      gsap.fromTo(this.cards.nativeElement.children, 
        { opacity: 0, y: 100, rotateY: 30, scale: 0.8 }, // Start position
        { 
          opacity: 1, y: 0, rotateY: 0, scale: 1, duration: 1.5, ease: "power4.out",
          stagger: 0.2, 
          scrollTrigger: {
            trigger: this.cards.nativeElement,
            start: "top 85%", // Animation starts when 85% of the section is visible
            toggleActions: "restart none none none", // Re-run animation each time the section is entered
            onLeaveBack: (self) => self.refresh() // Ensures smooth re-triggering
          }
        }
      );
    }, 0);
  }
}
