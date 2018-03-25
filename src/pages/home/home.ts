import { Component } from '@angular/core';
import { NavController, ToastController, LoadingController } from 'ionic-angular';
import { PagesPage } from '../pages/pages';
import { AuthService } from '../../providers/auth-service/auth-service';
import { Events } from 'ionic-angular';
import {Md5} from 'ts-md5/dist/md5';
import {ServerPage} from '../server/server';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  responseData : any;
  userData = {"username": "","password": "", "secret" : ""};
  userDetails : any;
  userSecret: any;
  passwordmd5 : any;
  storage : any;
  currentsrv: any;
  lastuser : any;
  tempuser : any;
  secret : any;
  setserver : any;
  constructor(public navCtrl: NavController, public authService:AuthService, public events: Events, public toastCtrl:ToastController, public loadingCtrl: LoadingController) {
    if(localStorage.getItem('signedin') == null) {
      localStorage.setItem('signedin', 'true');
    }
  }
  ionViewDidEnter() {
    this.currentsrv = localStorage.getItem('currentsrv');
    this.lastuser   = localStorage.getItem('lastuser');
    this.tempuser   = this.lastuser;
  }
   login() {
    if(this.userData.username && this.userData.password) {
      
      if(this.lastuser == this.userData.username) {
        this.secret = 0;
        this.userData.secret = this.secret;
      } else {
        this.secret = 1;
        this.userData.secret = this.secret;
        
      }
      console.log("this.userData.secret"  + this.userData.secret);
        this.authService.postData(this.userData,'login/').then((result) => {
        this.responseData = result;
        if(this.responseData.userData != null) {
          localStorage.setItem('user',this.userData.username);
          this.passwordmd5 = Md5.hashStr(this.userData.password);
          localStorage.setItem('hash', this.passwordmd5);
          localStorage.setItem('userData', JSON.stringify(this.responseData));
          this.lastuser = localStorage.setItem('lastuser', this.userData.username);
          const data = JSON.parse(localStorage.getItem('userData'));
          this.userDetails = data.userData;
      
          if(this.userDetails[0].secret != null) {
            localStorage.setItem('userSecret', JSON.stringify(this.userDetails[0].secret));
            console.log('From login page: ' + JSON.parse(localStorage.getItem('userSecret')))
      } else {
        // nothing
          
       }
       this.presentLoadingDefault();
      setTimeout(() => { this.getToken(); }, 1000);
      setTimeout(() => { this.redirect(); }, 3000);

      } else {
        this.presentToast('Wrong username or password!');
        localStorage.setItem('lastuser', this.tempuser );
      }
      }, (err) => {
      // Error log
    });
    } else {
       this.presentToast('Give valid details!');
   }
  
  }
  getToken() {
    var timer = true;
    this.events.publish('timer:true', timer);
  }
  redirect() {
    this.navCtrl.push(PagesPage);
  }
  serverchange() {
    this.navCtrl.push(ServerPage);
  }
  presentToast(msg) {
    let toast = this.toastCtrl.create({
        message : msg,
        duration : 2000
    });
    toast.present();
  }
  presentLoadingDefault() {
    const loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
  
    loading.present();
  
    setTimeout(() => {
      loading.dismiss();
    }, 2000);
  }
}
