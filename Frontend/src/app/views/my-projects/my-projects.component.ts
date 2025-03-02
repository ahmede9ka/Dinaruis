import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-projects',
  imports: [CommonModule],
  templateUrl: './my-projects.component.html',
  styleUrl: './my-projects.component.css'
})
export class MyProjectsComponent implements OnInit {
  // Example campaigns array
  campaigns = [
    {
      id: 1,
      imageUrl: 'https://whygreeneconomy.org/wp-content/uploads/2013/03/Sustainable-Energy-For-All.jpg',
      title: 'Green Energy for All',
      shortDescription: 'A project to bring sustainable energy to rural areas.',
      progress: 75,
      donatedAmount: 15000,
      goalAmount: 20000,
      deadline: '2025-12-31'
    },
    {
      id: 2,
      imageUrl: 'https://globalwellnessinstitute.org/wp-content/uploads/2019/11/WATERFeature-scaled.jpg',
      title: 'Clean Water Initiative',
      shortDescription: 'Providing clean water to communities in need.',
      progress: 50,
      donatedAmount: 10000,
      goalAmount: 20000,
      deadline: '2025-11-30'
    },
    {
      id: 3,
      imageUrl: 'https://1.bp.blogspot.com/-5IPvRgjod-k/XAZp4gK5WlI/AAAAAAABRSM/TrFnLG97Kw4WKk8cNgBVqyvKqiWLqe5_ACEwYBhgL/s1600/Education%2Bmeeting%2Bgraphic.jpg',
      title: 'Education for All',
      shortDescription: 'Helping build schools and provide supplies for children.',
      progress: 25,
      donatedAmount: 5000,
      goalAmount: 20000,
      deadline: '2025-10-31'
    },
    {
      id: 1,
      imageUrl: 'https://whygreeneconomy.org/wp-content/uploads/2013/03/Sustainable-Energy-For-All.jpg',
      title: 'Green Energy for All',
      shortDescription: 'A project to bring sustainable energy to rural areas.',
      progress: 75,
      donatedAmount: 15000,
      goalAmount: 20000,
      deadline: '2025-12-31'
    },
    {
      id: 2,
      imageUrl: 'https://globalwellnessinstitute.org/wp-content/uploads/2019/11/WATERFeature-scaled.jpg',
      title: 'Clean Water Initiative',
      shortDescription: 'Providing clean water to communities in need.',
      progress: 50,
      donatedAmount: 10000,
      goalAmount: 20000,
      deadline: '2025-11-30'
    },
    {
      id: 3,
      imageUrl: 'https://1.bp.blogspot.com/-5IPvRgjod-k/XAZp4gK5WlI/AAAAAAABRSM/TrFnLG97Kw4WKk8cNgBVqyvKqiWLqe5_ACEwYBhgL/s1600/Education%2Bmeeting%2Bgraphic.jpg',
      title: 'Education for All',
      shortDescription: 'Helping build schools and provide supplies for children.',
      progress: 25,
      donatedAmount: 5000,
      goalAmount: 20000,
      deadline: '2025-10-31'
    }
  ];

  constructor() {}

  ngOnInit(): void {}

  viewCampaignDetails(campaignId: number): void {
    console.log('Viewing details for campaign ID:', campaignId);
    // Logic to navigate to the campaign detail page or show modal
  }
}
