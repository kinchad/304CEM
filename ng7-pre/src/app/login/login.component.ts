import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router, ActivatedRoute } from '@angular/router'
import { first } from 'rxjs/operators'
import { AlertService } from '../_services/alert.service'
import { AuthenticationService } from '../_services/authentication.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class loginComponent implements OnInit {
  //define the login form and it status
  loginForm: FormGroup
  submitted = false
  success = false

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService,
    private alertService: AlertService
  ) {
      // redirect to home if already logged in
      if (this.authenticationService.currentUserValue) { 
        this.router.navigate(['/'])
      }
  }
  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      loginID:['',Validators.required],
      password:['',Validators.required]
    })
  }
  onSubmit(){
    //Apply validation after submit of the form, break from onSubmit() if invalid
    this.submitted = true
    if(this.loginForm.invalid){   return   }
    this.success = true

    //Check if the login is valid or not
    this.authenticationService.login(this.loginForm.controls.loginID.value, this.loginForm.controls.password.value)
      .pipe(first())
      .subscribe(
        data => {       //route to home page if valid
          this.router.navigate(['/'])
        },
        error => {       //Show error if invalid
          this.success = false
          this.alertService.error('LoginID or Password incorrect.')
        })
  }
}
