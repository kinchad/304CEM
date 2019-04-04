import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { AlertService } from '../_services/alert.service';
import { AuthenticationService } from '../_services/authentication.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class loginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  success = false;
  returnUrl: string;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private alertService: AlertService
  ) {
      // redirect to home if already logged in
      if (this.authenticationService.currentUserValue) { 
        this.router.navigate(['/']);
      }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      loginID:['',Validators.required],
      password:['',Validators.required]
    })
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }
   onSubmit(){
    this.submitted = true;
    if(this.loginForm.invalid){      return;    }
    this.success = true;

    this.authenticationService.login(this.loginForm.controls.loginID.value, this.loginForm.controls.password.value)
      .pipe(first())
      .subscribe(
        data => {
          //this.router.navigate([this.returnUrl]);
          this.alertService.success('Welcome, '+data[0].name, true);
          this.router.navigate(['/']);
        },
        error => {
          //this.alertService.error(error);          
          this.success = false;
          this.alertService.error('Could not Logged in.');
        });
  }
}
