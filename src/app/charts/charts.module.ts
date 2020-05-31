import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SellPopUpComponent } from './sell-pop-up/sell-pop-up.component';
import { BuyPopUpComponent } from './buy-pop-up/buy-pop-up.component';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {ReactiveFormsModule} from '@angular/forms';
import {MatIconModule} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatIconModule
  ],
  declarations: [SellPopUpComponent, BuyPopUpComponent],
  providers: [BuyPopUpComponent, SellPopUpComponent]
})
export class ChartsModule { }
