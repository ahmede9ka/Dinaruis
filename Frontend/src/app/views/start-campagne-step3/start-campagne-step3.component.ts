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

  constructor(private fb: FormBuilder,private router: Router) {
    this.fundraisingForm = this.fb.group({
      targetAmount: ['', [Validators.required, Validators.min(1)]],
      coverImage: [null, Validators.required],
      additionalImages: [[]]
    });
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
      // Proceed to next step
    } else {
      console.log('Form is invalid');
    }
  }
  nextStep() {
    this.router.navigate(['/entrepreneur/start-campagne/step4']); // Redirect to Step 2
  }
}
