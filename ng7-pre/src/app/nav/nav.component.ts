import { Component, OnInit } from '@angular/core'
import { Subscription } from 'rxjs'
import { Router } from '@angular/router'
import { User } from '../_models/user'
import { AuthenticationService } from '../_services/authentication.service'

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  appTitle:string = 'FOREX Prediction System'
  guestMode = true    //login&logout button controller
  currentUser: User
  currentUserSubscription: Subscription

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {     //check if the user loginned
    this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
      this.currentUser = user
      if(this.currentUser){
        this.guestMode = false
      }
    })
  }
  ngOnInit() {  }

  logout() {    //user logout
    this.guestMode = true
    this.authenticationService.logout()
    this.router.navigate(['/login'])
  }
}
