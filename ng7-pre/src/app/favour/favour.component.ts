import { Component, OnInit } from '@angular/core';
import { DataService } from '../_services/data.service';
import { User } from '../_models/user';
import { UserService } from '../_services/user.service';
import { Subscription } from 'rxjs';
import { AuthenticationService } from '../_services/authentication.service'

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AlertService } from '../_services/alert.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-favour',
  templateUrl: './favour.component.html',
  styleUrls: ['./favour.component.scss']
})
export class favourComponent implements OnInit {
  allCurrencyName: Object;
  //predictResult: Object;
  currencyName = '';
  currentUser: User;
  currentUserSubscription: Subscription;
  favourForm: FormGroup;
  updateForm: FormGroup;
  favourList: Object;

  submitted = false;
  success = false;
  showUpdateForm = false;
  showFavourForm = false;

  selectedCurrency = '';

  constructor(
    private data: DataService,
    private authenticationService: AuthenticationService,
    private formBuilder: FormBuilder,
    private router: Router,
    private alertService: AlertService
  ) {
    this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
      this.currentUser = user;
    });
  }
  ngOnInit() {
    this.favourForm = this.formBuilder.group({
      remarks:[''],
      favourCurrency:['EUR/USD']
    })
    this.updateForm = this.formBuilder.group({
      remarks:['']
    })
    this.data.getCurrencyName().subscribe(data=>{
      this.allCurrencyName = data
    })
    this.data.getFavourList(this.currentUser.login).subscribe(data=>{
      this.favourList = data
    })
  }
  onSubmit(){
    this.submitted = true;
    if(this.favourForm.invalid){      return;    }
    this.success = true;    
    
    this.data.addToFavour(this.currentUser.login,this.favourForm.value)
      .pipe(first()).subscribe(
        data => {            
            location.reload();
        },error => {
            this.alertService.error(error);
        });
  }
  delete(favourCurrency: string){
    this.data.deleteFavour(this.currentUser.login,favourCurrency)
      .pipe(first()).subscribe(
        data=>{
          location.reload();
        },error=>{
          this.alertService.error(error);
        }
      ) 
  }
  update(favourCurrency: string){
     this.data.updateFavour(this.currentUser.login,favourCurrency,this.updateForm.value)
      .pipe(first()).subscribe(
        data=>{
          location.reload();
        },error=>{
          this.alertService.error(error);
        }
      )
  }
  displayUpdateForm(favourCurrency: string){
    this.showFavourForm = false;
    this.showUpdateForm = true;
    this.selectedCurrency = favourCurrency;
  }
  displayFavourForm(){
    this.showUpdateForm = false;
    this.showFavourForm = true;    
  }
}