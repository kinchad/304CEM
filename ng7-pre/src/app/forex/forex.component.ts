import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-forex',
  templateUrl: './forex.component.html',
  styleUrls: ['./forex.component.scss']
})
export class forexComponent implements OnInit {
  currency: Object;
  constructor(private data: DataService) { }

  ngOnInit() {
    this.data.getCurrency().subscribe(data=>{
      this.currency = data
      console.log(this.currency)
    })
  }

}
