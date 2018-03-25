import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service/auth-service';
/**
 * Generated class for the DetContactPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-det-contact',
  templateUrl: 'det-contact.html',
})
export class DetContactPage {
  
  ContactSet : any;
  responseData : any;
  userPostData = {"id": "","token": "", "expires": ""};
  userDetails: any;
  hideElement: boolean;
  hideElement1: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams,public atrCtrl: AlertController,public authService: AuthService) {
    this.ContactSet = navParams.get('contactarray');
    this.hideElement1 = true;
    const data = JSON.parse(localStorage.getItem('userData'));
    this.userDetails = data.userData;
    this.userPostData.id = this.userDetails[0].id;
    this.userPostData.token = this.userDetails[0].token;
    this.userPostData.expires = this.userDetails[0].expires;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetContactPage');
  }
  showContactDelAlert() {
    let alertConfirm = this.atrCtrl.create({
      title: 'Delete contact',
      message: 'Are you sure to delete this contact?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            console.log('No clicked');
          }
        },
        {
          text: 'Yes',
          handler: () => {
            console.log('Yes clicked');
            this.deleteContact();
          }
        }
      ]
    });
    alertConfirm.present();
  }
  btnclick() {
    this.hideElement = true;
    this.hideElement1 = false;
  }
  editData() {
    this.authService.EditData(this.userPostData, this.ContactSet, 'contacts/index.php?id=' + this.ContactSet.contactid)
    .then((result) => {
      this.navCtrl.pop();
    }, (err) => {

    });
  }

  deleteContact() {
    this.authService.deleteData(this.userPostData, 'contacts/index.php?id=' + this.ContactSet.contactid)
    .then((result) => {
      this.responseData = result;
      //if (this.responseData) {
      //  this.dataSet = this.responseData.tickets;
      //  console.log(this.responseData);
      console.log(this.responseData);
      this.navCtrl.pop();
      //} else {}
    }, (err) => {

    });
  }

}
