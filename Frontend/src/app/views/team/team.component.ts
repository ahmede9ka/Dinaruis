import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
@Component({
  selector: 'app-team',
  standalone:true,
  imports: [],
  templateUrl: './team.component.html',
  styleUrl: './team.component.css'
})
export class TeamComponent implements AfterViewInit {
  @ViewChild('teamCards', { static: false }) teamCards!: ElementRef;

  ngAfterViewInit() {
    setTimeout(() => {
      gsap.fromTo(this.teamCards.nativeElement.children,
        { opacity: 0, y: 100, scale: 0.8, rotateX: 30 }, // Initial state
        {
          opacity: 1, y: 0, scale: 1, rotateX: 0,
          duration: 1.2, ease: "power3.out",
          stagger: 0.3, // Staggered entrance for each card
          scrollTrigger: {
            trigger: this.teamCards.nativeElement,
            start: "top 85%",
            toggleActions: "restart none none none",
            onLeaveBack: (self) => self.refresh()
          }
        }
      );
    }, 0);
  }
}
