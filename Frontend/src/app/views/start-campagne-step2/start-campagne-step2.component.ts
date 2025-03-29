import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-start-campagne-step2',
  standalone:true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './start-campagne-step2.component.html',
  styleUrl: './start-campagne-step2.component.css'
})
export class StartCampagneStep2Component {
  fundraisingForm: FormGroup;
  recommendedTarget: number | null = null;
  formData: any;
  constructor(private fb: FormBuilder, private router: Router) {
    // Fetch the form data from the navigation state
    const navigation = this.router.getCurrentNavigation();
    console.log(navigation);
    this.formData = navigation?.extras.state?.['formData'] || {}; 
    console.log('Received data:', this.formData);

    // Initialize the form with default values
    this.fundraisingForm = this.fb.group({
      country: ['', Validators.required],
      postcode: ['', [Validators.required, Validators.pattern('^[0-9]{4,6}$')]],
      selectedCategory: [null, Validators.required],
      targetAmount: ['', [Validators.required, Validators.min(1)]]
    });

    // Set the form values based on the received data
    if (this.formData) {
      this.fundraisingForm.patchValue({
        country: this.formData.country,
        postcode: this.formData.postcode,
        selectedCategory: this.formData.category
      });
    }
  }
  // Update recommended target amount dynamically
  updateRecommendedAmount() {
    const enteredAmount = this.fundraisingForm.get('targetAmount')?.value;
    
    if (enteredAmount && enteredAmount > 0) {
      this.recommendedTarget = Math.max(enteredAmount * 1.2, 11000); 
    } else {
      this.recommendedTarget = null;
    }
  }


  categories = [
    { id: 1, name: 'Medical' },
    { id: 2, name: 'Education' },
    { id: 3, name: 'Community' },
    { id: 4, name: 'Emergency' }
  ];

  selectedCategory: number | null = null;

  selectCategory(categoryId: number) {
    this.selectedCategory = categoryId;
    this.fundraisingForm.patchValue({ selectedCategory: categoryId });
  }

  onSubmit() {
    if (this.fundraisingForm.valid) {
      console.log('Form Data:', this.fundraisingForm.value);
      this.router.navigate(['/entrepreneur/start-campagne/step3'], {
        state: { formData: this.fundraisingForm.value }
      });
    } else {
      console.log('Form is invalid',this.fundraisingForm.value);
    }
  }
  nextStep() {
    //this.router.navigate(['/entrepreneur/start-campagne/step3']); 
  }
}
