import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent} from './home/home.component';
import { forexComponent} from './forex/forex.component';
import { ContactComponent} from './contact/contact.component';
import { forecastComponent} from './forecast/forecast.component';

const routes: Routes = [
  {path:'',component: HomeComponent },
  {path: 'forex', component: forexComponent },
  {path: 'contact', component: ContactComponent },
  {path: 'forecast', component: forecastComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }