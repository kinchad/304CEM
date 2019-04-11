import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup } from '@angular/forms'
import { DataService } from '../_services/data.service'

@Component({
  selector: 'app-forex',
  templateUrl: './forex.component.html',
  styleUrls: ['./forex.component.scss']
})
export class forexComponent implements OnInit {
  //define variables
  currency: Object
  searchForm: FormGroup
  submitted = false
  success = false

  constructor(
    private data: DataService,
    private formBuilder: FormBuilder
  ) {  }

  ngOnInit() {
    this.searchForm = this.formBuilder.group({
      searchKey:['']
    })
    this.showLatestCurrency()   //get the latest bid/ask price of all cruurency from database
  }
  onSubmit(){
    this.submitted = true
    if(this.searchForm.invalid){    return    }
    this.success = true

    let key = this.searchForm.controls.searchKey.value    //searching key

    if(key==''){    //show all if there are no input
      this.showLatestCurrency()
    }else{    //get the currency data bt name
      this.data.getCurrencyByName(key).subscribe(data=>{
        this.currency = data
      })
    }
  }
  showLatestCurrency(){   //get the latest bid&ask price of all cruurency from database
    this.data.getCurrency().subscribe(data=>{
      this.currency = data
    })
  }
}
