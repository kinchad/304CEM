import { Component, OnInit } from '@angular/core'
import { DataService } from '../_services/data.service'

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.scss']
})
export class forecastComponent implements OnInit {
  //define variables and set default value
  predictResult: Object
  allCurrencyName: Object  
  currencyName = 'EUR/USD'
  algorithm = 'LinearRegression'
  timeSeries = 'sevenDay'  

  constructor(private data: DataService) { }  

  ngOnInit() {
    this.data.getCurrencyName().subscribe(data=>{
      this.allCurrencyName = data
    })
    this.showPredictResult()    //get predicted result from database
  }
  selectCurrencyName(event: any){   //select a currency pairs
    this.currencyName = event.target.value
    this.showPredictResult()
  }
  selectAlgorithm(event: any){    //select an algorithm
    this.algorithm = event.target.value
    this.showPredictResult()
  }
  selectTimeSeries(event: any){   //select a prediction time series
    this.timeSeries = event.target.value
    this.showPredictResult()
  }
  showPredictResult(){    //get predicted result from database
    this.data.getPredictResult(this.currencyName,this.algorithm,this.timeSeries).subscribe(
      data=>{
        this.predictResult = data
      },error=>{
        console.log(error)
      }
    )
  }
}
