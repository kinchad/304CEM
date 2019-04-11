//Data handling through the API Server which is connected with MySQL database.

import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { favours } from 'src/app/_models/favour'

@Injectable({  providedIn: 'root' })
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
  getFavourList(loginID: string){
    return this.http.get('http://localhost:7777/getFavourList/?loginID='+loginID)
  }
  addToFavour(loginID: string,formValue: favours){
    return this.http.post('http://localhost:7777/addToFavour/'+loginID,formValue)
  }
  deleteFavour(loginID: string, currencyName: string){
    return this.http.delete('http://localhost:7777/deleteFavour/'+loginID+'/'+currencyName)
  }
  updateFavour(loginID: string, currencyName: string,formValue: favours){
    return this.http.put('http://localhost:7777/updateFavour/'+loginID+'/'+currencyName,formValue)
  }
}