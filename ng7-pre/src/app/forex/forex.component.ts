import { Component, OnInit } from '@angular/core';
import { DataService } from '../_services/data.service';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-forex',
  templateUrl: './forex.component.html',
  styleUrls: ['./forex.component.scss']
})
export class forexComponent implements OnInit {
  currency: Object;
  searchForm: FormGroup;
  submitted = false;
  success = false;

  constructor(
    private data: DataService,
    private formBuilder: FormBuilder
  ) {

  }

  ngOnInit() {
    this.searchForm = this.formBuilder.group({
      searchKey:['']
    })
    this.showLatestCurrency()
  }
  onSubmit(){
    this.submitted = true;
    if(this.searchForm.invalid){      return;    }
    this.success = true;

    let key = this.searchForm.controls.searchKey.value

    if(key==''){
      this.showLatestCurrency()
    }else{
      this.data.getCurrencyByName(key).subscribe(data=>{
        this.currency = data
      })
    }
  }
  showLatestCurrency(){
    this.data.getCurrency().subscribe(data=>{
      this.currency = data
    })
  }

}
