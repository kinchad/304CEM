import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private http: HttpClient) { }

  firstClick(){
    return console.log('clicked')
  }

  getCurrency(){
    return this.http.get('http://localhost:7777/getLatestCurrency')
  }
}