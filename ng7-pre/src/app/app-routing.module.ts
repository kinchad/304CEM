import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { HomeComponent} from './home/home.component'
import { forexComponent} from './forex/forex.component'
import { loginComponent} from './login/login.component'
import { forecastComponent} from './forecast/forecast.component'
import { favourComponent} from './favour/favour.component'
import { registerComponent} from './register/register.component'
import { AuthGuard } from './_guards/auth.guard'

const routes: Routes = [
  {path:'',component: HomeComponent },
  {path: 'forex', component: forexComponent },
  {path: 'login', component: loginComponent },
  {path: 'forecast', component: forecastComponent, canActivate:[AuthGuard] },
  {path: 'favour', component: favourComponent, canActivate:[AuthGuard]},
  {path: 'register', component: registerComponent },

  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }