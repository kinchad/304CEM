import { Component, OnInit } from '@angular/core';
import { DataService } from '../_services/data.service';

import {FormsModule, ReactiveFormsModule} from '@angular/forms'

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.scss']
})
export class forecastComponent implements OnInit {
  allCurrencyName: Object
  currencyName = 'EUR/USD'  //need to fix since that can not ensure be the selected one
  algorithm = 'LinearRegression'
  timeSeries = 'sevenDay'
  predictResult: Object

  constructor(private data: DataService) { }  

  ngOnInit() {
    this.data.getCurrencyName().subscribe(data=>{
      this.allCurrencyName = data
    })
    this.showPredictResult()
  }
  selectCurrencyName(event: any){
    this.currencyName = event.target.value
    this.showPredictResult()
  }
  selectAlgorithm(event: any){
    this.algorithm = event.target.value
    this.showPredictResult()
  }
  selectTimeSeries(event: any){
    this.timeSeries = event.target.value
    this.showPredictResult()
  }
  showPredictResult(){
    this.data.getPredictResult(this.currencyName,this.algorithm,this.timeSeries).subscribe(
      data=>{
        this.predictResult = data
      },error=>{
        console.log(error)
      }
    )
  }
}
