import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { AppMinimize } from '@ionic-native/app-minimize';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { PagesPage } from '../pages/pages/pages';
import { TicketsPage } from '../pages/tickets/tickets';
import { AuthService } from '../providers/auth-service/auth-service';
import { HttpModule } from '@angular/http';
import { DetTicketPage } from '../pages/det-ticket/det-ticket';
import { AddTicketsPage } from '../pages/add-tickets/add-tickets';
import { DetOrgPage } from '../pages/det-org/det-org';
import { ContorgaddPage } from '../pages/contorgadd/contorgadd';
import { DetContactPage } from '../pages/det-contact/det-contact';
import { SettingsPage } from '../pages/settings/settings';
import { Ng2CompleterModule } from "ng2-completer";
import { TokenmanagerProvider } from '../providers/tokenmanager/tokenmanager';
import { Push, PushObject, PushOptions } from '@ionic-native/push';
import { LocalNotifications } from '@ionic-native/local-notifications';
import {ServerPage} from '../pages/server/server';
import {ContactsPage} from '../pages/contacts/contacts'
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    PagesPage,
    DetTicketPage,
    AddTicketsPage,
    DetContactPage,
    DetOrgPage,
    ContorgaddPage,
    ServerPage,
    //SettingsPage,
    //TicketsPage,
    //ContactsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    Ng2CompleterModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    PagesPage,
    DetTicketPage,
    AddTicketsPage,
    DetContactPage,
    DetOrgPage,
    ContorgaddPage,
    ServerPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthService,
    TokenmanagerProvider,
    Push, 
    LocalNotifications,
    AppMinimize
  ]
})
export class AppModule {}