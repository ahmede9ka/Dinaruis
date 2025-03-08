import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-settings',
  standalone:true,
  imports: [CommonModule,FormsModule],
  templateUrl: './admin-settings.component.html',
  styleUrl: './admin-settings.component.css'
})
export class AdminSettingsComponent  implements OnInit {
  activeTab = "profile"
  bannerUrl = "/green.jpg"
  avatarUrl = "/ahmed.jpg"

  profileForm = {
    name: "",
    username: "",
    email: "",
    bio: "",
    location: "",
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

  constructor() {}

  ngOnInit(): void {
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
    console.log("Saving profile", this.profileForm)
    // Implement API call to save profile data
  }

  saveSocial(): void {
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
      name: "John Doe",
      username: "johndoe",
      email: "john@example.com",
      bio: "Entrepreneur and innovator with a passion for sustainable technology.",
      location: "San Francisco, CA",
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

