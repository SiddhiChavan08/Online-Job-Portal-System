import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router , ActivatedRoute} from '@angular/router';
import { SharedService } from '../shared.service';

interface Jobseeker {
  id: number | null;
  name: string;
  email: string;
  phone_number: string;
  password?: string;
  address: string;
  designation: string;
  education_bg: string;
  work_experience: string;
  skills: string;
  resume_link: string;
  created_at: Date;
}

@Component({
  selector: 'app-jobseeker',
  templateUrl: './jobseeker.component.html',
  styleUrls: ['./jobseeker.component.css']
})
export class JobseekerComponent implements OnInit {
  //jobseeker: Jobseeker | null = null; 
  isEditing = false;
  private APIUrl = 'https://localhost:7273/api/JobSeeker/';
   abc : any;
  jobseeker: Jobseeker = {
    id: null,
    name: '',
    email: '',
    phone_number: '',
    password : '',
    address: '',
    designation: '',
    education_bg: '',
    work_experience: '',
    skills: '',
    resume_link: '',
    created_at: new Date()
  }; 

  constructor(private http: HttpClient, private sharedService: SharedService, private router : Router) {}

  ngOnInit(): void {
    this.abc = localStorage.getItem("loginUserEmail")
    this.loadJobSeekerProfile(this.abc)
    // this.sharedService.emailChanged.subscribe(email => {
    //   if (email) {
    //     this.loadJobSeekerProfile(email);
    //   }
    // });
  }

  getDetails(){
      }

  toggleEdit(): void {
    this.isEditing = !this.isEditing;
    if (!this.isEditing) {
      this.saveProfile();
    }
  }



  

  // saveProfile1(){
  //   this.jobseeker.name = (<HTMLInputElement>document.getElementById("name")).value;
  //   this.jobseeker.email = (<HTMLInputElement>document.getElementById("mail")).value;
  //   this.jobseeker.password = (<HTMLInputElement>document.getElementById("password")).value;
  //   this.jobseeker.phone_number = (<HTMLInputElement>document.getElementById("no")).value;
  //   this.jobseeker.address = (<HTMLInputElement>document.getElementById("add")).value;
  //   this.jobseeker.education_bg = (<HTMLInputElement>document.getElementById("edu")).value;
  //   this.jobseeker.skills = (<HTMLInputElement>document.getElementById("skill")).value;
  //   this.jobseeker.designation = (<HTMLInputElement>document.getElementById("designation")).value;
  //   this.jobseeker.work_experience = (<HTMLInputElement>document.getElementById("exp")).value;
  //   this.jobseeker.resume_link = (<HTMLInputElement>document.getElementById("link")).value;

  //   console.log(this.APIUrl+'UpdateUser/'+this.jobseeker.name+'/'+this.jobseeker.email+'/'+this.jobseeker.password);
    
  //   this.http.put(this.APIUrl+'UpdateUser/'+this.uname+'/'+this.pass+'/'+this.mail, null).subscribe(data => {
  //     alert(data);
  //   });

  // }

  saveProfile(): void { 
    if (this.jobseeker) {
      const encodedEmail = encodeURIComponent(this.jobseeker.email);
      // email = email.substring(1, email.length - 1); 
      this.http.put<Jobseeker>(`${this.APIUrl}UpdateJobSeekerByEmail?email=${encodedEmail}`, this.jobseeker, { observe: 'response' }).subscribe(
        response => {
          console.log('Response:', response);  // Log full response
          alert('Profile updated successfully!');
        },
        error => {
          console.error('Error saving job seeker profile', error);
          alert('Failed to update profile. Please try again later.');
        }
      );
    }
  }


  onDelete(email: string): void {
    if (this.jobseeker) {
    const url = `${this.APIUrl}DeleteJobseeker?email=${encodeURIComponent(this.jobseeker.email)}`;
    this.http.delete(url).subscribe(
      (response) => {
        alert('Jobseeker deleted successfully!');
        this.router.navigate(['/form']);
      },
      (error) => {
        console.error('Error deleting jobseeker', error);
        alert('Failed to delete jobseeker. Please try again later.');
      }
    );
  }
  }

  loadJobSeekerProfile(email?: any): void {
    email = email.substring(1, email.length - 1); 
    const url = `${this.APIUrl}GetJobSeekerByEmail?email=${encodeURIComponent(email)}`;
    this.http.get<Jobseeker>(url).subscribe(
      data => {
        this.jobseeker = data;
        console.log(this.jobseeker)
      },
      error => {
        console.error('Error fetching job seeker data', error);
        alert('Failed to load job seeker profile. Please try again later.');
      }
    );
  }
  onSubmit(){

  }

 
  

}