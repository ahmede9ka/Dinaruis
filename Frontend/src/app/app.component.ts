import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { NgApexchartsModule } from 'ng-apexcharts';
import { trigger, transition, style, animate } from '@angular/animations';

import {  NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
@Component({
  selector: 'app-root',
  standalone:true,
  imports: [RouterOutlet,NgApexchartsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  animations: [
    trigger('routeTransition', [
      transition(':enter', [
        style({ transform: 'scale(0.9)', opacity: 0 }),
        animate('0.6s ease-in-out', style({ transform: 'scale(1)', opacity: 1 }))
      ]),
      transition(':leave', [
        animate('0.6s ease-in-out', style({ transform: 'scale(0.9)', opacity: 0 }))
      ])
    ])
  ]
})
export class AppComponent implements OnInit {
  title = 'Dinaruis';
  constructor(private router: Router) {}

  ngOnInit() { // Corrected to ngOnInit
    initFlowbite();
    // Listen to router events and trigger animations on URL change
    this.router.events.pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        // Trigger animation on route change
      });
  }
  
}
