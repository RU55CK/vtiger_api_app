import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service/auth-service';

/**
 * Generated class for the ContorgaddPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-contorgadd',
  templateUrl: 'contorgadd.html',
})

export class ContorgaddPage {
  showContact = true;
  showOrg = true;
  userDetails : any;
  responseData: any;
  userPostData : {"id": "", "token": "", "expires": ""};
  Contacts: {};
  Organisation: {"type": "", "employees": ""}
  userData1 : {};
  userData2: {};

  onSelectChange(selectedValue: any) {
    if(selectedValue == 'con') {
      this.showContact = false;
      this.showOrg = true;

      console.log(this.showContact);
    }
    if(selectedValue == 'org') {
      this.showOrg = false;
      this.showContact = true;
      console.log(this.showOrg);
    }
  }
  constructor(public navCtrl: NavController, public navParams: NavParams, public authService: AuthService) {
    this.userData1 = { "accountname": "", "department": "", "mobile": "", "fax" : "", "phone" : "", "firstname" : "", "lastname" : ""};
    this.userData2 = {"type" : "", "employees": ""};
    this.userPostData = {"id": "", "token": "", "expires": ""};
    const data = JSON.parse(localStorage.getItem('userData'));
    this.userDetails = data.userData;
    this.userPostData.id = this.userDetails[0].id;
    this.userPostData.token = this.userDetails[0].token;
    this.userPostData.expires = this.userDetails[0].expires;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContorgaddPage');
  }
  addNewCon() {
      this.authService.postTicketData(this.userPostData,this.userData1 , 'contacts/').then((result) => {
        this.responseData = result;
  
        console.log(this.responseData);
        this.navCtrl.pop();
      }, (err) => {
        // Error log
      });
    
  }
addNewOrg() {
  this.authService.postTicketData(this.userPostData,this.userData2 , 'org/').then((result) => {
    this.responseData = result;

    console.log(this.responseData);
    this.navCtrl.pop();
  }, (err) => {
    // Error log
  });
}
}
