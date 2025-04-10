import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Usersignup } from '../../model/class/usersignup';
import { LoginService } from '../../services/login.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'] // Fixed `styleUrl` to `styleUrls`
})
export class SignUpComponent implements OnInit {
  previewUrl: string | ArrayBuffer | null = null;
  userObj: Usersignup = new Usersignup();
  role: string = ''; // Initialize role to prevent undefined issues
  selectedImage: string | ArrayBuffer | null = null;
  signUpForm!: FormGroup; // Define the FormGroup
  token:any;
  user:any;
  constructor(private loginservice: LoginService, 
              private route: ActivatedRoute,
              private router:Router) {}

  ngOnInit() {
    this.signUpForm = new FormGroup({
      firstname: new FormControl('', Validators.required),
      lastname: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      phoneNumber: new FormControl('', Validators.required), // Changed from `phone`
      password: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required),
      DateOfBirth: new FormControl('', Validators.required), // Changed from `dob`
      localisation: new FormControl('', Validators.required),
      image:new FormControl('',Validators.required)
    });

    this.route.paramMap.subscribe(params => {
      const roleParam = params.get('role');
      if (roleParam) {
        this.role = roleParam; 
        console.log('Role from URL:', this.role);
      }
    });
  }

  onFileSelected(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      const file = target.files[0];
      const reader = new FileReader();
  
      reader.onload = () => {
        const result = reader.result as string;
  
        // Remove the "data:image/...;base64," part
        const base64String = result.split(',')[1];
  
        // Store the pure base64 string
        this.signUpForm.patchValue({ image: base64String });
        this.selectedImage = base64String;
      };
  
      reader.readAsDataURL(file);
    }
  }
  

  onSubmit() {
    console.log(this.signUpForm);
    if (this.signUpForm.valid) {
      this.userObj = new Usersignup(
        this.signUpForm.value.email,
        this.signUpForm.value.password,
        this.signUpForm.value.firstname,
        this.signUpForm.value.lastname,
        new Date(this.signUpForm.value.DateOfBirth), // Convert string to Date object
        this.signUpForm.value.phoneNumber,
        this.role, // Assign retrieved role
        this.signUpForm.value.localisation,
        this.signUpForm.value.image
      );
      console.log(this.userObj);
      this.loginservice.signup(this.userObj).subscribe(
        (data: any) => {
          console.log('Signup Successful:', data);
          console.log(data.data.newUser);
          this.token = data.token;
          this.user = JSON.stringify(data.data.newUser);
          localStorage.setItem("token",this.token);
          localStorage.setItem("user",this.user);
          this.router.navigate(['/']);
        },
        (error) => {
          console.error('Signup Error:', error);
        }
      );
    } else {
      console.log('Form is invalid');
    }
  }
}
