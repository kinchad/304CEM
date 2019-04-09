import { Component, OnInit } from '@angular/core';
import { DataService } from '../_services/data.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../_models/user';
import { AuthenticationService } from '../_services/authentication.service'
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { AlertService } from '../_services/alert.service';

@Component({
  selector: 'app-trader',
  templateUrl: './trader.component.html',
  styleUrls: ['./trader.component.scss']
})
export class traderComponent implements OnInit {
  allCurrencyName: Object
  buyForm: FormGroup
  orderList: Object
  currentUser: User;
  currentUserSubscription: Subscription;

  currencyName = ''
  currencyAsk = 0

  constructor(
    private data: DataService,
    private authenticationService: AuthenticationService,
    private formBuilder: FormBuilder,
    private alertService: AlertService
  ) {
    this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
      this.currentUser = user;
    });
  }

  ngOnInit() {
    this.buyForm = this.formBuilder.group({  
      currencyName:[''],
      currencyAsk:[],
      usd:[]
    })
    this.data.getCurrencyName().subscribe(data=>{
      this.allCurrencyName = data
    })
    this.data.getOrderList(this.currentUser.login).subscribe(data=>{
      this.orderList = data
    })
  }
  selectCurrencyName(event: any){
    this.currencyName = event.target.value

    this.data.getOneCurrencyAsk(this.currencyName).subscribe(data=>{
      this.currencyAsk = data[0].ask
    })    
  }
  buy(){
    this.buyForm.value.currencyName = this.currencyName
    this.buyForm.value.currencyAsk = this.currencyAsk
    this.data.buyOrder(this.currentUser.login,this.buyForm.value)
      .pipe(first()).subscribe(
        data=>{
          location.reload()
        },error=>{
          this.alertService.error(error);
        })
  }
  test(currencyName: string){
    console.log(currencyName)
    //this.getBidByName(currencyName)
  }
  getBidByOrderList(currencyName: string){
    this.data.getOneCurrencyBid(currencyName)
      .pipe(first()).subscribe(
        data=>{
          console.log(data[0].bid)
        },error=>{
          this.alertService.error(error);
        }
      )
  }
  sellOrder(currencyName: string){

  }
}
