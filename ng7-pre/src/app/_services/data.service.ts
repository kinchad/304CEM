import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private http: HttpClient) { }

  getCurrency(){
    return this.http.get('http://localhost:7777/getLatestCurrency')
  }
  getCurrencyByName(currencyName: string){
    return this.http.get('http://localhost:7777/getCurrencyByName/?name='+currencyName)
  }
  getCurrencyName(){
    return this.http.get('http://localhost:7777/getCurrencyName')
  }
  getPredictResult(currencyName:string, algorithm: string, timeSeries: string){
    return this.http.get('http://localhost:7777/'+timeSeries+'Predict/?name='+currencyName+'&algorithm='+algorithm)
  }
}