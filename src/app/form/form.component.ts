import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent {
  @Output() emailSelected = new EventEmitter<string>();
  
  abc: Boolean = false;
  APIUrl ='https://localhost:7273/api/JobSeeker/';


  jobseeker: any = {
    id: null,
    name: '',
    email: '',
    phoneNumber: '',
    address: '',
    designation: '',
    educationBg: '',
    workExperience: '',
    skills: '',
    resumeLink: '',
    createdAt: new Date()
  };

  constructor(private router: Router, private http : HttpClient, private sharedService: SharedService) { }
  signUpUser : any[] = [];

  signUpObj : any = {
    username : '',
    email : '',
    password : '',
    role: ''
  }

  // navigateToJobseekerProfile(): void {
  //   const email = this.signUpObj.email;
  //   this.router.navigate(['/jobseeker'], { queryParams: { email } });
  // }

  // navigateToDashboard(): void {
  //   // Assuming you have the email in `signUpObj.email`
  //   const email = this.signUpObj.email;
  //   this.router.navigate(['/js-dashboard'], { queryParams: { email } });
  // }

  loginObj : any = {
    email : '',
    password : ''
  }

  onSignUp(){
    this.signUpUser.push(this.signUpObj);
    localStorage.setItem('sigUpUser', JSON.stringify(this.signUpUser));
    this.http.post(this.APIUrl+'RegisterJobseekers', this.signUpObj).subscribe(data  => {
      this.signUpObj = null;
      alert("Jobseeker added successfully!");
      var abc = data;
     
  }); 

  }


ngOnInit(): void{
  const localData = localStorage.getItem('signUpUser');
  if(localData != null){
    this.signUpUser = JSON.parse(localData);
  }
}

loginResponse : any = {
message : "",
jobseeker :{

}
}

onLogin(): void {
  // Assuming signUpUser is defined and contains users data
  // const isUserExist = this.signUpUser.find(m => m.username === this.loginObj.username && m.password === this.loginObj.password);
  localStorage.setItem('loginUserEmail', JSON.stringify(this.loginObj.email));
  // if (isUserExist) {
    this.http.post(this.APIUrl + 'Login', this.loginObj).subscribe(data => { 
      this.loginResponse = data;
      if (this.loginResponse.message === "Login successful") {
        alert('User logged in successfully');
        this.sharedService.emitEmail(this.signUpObj.email);
        this.router.navigate(['/jobseeker'], { queryParams: { email: this.signUpObj.email } });
      
      } else {
        alert("Invalid credentials");
      }
    });
  // } else {
  //   alert("User does not exist");
  // }
}

}
