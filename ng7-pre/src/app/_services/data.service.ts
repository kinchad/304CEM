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
}