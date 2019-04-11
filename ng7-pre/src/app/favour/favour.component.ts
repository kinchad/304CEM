import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { Subscription } from 'rxjs'
import { first } from 'rxjs/operators'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

import { AlertService } from '../_services/alert.service'
import { AuthenticationService } from '../_services/authentication.service'
import { DataService } from '../_services/data.service'
import { User } from '../_models/user'

@Component({
  selector: 'app-favour',
  templateUrl: './favour.component.html',
  styleUrls: ['./favour.component.scss']
})
export class favourComponent implements OnInit {
  //define variables
  allCurrencyName: Object  
  currencyName = ''
  selectedCurrency = ''
  currentUser: User
  currentUserSubscription: Subscription
  favourForm: FormGroup
  updateForm: FormGroup
  favourList: Object

  submitted = false
  success = false
  showUpdateForm = false
  showFavourForm = false 

  constructor(
    private data: DataService,
    private authenticationService: AuthenticationService,
    private formBuilder: FormBuilder,
    private alertService: AlertService
  ) {
    this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
      this.currentUser = user   //check if the user logged in
    })
  }
  ngOnInit() {
    this.favourForm = this.formBuilder.group({
      remarks:['',Validators.required],
      favourCurrency:['EUR/USD']
    })
    this.updateForm = this.formBuilder.group({
      remarks:['',Validators.required]
    })
    //get all currency pairs existed in database
    this.data.getCurrencyName().subscribe(data=>{
      this.allCurrencyName = data
    })
    //get favourite currency list from database for the logged in user
    this.data.getFavourList(this.currentUser.login).subscribe(data=>{
      this.favourList = data
    })
  }
  onSubmit(){
    this.submitted = true
    if(this.favourForm.invalid){    return    }   //check if the form input is valid
    this.success = true
    
    //add the inputted data to database
    this.data.addToFavour(this.currentUser.login,this.favourForm.value)
      .pipe(first()).subscribe(
        data => {            
            location.reload()   //refresh the page if success
        },error => {
            this.alertService.error('The Currency pairs has been added.')
        })
  }
  //delete favourite currency pairs from database
  delete(favourCurrency: string){
    this.data.deleteFavour(this.currentUser.login,favourCurrency)
      .pipe(first()).subscribe(
        data=>{
          location.reload()   //refresh the page if success
        },error=>{
          this.alertService.error(error)
        }
      ) 
  }
  //update the remarks of specific favourite currency pair at the database
  update(favourCurrency: string){
    this.submitted = true
    if (this.updateForm.invalid) {  return   }    //check if the form input is valid
     this.data.updateFavour(this.currentUser.login,favourCurrency,this.updateForm.value)
      .pipe(first()).subscribe(
        data=>{
          location.reload()   //refresh the page if success
        },error=>{
          this.alertService.error(error)
        }
      )
  }
  //display update form when clicking 'Edit' button while hide the favour form
  displayUpdateForm(favourCurrency: string){
    this.showFavourForm = false
    this.showUpdateForm = true
    this.selectedCurrency = favourCurrency
  }
  //display favour form when clicking 'Add' button while hide the update form
  displayFavourForm(){
    this.showUpdateForm = false
    this.showFavourForm = true
  }
}