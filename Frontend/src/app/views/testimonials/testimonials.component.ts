import { CommonModule } from '@angular/common';
import { Component, AfterViewInit } from '@angular/core';
import gsap from 'gsap';

@Component({
  selector: 'app-testimonials',
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.css'],
  standalone:true,
  imports: [CommonModule]
})
export class TestimonialsComponent implements AfterViewInit {
   testimonials = [
    {
      text: "Dinaruis has made crowdfunding incredibly easy and accessible. It simplifies the process for both creators and backers.",
      imageSrc: "https://picsum.photos/seed/1/200/200",  // Random image from Lorem Picsum
      name: "Sara Laouini",
      username: "@sara_crowd",
    },
    {
      text: "The platform is intuitive and the community is amazing. My campaign was funded in less than 3 days!",
      imageSrc: "https://picsum.photos/seed/2/200/200",  // Random image from Lorem Picsum
      name: "Mounir Habib",
      username: "@mounirfunds",
    },
    {
      text: "Thanks to Dinaruis, we raised enough funds to bring our eco-friendly product to life. The process was smooth and transparent.",
      imageSrc: "https://picsum.photos/seed/3/200/200",  // Random image from Lorem Picsum
      name: "Leila Jaziri",
      username: "@leilacrowds",
    },
    {
      text: "This platform has revolutionized crowdfunding. The tools provided to campaign creators are top-notch.",
      imageSrc: "https://picsum.photos/seed/4/200/200",  // Random image from Lorem Picsum
      name: "Ali Ben Said",
      username: "@alibenfunds",
    },
    {
      text: "Dinaruis has been a game changer for our charity. We were able to connect with backers who care about our cause.",
      imageSrc: "https://picsum.photos/seed/5/200/200",  // Random image from Lorem Picsum
      name: "Nour Bouzid",
      username: "@nourgiving",
    },
    {
      text: "The crowdfunding process on Dinaruis is not only seamless but also very transparent. Highly recommended!",
      imageSrc: "https://picsum.photos/seed/6/200/200",  // Random image from Lorem Picsum
      name: "Karim Fathi",
      username: "@karimfunding",
    },
    {
      text: "I raised funds for my startup faster than I could have imagined. Dinaruis made everything possible.",
      imageSrc: "https://picsum.photos/seed/7/200/200",  // Random image from Lorem Picsum
      name: "Amine Ferjani",
      username: "@aminecrowd",
    },
    {
      text: "Dinaruis has been instrumental in our campaign's success. The platform helped us reach a global audience effortlessly.",
      imageSrc: "https://picsum.photos/seed/8/200/200",  // Random image from Lorem Picsum
      name: "Rania Zribi",
      username: "@raniafundraiser",
    },
    {
      text: "The community on Dinaruis is fantastic! They’re engaged and passionate, which made our campaign journey enjoyable.",
      imageSrc: "https://picsum.photos/seed/9/200/200",  // Random image from Lorem Picsum
      name: "Zied Bouhssina",
      username: "@ziedcrowdfunding",
    },
  ];
  

  ngAfterViewInit() {
    this.animateTestimonials();
  }

  animateTestimonials() {
    gsap.fromTo('.testimonial', 
      { 
        opacity: 0, 
        y: 100, 
        filter: 'blur(5px)' 
      },
      { 
        opacity: 1, 
        y: 0, 
        filter: 'blur(0px)', 
        stagger: 0.3, 
        duration: 1.5,
        ease: 'power2.out',
        repeat: -1, // Repeat indefinitely
        yoyo: true  // Make it go up and down
      });
  }
}
