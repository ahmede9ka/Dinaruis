import { Component } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { FooterComponent } from "../footer/footer.component";
import { HeaderComponent } from "../header/header.component";
import { ContactSectionComponent } from "../contact-section/contact-section.component";
import { FeatureSectionComponent } from "../feature-section/feature-section.component";
import { SingleSectionComponent } from "../single-section/single-section.component";
import { TeamComponent } from "../team/team.component";
import { TestimonialsComponent } from "../testimonials/testimonials.component";

@Component({
  selector: 'app-home-page',
  standalone:true,
  imports: [NavbarComponent, FooterComponent, HeaderComponent, ContactSectionComponent, FeatureSectionComponent, SingleSectionComponent, TeamComponent, TestimonialsComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {
  



}
