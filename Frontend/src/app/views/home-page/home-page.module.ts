import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomePageRoutingModule } from './home-page-routing.module';
import { Router } from '@angular/router';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HomePageRoutingModule
  ]
})
export class HomePageModule {
 constructor(private router:Router) {}
 signup(){
    this.router.navigate(['/login']);
 }

 }
