import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service/auth-service';

/**
 * Generated class for the DetOrgPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-det-org',
  templateUrl: 'det-org.html',
})
export class DetOrgPage {

  OrgSet : any;
  userPostData = {"id": "","token": "", "expires": ""};
  userDetails: any;
  responseData : any;
  hideElement: boolean;
  hideElement1 : boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams,public atrCtrl: AlertController,public authService: AuthService) {
    this.OrgSet = navParams.get('orgarray');
    this.hideElement1 = true;
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetOrgPage');
  }
  showOrgDelAlert() {
    let alertConfirm = this.atrCtrl.create({
      title: 'Delete organisation',
      message: 'Are you sure to delete this organisation?',
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
            this.deleteOrganisation();
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

  deleteOrganisation() {
    this.sendData();
    this.authService.deleteData(this.userPostData, 'org/index.php?id=' + this.OrgSet.accountid)
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
  editData() {
    this.sendData();
    this.authService.EditData(this.userPostData, this.OrgSet, 'org/index.php?id=' + this.OrgSet.accountid)
    .then((result) => {
      this.navCtrl.pop();
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
