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
import {SellPopUpComponent} from './charts/sell-pop-up/sell-pop-up.component';
import {BuyPopUpComponent} from './charts/buy-pop-up/buy-pop-up.component';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material';
import {MatDialogModule} from '@angular/material/dialog';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    DashboardComponent,
    ChartsComponent,
    SellPopUpComponent,
    BuyPopUpComponent
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
    MatDialogModule
  ],
  providers: [BuyPopUpComponent, SellPopUpComponent],
  entryComponents: [BuyPopUpComponent, SellPopUpComponent],
  bootstrap: [AppComponent]
})

export class AppModule {
}
