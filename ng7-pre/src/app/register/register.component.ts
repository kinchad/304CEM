import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms'
import { first } from 'rxjs/operators'
import { AlertService } from '../_services/alert.service'
import { UserService } from '../_services/user.service'
import { AuthenticationService } from '../_services/authentication.service'

@Component({
    templateUrl: 'register.component.html',
    styleUrls: ['./register.component.scss']
})
export class registerComponent implements OnInit {
    //define register form and its status
    registerForm: FormGroup
    submitted = false

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private authenticationService: AuthenticationService,
        private userService: UserService,
        private alertService: AlertService
    ) { 
        // redirect to home if already logged in
        if (this.authenticationService.currentUserValue) { 
            this.router.navigate(['/'])
        }
    }
    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            userName: ['', Validators.required],
            loginID: ['', Validators.required],
            password: ['', [Validators.required, Validators.minLength(6)]],
            confirmPwd: ['',[Validators.required, Validators.minLength(6),]],
            email: ['']            
        },{
            validator: this.passwordMatching
        });
    }
    passwordMatching(group: FormGroup){     //customize validator for    confirm password
        let pass = group.controls.password.value
        let confirmPwd = group.controls.confirmPwd.value
        return pass === confirmPwd ? null : { notSame: true }
    }
    onSubmit() {        //Click the register button
        this.submitted = true  
        if (this.registerForm.invalid) {   return    }     // stop here if form is invalid
        this.userService.register(this.registerForm.value)
            .pipe(first()).subscribe(
                data => {
                    this.alertService.success('Registration successful', true)
                    this.router.navigate(['/login'])
                },
                error => {
                    this.alertService.error(error)
                });
    }
}