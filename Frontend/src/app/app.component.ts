import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { NgApexchartsModule } from 'ng-apexcharts';
@Component({
  selector: 'app-root',
  standalone:true,
  imports: [RouterOutlet,NgApexchartsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'Frontend';
  ngOnInit() { // Corrected to ngOnInit
    initFlowbite();
  }
}
