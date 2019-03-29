import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  currency: Object;
  constructor(private data: DataService) { }

  ngOnInit() {
    this.data.getCurrency().subscribe(data=>{
      this.currency = data
      console.log(this.currency)
    })
  }

  firstClick(){
    this.data.firstClick();
  }
}