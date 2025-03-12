


import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { routes } from '../../app.routes';
interface Category {
  id: string;
  name: string;
}


@Component({
  selector: 'app-start-campagne',
  standalone:true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './start-campagne.component.html',
  styleUrl: './start-campagne.component.css'
})
export class StartCampagneComponent implements OnInit {
  fundraisingForm: FormGroup;
  showCountryDropdown = false;
  selectedCategory: string | null = null;
  
  countries = [
    { code: 'CH', name: 'Switzerland' },
    { code: 'US', name: 'United States' },
    { code: 'UK', name: 'United Kingdom' },
    { code: 'DE', name: 'Germany' },
    { code: 'FR', name: 'France' },
    // Add more countries as needed
  ];
  
  categories: Category[] = [
    { id: 'animals', name: 'Animals' },
    { id: 'business', name: 'Business' },
    { id: 'community', name: 'Community' },
    { id: 'competitions', name: 'Competitions' },
    { id: 'creative', name: 'Creative' },
    { id: 'education', name: 'Education' },
    { id: 'emergencies', name: 'Emergencies' },
    { id: 'environment', name: 'Environment' },
    { id: 'events', name: 'Events' },
    { id: 'faith', name: 'Faith' },
    { id: 'family', name: 'Family' },
    { id: 'funerals', name: 'Funerals & Memorials' },
    { id: 'medical', name: 'Medical' },
    { id: 'monthly-bills', name: 'Monthly Bills' },
    { id: 'newlyweds', name: 'Newlyweds' },
    { id: 'other', name: 'Other' },
    { id: 'sports', name: 'Sports' },
    { id: 'travel', name: 'Travel' },
    { id: 'ukraine', name: 'Ukraine Relief' },
    { id: 'volunteer', name: 'Volunteer' },
    { id: 'wishes', name: 'Wishes' },
  ];

  constructor(private fb: FormBuilder,private router: Router) {
    this.fundraisingForm = this.fb.group({
      country: ['Switzerland', Validators.required],
      postcode: ['', [Validators.required, Validators.pattern(/^\d{4,5}$/)]],
      category: ['community', Validators.required]
    });
    
    // Set initial selected category
    this.selectedCategory = 'community';
  }

  ngOnInit(): void {
    
      console.log('Form submitted:', this.fundraisingForm.value);
    
  }

  toggleCountryDropdown(): void {
    this.showCountryDropdown = !this.showCountryDropdown;
  }

  selectCountry(country: any): void {
    this.fundraisingForm.patchValue({ country: country.name });
    console.log('Form submitted:', this.fundraisingForm.value);
    this.showCountryDropdown = false;
    console.log(country);
  }

  selectCategory(categoryId: string): void {
    this.selectedCategory = categoryId;
    this.fundraisingForm.patchValue({ category: categoryId });
    console.log('Form submitted:', this.fundraisingForm.value);
    console.log(this.selectedCategory);
  }

  onSubmit(): void {
    if (this.fundraisingForm.valid) {
      console.log('Form submitted:', this.fundraisingForm.value);
      this.router.navigate(['/entrepreneur/start-campagne/step2'], {
        state: { formData: this.fundraisingForm.value }
      });
      // Handle form submission
    } else {
      // Mark all fields as touched to trigger validation
      Object.keys(this.fundraisingForm.controls).forEach(key => {
        this.fundraisingForm.get(key)?.markAsTouched();
      });
    }
  }
  nextStep() {
    
  }
}