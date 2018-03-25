import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { CompleterService, CompleterData, CompleterItem } from 'ng2-completer';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../../providers/auth-service/auth-service';
import { TicketsPage } from '../tickets/tickets';
import { NgModule } from '@angular/core';

/**
 * Generated class for the DetTicketPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-det-ticket',
  templateUrl: 'det-ticket.html',
})
export class DetTicketPage {

  userDetails: any;
  userPostData = {"id": "","token": "", "expires": ""};
  EditTicketData = {"title": "","contact_id": "", "parent_id": "", "product_id": "","productname": "","groupname": "", "status": "","severity": "", "category": "","priority": "", "days": "","hours": "", "description": "","solution": "" };
  responseData : any;
  TicketSet: any;
  hideElement : boolean;
  hideElement1 : boolean;
  dataService: CompleterData;
  dataService1: CompleterData;
  dataService2: CompleterData;
  dataService3: CompleterData;
  
  selectedItem : any;
  server : any;

  protected onSelectedContact(selected:CompleterItem) {
    if(selected)
    this.selectedItem = selected.originalObject.contactid;
    this.TicketSet.contact_id = this.selectedItem;
    console.log(this.selectedItem);
  }
  protected onSelectedOrg(selected:CompleterItem) {
    if(selected)
    this.selectedItem = selected.originalObject.accountid;
    this.TicketSet.parent_id = this.selectedItem;
    console.log(this.EditTicketData.parent_id);
  }
  protected onSelectedProduct(selected:CompleterItem) {
    if(selected)
    this.selectedItem = selected.originalObject.productid;
    this.TicketSet.product_id = this.selectedItem;
    console.log(this.EditTicketData.product_id);
  }

  constructor(public navCtrl: NavController, public navParams: NavParams, public atrCtrl: AlertController, public authService: AuthService,private completerService: CompleterService) {
    this.TicketSet = navParams.get('param1');
    this.server       = localStorage.getItem('currentsrv');
    this.hideElement1 = true;
    this.dataService  = completerService.remote(this.server + 'search/contacts/index.php?q=','lastname','lastname');
    this.dataService1 = completerService.remote(this.server + 'search/org/index.php?q=','accountname','accountname');
    this.dataService2 = completerService.remote(this.server + 'search/product/index.php?q=','accountname','accountname');
    this.dataService3 = completerService.remote(this.server + 'search/users/index.php?q=','last_name','last_name');
    const data = JSON.parse(localStorage.getItem('userData'));
    this.userDetails = data.userData;
    this.userPostData.id = this.userDetails[0].id;
    this.userPostData.token = this.userDetails[0].token;
    this.userPostData.expires = this.userDetails[0].expires;
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetTicketPage');
    
  }
  deleteTicket() {
    this.authService.deleteData(this.userPostData, 'tickets/index.php?id=' + this.TicketSet.ticketid)
    .then((result) => {
      this.responseData = result;
      this.navCtrl.pop();
    }, (err) => {
      
    });
  }
  btnclick() {
    this.hideElement = true;
    this.hideElement1 = false;
  }
  showDeleteAlert() {
    let alertConfirm = this.atrCtrl.create({
      title: 'Delete ticket',
      message: 'Are you sure to delete this ticket?',
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
            this.deleteTicket();
          }
        }
      ]
    });
    alertConfirm.present();
  }
  editData() {
    this.authService.EditData(this.userPostData, this.TicketSet, 'tickets/index.php?id=' + this.TicketSet.ticketid)
    .then((result) => {
      console.log(this.responseData);
      this.navCtrl.pop();
    }, (err) => {

    });
  }
}
