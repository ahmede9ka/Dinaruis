import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-start-campagne-step3',
  standalone:true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './start-campagne-step3.component.html',
  styleUrl: './start-campagne-step3.component.css'
})
export class StartCampagneStep3Component {
  fundraisingForm: FormGroup;
  coverImagePreview: string | null = null;
  additionalImages: string[] = [];
  formData:any;
  constructor(private fb: FormBuilder,private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    this.formData = navigation?.extras.state?.['formData'] || {}; 
    console.log('Received data:', this.formData);
    this.fundraisingForm = this.fb.group({
      country: ['', Validators.required],
      postcode: ['', [Validators.required, Validators.pattern('^[0-9]{4,6}$')]],
      selectedCategory: [null, Validators.required],
      targetAmount: ['', [Validators.required, Validators.min(1)]],
      coverImage: [null, Validators.required],
      additionalImages: [[]]
    });
    this.fundraisingForm.patchValue({ selectedCategory: this.formData.selectedCategory });
    this.fundraisingForm.patchValue({country:this.formData.country});
    this.fundraisingForm.patchValue({postcode:this.formData.postcode});
    this.fundraisingForm.patchValue({targetAmount:this.formData.targetAmount});
  }

  // Handle Cover Image Upload
  onCoverImageUpload(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.coverImagePreview = reader.result as string;
      };
      reader.readAsDataURL(file);
      this.fundraisingForm.patchValue({ coverImage: file });
    }
  }

  // Handle Additional Images Upload (Max 5)
  onAdditionalImageUpload(event: any) {
    if (this.additionalImages.length >= 5) return;

    const files = Array.from(event.target.files).slice(0, 5 - this.additionalImages.length);
    files.forEach((file: any) => {
      const reader = new FileReader();
      reader.onload = () => {
        this.additionalImages.push(reader.result as string);
      };
      reader.readAsDataURL(file);
    });

    this.fundraisingForm.patchValue({ additionalImages: this.additionalImages });
  }

  // Remove an Additional Image
  removeAdditionalImage(index: number) {
    this.additionalImages.splice(index, 1);
    this.fundraisingForm.patchValue({ additionalImages: this.additionalImages });
  }

  // Form Submit
  onSubmit() {
    if (this.fundraisingForm.valid) {
      console.log('Form Data:', this.fundraisingForm.value);
      this.router.navigate(['/entrepreneur/start-campagne/step4'], {
        state: { formData: this.fundraisingForm.value }
      });
      // Proceed to next step
    } else {
      console.log('Form Data:', this.fundraisingForm.value);
      console.log('Form is invalid');
    }
  }
  nextStep() {
     // Redirect to Step 2
  }
}
