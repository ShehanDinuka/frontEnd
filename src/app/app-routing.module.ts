import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ChartsComponent} from './charts/charts.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {LoginComponent} from './login/login.component';
import {SignupComponent} from './signup/signup.component';
import {UserAddAssetsComponent} from './user-add-assets/user-add-assets.component';
import {NewUserDashBoardComponent} from './new-user-dash-board/new-user-dash-board.component';

export const routes: Routes = [

  {path: 'login', component: LoginComponent},
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'dash', component: DashboardComponent},
  {path: 'chart', component: ChartsComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'addAssets', component: UserAddAssetsComponent},
  {path: 'stocks', component: NewUserDashBoardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(
    routes,
    {enableTracing: true}
  )],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
