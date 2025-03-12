import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Campaign } from '../../model/class/Campaign';
import { CampagneService } from '../../services/campagne.service';

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

  constructor(private fb: FormBuilder, private router: Router,private campaignservice:CampagneService) {
    const navigation = this.router.getCurrentNavigation();
    this.formData = navigation?.extras.state?.['formData'] || {}; 

    console.log('Received data:', this.formData);

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

    this.token = localStorage.getItem("token");
    this.campaign = new Campaign();
  }

  // Form Submit
  onSubmit() {
    if (this.fundraisingForm.valid) {
      this.campaign.title = this.fundraisingForm.value["campaignTitle"];
      this.campaign.amountGoal = Number(this.fundraisingForm.value["targetAmount"]);
      this.campaign.description = this.fundraisingForm.value["campaignStory"];
      this.campaign.image = this.fundraisingForm.value["coverImage"];
      this.campaign.images = this.fundraisingForm.value["additionalImages"];
      this.campaign.localisation = this.fundraisingForm.value["country"];
      this.campaign.code_postal = this.fundraisingForm.value["postcode"];
      this.campaign.type = this.fundraisingForm.value["selectedCategory"];

      // Set startDate as today and endDate as two weeks later
      this.campaign.startDate = new Date();
      this.campaign.endDate = new Date();
      this.campaign.endDate.setDate(this.campaign.startDate.getDate() + 14); // Adds 14 days

      console.log('Form Data:', this.fundraisingForm.value);
      console.log('Campaign Object:', this.campaign);
      this.campaignservice.createCampaign(this.campaign,this.token).subscribe((data:any)=>{
        console.log(data);
      })
      // Proceed to next step (e.g., send campaign data to backend)
    } else {
      console.log('Form is invalid');
    }
  }
}
