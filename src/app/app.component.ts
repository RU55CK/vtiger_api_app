import { Component } from '@angular/core';
import { Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AppMinimize } from '@ionic-native/app-minimize';
import { Push, PushObject, PushOptions} from '@ionic-native/push';
import { Platform, AlertController } from 'ionic-angular';
import { AuthService } from '../providers/auth-service/auth-service';
import { HomePage } from '../pages/home/home';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;
  responseData : any;
  userPostData = {"id": "","token": "", "expires": ""};
  userDetails : any;
  data : any;
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public events: Events,private appMinimize: AppMinimize,public alertCtrl:AlertController, public push: Push, public authService: AuthService) {
    
      this.rootPage = HomePage;
      
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
     // this.pushsetup();
    });
    platform.registerBackButtonAction(() => {
      this.appMinimize.minimize();
  });
  
  }
}
  