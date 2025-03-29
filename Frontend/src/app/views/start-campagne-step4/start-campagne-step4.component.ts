import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CampagneService } from '../../services/campagne.service';

interface Campaign {
  title: string;
  description: string;
  amountGoal: number;
  image: string;
  images: string[];
  startDate: Date;
  endDate: Date;
  localisation: string;
  type: string;
  code_postal: string;
  user: string;
  progress?: number;
  raisedAmount: number;
}

@Component({
  selector: 'app-start-campagne-step4',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './start-campagne-step4.component.html',
  styleUrls: ['./start-campagne-step4.component.css']
})
export class StartCampagneStep4Component {
  fundraisingForm: FormGroup;
  formData: any;
  token: string | null;
  campaign: Campaign;

  isModalOpen = false;

  constructor(private fb: FormBuilder, private router: Router, private campaignservice: CampagneService) {
    // Getting state from previous navigation
    const navigation = this.router.getCurrentNavigation();
    this.formData = navigation?.extras.state?.['formData'] || {};

    console.log('Received data:', this.formData);

    // Initializing the form with default values or from the passed data
    this.fundraisingForm = this.fb.group({
      country: [this.formData.country || '', Validators.required],
      postcode: [this.formData.postcode || '', [Validators.required, Validators.pattern('^[0-9]{4,6}$')]],
      selectedCategory: [this.formData.selectedCategory || null, Validators.required],
      targetAmount: [this.formData.targetAmount || '', [Validators.required, Validators.min(1)]],
      coverImage: [this.formData.coverImage || null, Validators.required],
      additionalImages: [this.formData.additionalImages || []],
      campaignTitle: [this.formData.campaignTitle || '', Validators.required],
      campaignStory: [this.formData.campaignStory || '', [Validators.required, Validators.minLength(20)]]
    });

    this.token = localStorage.getItem('token');
    this.campaign = {} as Campaign;  // Initializing as empty campaign object
  }

  // Form Submit
  onSubmit() {
    if (this.fundraisingForm.valid) {
      // Mapping form values to campaign object
      this.campaign.title = this.fundraisingForm.value['campaignTitle'];
      this.campaign.amountGoal = Number(this.fundraisingForm.value['targetAmount']);
      this.campaign.description = this.fundraisingForm.value['campaignStory'];
      this.campaign.image = this.fundraisingForm.value['coverImage'];
      this.campaign.images = this.fundraisingForm.value['additionalImages'];
      this.campaign.localisation = this.fundraisingForm.value['country'];
      this.campaign.code_postal = this.fundraisingForm.value['postcode'];
      this.campaign.type = this.fundraisingForm.value['selectedCategory'];

      // Setting startDate as today and endDate as two weeks later
      this.campaign.startDate = new Date();
      this.campaign.endDate = new Date();
      this.campaign.endDate.setDate(this.campaign.startDate.getDate() + 14); // Adds 14 days

      console.log('Form Data:', this.fundraisingForm.value);
      console.log('Campaign Object:', this.campaign);

      // Call the service to create the campaign
      this.campaignservice.createCampaign(this.campaign, this.token).subscribe(
        (data: any) => {
          console.log(data);
          this.isModalOpen = true; // Open modal upon success
        },
        (error: any) => {
          console.error('Error creating campaign:', error);
        }
      );
    } else {
      console.log('Form is invalid');
    }
  }

  // Close modal and go to the home page
  goToRoot() {
    this.router.navigate(['/']);
  }
}
