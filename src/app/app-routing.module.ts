import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChartsComponent } from './charts/charts.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  
  {path : 'login', component : LoginComponent},
  { path: '',   redirectTo: '/login', pathMatch: 'full' },
  {path : 'dash', component : DashboardComponent},
  {path : 'chart', component : ChartsComponent},
  {path: 'signup',
    component: SignupComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(
      routes,
      { enableTracing: true }
  )],
  exports: [RouterModule]
})

export class AppRoutingModule { }