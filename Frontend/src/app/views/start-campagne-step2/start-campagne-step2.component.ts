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
  constructor(private fb: FormBuilder,private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    this.formData = navigation?.extras.state?.['formData'] || {}; 
    console.log('Received data:', this.formData);
    this.fundraisingForm = this.fb.group({
      country: ['', Validators.required],
      postcode: ['', [Validators.required, Validators.pattern('^[0-9]{4,6}$')]],
      selectedCategory: [null, Validators.required],
      targetAmount: ['', [Validators.required, Validators.min(1)]]
    });
    
    this.fundraisingForm.patchValue({ selectedCategory: this.formData.category });
    this.fundraisingForm.patchValue({country:this.formData.country});
    this.fundraisingForm.patchValue({postcode:this.formData.postcode});

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
      console.log('Form is invalid');
    }
  }
  nextStep() {
    //this.router.navigate(['/entrepreneur/start-campagne/step3']); // Redirect to Step 2
  }
}
