import { Component } from '@angular/core';
import { IonicPage, NavController, App } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service/auth-service';
import { SettingsPage } from '../settings/settings';
import { Events } from 'ionic-angular';
import { HomePage } from '../home/home';
import { TokenmanagerProvider } from '../../providers/tokenmanager/tokenmanager';
import { ToastController } from 'ionic-angular';

/**
 * Generated class for the PagesPage tabs.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-pages',
  templateUrl: 'pages.html'
})
export class PagesPage {

  ticketsRoot = 'TicketsPage';
  contactsRoot = 'ContactsPage';
  settingsRoot = 'SettingsPage';

  responseData : any;
  //userData = 'username=test3&password=test3';
 
  constructor(public navCtrl: NavController, public events: Events, public app: App,public toastCtrl: ToastController) { 
    //const root = this.app.getRootNav();
    
    events.subscribe('token:expired', expired => {
      //this.presentToast();
      if(expired == true) {
        
        this.app.getRootNav().setRoot(HomePage);
        //this.navCtrl.push(HomePage);
        
        //this.navCtrl.push(HomePage);
        
      }
    });
  }
   
  presentToast() {
    const toast = this.toastCtrl.create({
      message: 'Token expired!',
      duration: 1000,
      position: 'bottom'
    });
  
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
  
    toast.present();
  }
}
