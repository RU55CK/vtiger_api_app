import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service/auth-service';
import { DetContactPage } from '../det-contact/det-contact';
import { DetOrgPage } from '../det-org/det-org';
import { ContorgaddPage } from '../contorgadd/contorgadd';
/**
 * Generated class for the ContactsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-contacts',
  templateUrl: 'contacts.html',
})
export class ContactsPage {

  userDetails : any;
  responseData : any;
  orgresponseData :any;
  ContactSet : any;
  OrgSet: any;
  userPostData = {"id": "","token": "", "expires": ""};

  constructor(public navCtrl: NavController, public navParams: NavParams, public authService:AuthService) {
    
  
  }

  ionViewDidEnter() {

    this.getContacts();
    this.getOrganisation();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContactsPage');
  }

  getContacts() {
    this.sendData();
    this.authService.getData(this.userPostData, 'contacts/')
    .then((result) => {
      this.responseData = result;
      if (this.responseData.contacts) {
        this.ContactSet = this.responseData.contacts;
        console.log(this.ContactSet);
      } else {}
    }, (err) => {

    });
  }
  detcontact($event: any, i) {
    this.navCtrl.push(DetContactPage, {contactarray:this.ContactSet[i]});
  }
  detorganisation($event1: any, y) {
    this.navCtrl.push(DetOrgPage, {orgarray:this.OrgSet[y]})
  }
  openContactAddPage() {
    this.navCtrl.push(ContorgaddPage);
  }
  getOrganisation() {
    this.sendData();
    this.authService.getData(this.userPostData, 'org/')
    .then((result1) => {
      this.orgresponseData = result1;
      //if (this.orgresponseData.organisations) {
        this.OrgSet = this.orgresponseData.organisations;
        console.log('Organisation:' + this.OrgSet);
     // } else {}
    }, (err) => {

    });
  }
  sendData() {
    const data = JSON.parse(localStorage.getItem('userData'));
    this.userDetails = data.userData;
    this.userPostData.id = this.userDetails[0].id;
    this.userPostData.token = this.userDetails[0].token;
    this.userPostData.expires = this.userDetails[0].expires;
  }
}
