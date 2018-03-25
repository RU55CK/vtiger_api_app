import { Injectable, Injector } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from "rxjs";
import 'rxjs/add/operator/map';
import { App } from "ionic-angular";
import { NavController } from "ionic-angular/index";
import { HomePage } from '../../pages/home/home';
import { Events } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service/auth-service';
import { Push, PushObject, PushOptions} from '@ionic-native/push';
/*
  Generated class for the TokenmanagerProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TokenmanagerProvider {
  private navCtrl : NavController;
  userDetails : any;
  token : any;
  seconds : any;
  page : any;
  timer : any;
  setint: any;
  signedcheck : any;
  responseData : any;
  user: any;
  passwordmd5 : any;
  userInfo : {'username': "", 'password' : ""}
  constructor(public http: Http, private app: App, public events : Events, private authService: AuthService,public push: Push) {
    this.navCtrl = app.getActiveNav();
    
    this.user = localStorage.getItem('user');
    
    this.passwordmd5 = localStorage.getItem('hash');
    
    const data = JSON.parse(localStorage.getItem('userData'));
    this.userDetails = data.userData;
    this.token = this.userDetails[0].expires;

    events.subscribe('timer:true', timer => {
      if(timer == true) {
        const data = JSON.parse(localStorage.getItem('userData'));
        this.userDetails = data.userData;
        this.token = this.userDetails[0].expires;
        this.setint = setInterval(() => { this.checkToken(this.token); }, 2000);
      }
    });
      
    this.setint = setInterval(() => { this.checkToken(this.token); }, 2000);
    
  }

 checkToken(token) {
    this.signedcheck = localStorage.getItem('signedin');
    var expired = true;
    this.seconds = new Date().getTime() / 1000 | 0;
    if(this.seconds > this.token && this.signedcheck == 'false') {
      this.events.publish('token:expired', expired);
      this.token = 99999999999;
      localStorage.removeItem('userData');
    
        

  } else {
    
  }
    if(this.seconds > this.token && this.signedcheck == 'true'){ 
      localStorage.removeItem('userData');
      this.authService.postDataSigned(this.user, this.passwordmd5,'login/').then((result) => {
      this.responseData = result;
      console.log(this.responseData);
      localStorage.setItem('userData', JSON.stringify(this.responseData));
      var timer = true;
      this.events.publish('timer:true', timer);
      clearInterval(this.setint);
    }, (err) => {
 
});
}
 }
}
