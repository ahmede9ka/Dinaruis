import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-start-campagne-step4',
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './start-campagne-step4.component.html',
  styleUrl: './start-campagne-step4.component.css'
})
export class StartCampagneStep4Component {
  fundraisingForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.fundraisingForm = this.fb.group({
      
      campaignTitle: ['', Validators.required],
      campaignStory: ['', [Validators.required, Validators.minLength(20)]]
    });
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

}
