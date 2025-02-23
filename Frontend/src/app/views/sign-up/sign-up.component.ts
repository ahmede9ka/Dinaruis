import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {
  previewUrl: string | ArrayBuffer | null = null;

  /*onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];

      // Ensure the file is an image
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = () => {
          this.previewUrl = reader.result;
        };
        reader.readAsDataURL(file);
      } else {
        // Optionally handle non-image file selections
        this.previewUrl = null;
        alert('Selected file is not an image.');
      }
    }
  }*/
    selectedImage: string | ArrayBuffer | null = null;

    onFileSelected(event: Event) {
      const file = (event.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          this.selectedImage = reader.result; // Convert image to base64
        };
        reader.readAsDataURL(file);
      }
    }
    
  signUpForm!: FormGroup; // Define the FormGroup

  

  ngOnInit() {
    this.signUpForm = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required),
      dob: new FormControl('', Validators.required),
      localisation: new FormControl('', Validators.required)
    });
  }

  onSubmit() {
    if (this.signUpForm.valid) {
      console.log('Form Submitted', this.signUpForm.value);
    }
    else
    {
      console.log('Form is invalid');
    }
  }
}
