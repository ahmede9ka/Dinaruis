import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-start-campagne-step3',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './start-campagne-step3.component.html',
  styleUrl: './start-campagne-step3.component.css'
})
export class StartCampagneStep3Component {
  fundraisingForm: FormGroup;
  coverImagePreview: string | null = null;
  photos: string[] = []; // Store base64 strings
  formData: any;

  constructor(private fb: FormBuilder, private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    this.formData = navigation?.extras.state?.['formData'] || {}; 
    console.log('Received data:', this.formData);

    // Initialize Form
    this.fundraisingForm = this.fb.group({
      country: [this.formData.country || '', Validators.required],
      postcode: [this.formData.postcode || '', [Validators.required, Validators.pattern('^[0-9]{4,6}$')]],
      selectedCategory: [this.formData.selectedCategory || null, Validators.required],
      targetAmount: [this.formData.targetAmount || '', [Validators.required, Validators.min(1)]],
      coverImage: [null, Validators.required],
      additionalImages: [[]] // Store base64 images
    });
  }

  /** Handle Cover Image Upload */
  onCoverImageUpload(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      const file = target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.coverImagePreview = reader.result as string;
        this.fundraisingForm.patchValue({ coverImage: this.coverImagePreview });
      };
      reader.readAsDataURL(file);
    }
  }

  /** Handle Additional Images Upload (Max 5) */
  onFileSelected(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (!target.files) return;

    const selectedFiles = Array.from(target.files);
    const remainingSlots = 5 - this.photos.length;

    if (selectedFiles.length > remainingSlots) {
      alert(`You can only upload ${remainingSlots} more photo(s).`);
      return;
    }

    selectedFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.photos.push(e.target.result); // Store base64 string
        this.fundraisingForm.patchValue({ additionalImages: this.photos });
      };
      reader.readAsDataURL(file);
    });
  }

  /** Remove an Additional Image */
  removeAdditionalImage(index: number) {
    this.photos.splice(index, 1);
    this.fundraisingForm.patchValue({ additionalImages: this.photos });
  }

  /** Handle Form Submission */
  onSubmit() {
    if (this.fundraisingForm.valid) {
      console.log('Form Data:', this.fundraisingForm.value);
      this.router.navigate(['/entrepreneur/start-campagne/step4'], {
        state: { formData: this.fundraisingForm.value }
      });
    } else {
      console.log('Form Data:', this.fundraisingForm.value);
      console.log('Form is invalid');
    }
  }

  nextStep() {
    //this.router.navigate(['/entrepreneur/start-campagne/step4']);
  }
}
