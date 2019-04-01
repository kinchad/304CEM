import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../_services/authentication.service'
import { Router } from '@angular/router'

import { User } from '../_models/user';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  appTitle:string = 'FOREX';
  guestMode = true;

  currentUser: User;
  currentUserSubscription: Subscription;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) { 
    this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
      this.currentUser = user;
      //this.guestMode = false;
      if(this.currentUser){
        this.guestMode = false;
      }
    });
  }
  ngOnInit() {  }

  logout() {
    this.guestMode = true;
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
}
