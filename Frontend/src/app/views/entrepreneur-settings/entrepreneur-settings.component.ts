import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-entrepreneur-settings',
  standalone:true,
  imports: [CommonModule,FormsModule],
  templateUrl: './entrepreneur-settings.component.html',
  styleUrl: './entrepreneur-settings.component.css'
})
export class EntrepreneurSettingsComponent implements OnInit {
  activeTab = "profile"
  bannerUrl = "/green.jpg"
  avatarUrl = "/ahmed.jpg"

  profileForm = {
    bio: "",
    website: "",
  }

  socialForm = {
    twitter: "",
    instagram: "",
    linkedin: "",
    website: "",
  }

  notificationPrefs = {
    newBackers: true,
    comments: true,
    fundingMilestones: true,
    marketingEmails: false,
  }

  paymentForm = {
    payoutMethod: "ach",
    payoutSchedule: "weekly",
  }
  user:any;
  token:any;
  constructor(private userService:UsersService) {}
  ngOnInit(): void {
    const userData = localStorage.getItem('user');
    this.token = localStorage.getItem('token');
    if (userData) {
      this.user = JSON.parse(userData);
      console.log(this.user.role);
      
    };
    // Initialize with sample data or fetch from API
    this.loadUserData()
  }

  setActiveTab(tab: string): void {
    this.activeTab = tab
  }

  changeBanner(): void {
    // Implement file upload logic
    console.log("Change banner clicked")
  }

  changeAvatar(): void {
    // Implement file upload logic
    console.log("Change avatar clicked")
  }

  saveProfile(): void {
    const updatedProfile = {
      ...this.user,           // includes firstName, lastName, email, localisation
    };
    this.userService.updateUser(this.user._id,updatedProfile,this.token).subscribe((data:any)=>{
      localStorage.setItem("user",JSON.stringify(data.data));
      console.log(data.data);
    })
    console.log("Saving profile", this.profileForm)
    // Implement API call to save profile data
  }

  saveSocial(): void {
    const updatedProfile = {
      ...this.user,           // includes firstName, lastName, email, localisation
      
    };
    this.userService.updateUser(this.user._id,updatedProfile,this.token).subscribe((data:any)=>{
      localStorage.setItem("user",JSON.stringify(data.data));
      console.log(data.data);
    })
    console.log("Saving social media", this.socialForm)
    // Implement API call to save social media data
  }

  saveNotifications(): void {
    console.log("Saving notifications", this.notificationPrefs)
    // Implement API call to save notification preferences
  }

  savePayment(): void {
    console.log("Saving payment settings", this.paymentForm)
    // Implement API call to save payment settings
  }

  private loadUserData(): void {
    // This would typically be an API call
    // For now, we'll just set some sample data
    this.profileForm = {
      bio: "Entrepreneur and innovator with a passion for sustainable technology.",
      website: "https://johndoe.com",
    }

    this.socialForm = {
      twitter: "johndoe",
      instagram: "johndoe",
      linkedin: "john-doe",
      website: "https://johndoe.com",
    }
  }
}

