import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { CampagneService } from '../../services/campagne.service';
import { InvestorService } from '../../services/investor.service';
import { UsersService } from '../../services/users.service';

interface Campaign {
  _id: string;
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
  isFavorite?: boolean;
  raisedAmount: number;
}

@Component({
  selector: 'app-campagne',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [CommonModule],
  templateUrl: './campagne.component.html',
  styleUrls: ['./campagne.component.css']
})
export class CampagneComponent implements OnInit {
  campaignId: string | null = null;
  campaign!: Campaign;
  token: string | null = null;
  selectedAmount: number = 0;
  data: any;
  user: any;

  showConfirmModal = false;
  showSuccessModal = false;
  selectedOption: string = '';

  constructor(
    private route: ActivatedRoute,
    private campaignService: CampagneService,
    private investorService: InvestorService,
    private userService: UsersService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    if (userData) {
      this.user = JSON.parse(userData);

      this.route.paramMap.subscribe(params => {
        this.campaignId = params.get('id');

        if (this.campaignId && this.token) {
          this.campaignService.getCampaignById(this.campaignId, this.token).subscribe({
            next: (res: any) => {
              this.campaign = res.data;
            },
            error: (err) => {
              console.error('Failed to fetch campaign data:', err);
            }
          });
        }
      });
    }
  }

  selectAmount(amount: number): void {
    this.selectedAmount = amount;
    this.data = {
      amount: this.selectedAmount,
      campaign_id: this.campaignId
    };
  }

  donate(): void {
    if (!this.selectedAmount) {
      console.warn('Please select an amount before donating.');
      return;
    }

    this.userService.Donate(this.data, this.token).subscribe({
      next: (response: any) => {
        if (response.url) {
          window.location.href = response.url;
        } else {
          console.warn('Donation response does not contain a valid Stripe URL.');
        }
      },
      error: (error) => {
        console.error('Error processing donation:', error);
      }
    });
  }

  openConfirmation(option: string): void {
    this.selectedOption = option;
    this.showConfirmModal = true;
  }

  confirmInterest(): void {
    if (!this.user || !this.token || !this.campaignId) return;

    let investmentType = '';

    switch (this.selectedOption) {
      case 'Equity':
        investmentType = 'equity-based investment';
        break;
      case 'Reward':
        investmentType = 'rewards-based investment';
        break;
      case 'Loan-Based':
        investmentType = 'loan-based investment';
        break;
      default:
        return;
    }

    const data = {
      campaign_id: this.campaignId,
      investmentType,
      investor_id: this.user._id
    };

    this.campaignService.sendMail(data, this.token).subscribe({
      next: (response: any) => {
        console.log(response);
        this.showConfirmModal = false;
        this.showSuccessModal = true;
      },
      error: (error) => {
        console.error('Error sending interest:', error);
        this.showConfirmModal = false;
      }
    });
  }

  closeModal(): void {
    this.showConfirmModal = false;
    this.showSuccessModal = false;
  }
}
