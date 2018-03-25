import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetTicketPage } from './det-ticket';

@NgModule({
  declarations: [
    //DetTicketPage,
  ],
  imports: [
    IonicPageModule.forChild(DetTicketPage),
  ],
  entryComponents: [
    DetTicketPage,
  ]
})
export class DetTicketPageModule {}
