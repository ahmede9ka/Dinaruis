import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Donation {
  name: string;
  amount: number;
  type: string;
  avatar: string;
}

interface Campaign {
  campaignTitle: string;
  amountRaised: number;
  targetAmount: number;
  totalDonations: number;
  campaignImage: string;
  campaignDescription: string;
  campaignCreator: string;
  campaignCreatorAvatar: string;
  organizerName: string;
  beneficiaryName: string;
  progress: number;
  recentDonorsCount: number;
  recentDonations: Donation[];
  campaignImages: string[];
  
}

@Component({
  selector: 'app-campagne',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [CommonModule],
  templateUrl: './campagne.component.html',
  styleUrls: ['./campagne.component.css']
})
export class CampagneComponent {
  campaign: Campaign = {
    campaignTitle: 'Support Clean Water Project in Uganda',
    amountRaised: 2375,
    targetAmount: 5000,
    totalDonations: 85,
    campaignImage:
      'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/modern-election-campaign-facebook-cover-template-fabe99f0fdcc805236e35e8ae862b9d8_screen.jpg?ts=1561545642',
      campaignDescription: `The Support Clean Water Project in Uganda aims to bring life-saving clean and safe drinking water to rural communities in Uganda, where millions of people are currently facing waterborne diseases due to the lack of access to safe water sources. Access to clean water is not just a basic human need; it is essential for health, education, and economic prosperity. Every day, women and children in these communities walk miles to fetch contaminated water from distant and often dangerous sources. This project is designed to address this pressing issue by providing long-term solutions through the construction of modern wells, water purification systems, and sustainable water management practices.

      Our goal is to raise $5,000 to fund the construction of multiple wells in communities across Uganda. These wells will be equipped with high-quality filtration systems that will ensure safe water for thousands of individuals. In addition to building the wells, we aim to educate local communities on the importance of maintaining clean water sources, and empower local leaders to oversee water management and distribution efforts.
      
      The project is being led by Water For All, a non-profit organization dedicated to making clean water accessible to every individual, no matter where they live. With the support of generous donors like you, we can change the lives of families in Uganda by providing them with a reliable, safe water source. Not only will this improve health outcomes, but it will also enable children to spend more time in school, women to focus on economic activities, and entire communities to thrive in ways that were previously unimaginable.
      
      Your donation will directly contribute to funding the construction and maintenance of these life-saving wells. In addition, it will provide necessary training for local residents, ensuring that the project is sustainable and continues to benefit the community for years to come. Whether it’s a small contribution or a larger commitment, every bit helps. Together, we can create a future where no one has to suffer from the lack of clean water.
      
      Join us in this mission to provide safe water, health, and hope for the communities in Uganda. Together, we can make a lasting impact and change lives, one drop at a time.`,
      campaignCreator: 'Water For All',
      
    campaignCreatorAvatar: 'https://randomuser.me/api/portraits/men/3.jpg',
    organizerName: 'Water For All Organization',
    beneficiaryName: 'Communities in Uganda',
    progress: (2375 / 5000) * 100,
    recentDonorsCount: 12,
    recentDonations: [
      { name: 'John Doe', amount: 100, type: 'Top Donor', avatar: 'https://randomuser.me/api/portraits/men/1.jpg' },
      { name: 'Jane Smith', amount: 75, type: 'Recent Donor', avatar: 'https://randomuser.me/api/portraits/women/1.jpg' },
      { name: 'Emily White', amount: 50, type: 'Supporter', avatar: 'https://randomuser.me/api/portraits/women/2.jpg' },
      { name: 'David Brown', amount: 25, type: 'Supporter', avatar: 'https://randomuser.me/api/portraits/men/2.jpg' }
    ],
    campaignImages: [
      'https://static.vecteezy.com/ti/photos-gratuite/t2/48445324-serein-campagne-felicite-vert-collines-paturage-mouton-et-pittoresque-ferme-gratuit-photo.jpg',
      'https://images.unsplash.com/photo-1530178687946-0459336a4a5b?crop=entropy&cs=tinysrgb&fit=max&ixid=MXwyMDg1OXwwfDF8c2VhY2h8OXx8fGxvY2F0aW9ufGVufDB8fHx8fDE2ODg4MTI5NzA&ixlib=rb-1.2.1&q=80&w=1080',
      'https://images.unsplash.com/photo-1604013725362-b0c7c971438b?crop=entropy&cs=tinysrgb&fit=max&ixid=MXwyMDg1OXwwfDF8c2VhY2h8OXx8fGxvY2F0aW9ufGVufDB8fHx8fDE2ODg4MTI5NzA&ixlib=rb-1.2.1&q=80&w=1080'
    ]
  };

  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
  }

  navigateTo(url: string): void {
    window.location.href = url;
  }
}
