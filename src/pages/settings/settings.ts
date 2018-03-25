import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,App } from 'ionic-angular';
import { HomePage } from '../home/home';

/**
 * Generated class for the SettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {
  signedin: boolean;
  signedstorage : any;
  user : any;
  myticketstorage: any;
  mytickets: boolean;
  constructor(public navCtrl: NavController, public navParams: NavParams, public app: App) {
  this.signedstorage = localStorage.getItem('signedin');
  this.myticketstorage    = localStorage.getItem('mytickets');
  this.mytickets = this.myticketstorage;
  this.signedin = this.signedstorage;
  this.user = localStorage.getItem('user');
  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }
  updateSignIn() {
  
    this.signedstorage = this.signedin;
    localStorage.setItem('signedin', this.signedstorage);
  }
  updateMyTickets() {

    this.myticketstorage = this.mytickets;
    localStorage.setItem('mytickets', this.myticketstorage);
  }
  signout() {
    localStorage.removeItem('userData');
    localStorage.removeItem('lastuser');
    localStorage.removeItem('userSecret');
    localStorage.removeItem('user');
    localStorage.removeItem('hash');
    this.app.getRootNav().setRoot(HomePage);
  }
}
