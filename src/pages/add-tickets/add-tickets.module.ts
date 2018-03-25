import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddTicketsPage } from './add-tickets';

@NgModule({
  declarations: [
    //AddTicketsPage,
  ],
  imports: [
    IonicPageModule.forChild(AddTicketsPage),
  ],
})
export class AddTicketsPageModule {}
