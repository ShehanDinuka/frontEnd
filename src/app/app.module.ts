import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {AppRoutingModule} from './app-routing.module';
import {SignupModule} from './signup/signup.module';
import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {LoginComponent} from './login/login.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {ChartsComponent} from './charts/charts.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material';
import {MatDialogModule} from '@angular/material/dialog';
import { NewUserDashBoardComponent } from './new-user-dash-board/new-user-dash-board.component';
import { UserAddAssetsComponent } from './user-add-assets/user-add-assets.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    DashboardComponent,
    ChartsComponent,
    NewUserDashBoardComponent,
    UserAddAssetsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SignupModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatIconModule,
    MatDialogModule,
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
}
