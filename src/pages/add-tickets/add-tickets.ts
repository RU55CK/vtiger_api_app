import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CompleterService, CompleterItem, RemoteData } from 'ng2-completer';
import { OnInit } from '@angular/core';
import { AuthService } from '../../providers/auth-service/auth-service';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';
import { FormControl, FormGroup, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { ToastController } from 'ionic-angular';
import { Http, RequestOptions, Response } from '@angular/http';
import {Headers} from '@angular/http';
import * as sha1 from 'sha1';
/**
 * Generated class for the AddTicketsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-tickets',
  templateUrl: 'add-tickets.html',
})
export class AddTicketsPage implements OnInit{

  responseData : any;
  userDetails : any;
  userPostData = {"id": "","token": "", "expires": ""};
  userData = {"title": "","contact_id": "", "parent_id": "","last_name": "","product_id": "","productname": "","groupname": "", "status": "","severity": "", "category": "","priority": "", "days": "","hours": "", "description": "","solution": "" };
  selectedColor2 : any;
  server : any;
  seconds: any;
  newtime : any;
  addticket : FormGroup;

  protected dataService: RemoteData;
  protected dataService1: RemoteData;
  protected dataService2: RemoteData;
  protected dataService3: RemoteData;

  protected selectedColor: string;
  protected ContactData : any;
  protected selectedItem : any;

  CompleterItem : any;
  searchData : any;
  
  protected onSelectedContact(selected:CompleterItem) {
    if(selected)
    this.selectedItem = selected.originalObject.contactid;
    this.userData.contact_id = this.selectedItem;
  }

  protected onSelectedUser(selected:CompleterItem) {
    if(selected)
    this.selectedItem = selected.originalObject.id;
    this.userData.last_name = this.selectedItem;
  }

  protected onSelectedOrg(selected:CompleterItem) {
    if(selected)
    this.selectedItem = selected.originalObject.accountid;
    this.userData.parent_id = this.selectedItem;
  }

  protected onSelectedProduct(selected:CompleterItem) {
    if(selected)
    this.selectedItem = selected.originalObject.productid;
    this.userData.product_id = this.selectedItem;
  }

  constructor(public navCtrl: NavController, public navParams: NavParams, public authService : AuthService,private completerService: CompleterService, private http: Http,private toastCtrl: ToastController) {

    localStorage.setItem('signedin', 'true');
    this.server       = localStorage.getItem('currentsrv');
    
    
    const data = JSON.parse(localStorage.getItem('userData'));
    this.userDetails = data.userData;
    this.userPostData.id = this.userDetails[0].id;
    this.userPostData.token = this.userDetails[0].token;
    this.userPostData.expires = this.userDetails[0].expires;

    
    
    setInterval(() => { this.dataservice() }, 1000);
  }
  dataservice() {
    
    var headers = new Headers();
    this.seconds = new Date().getTime() / 1000 | 0;
    let secret = JSON.parse(localStorage.getItem('userSecret'));
    
    this.dataService  = this.completerService.remote(this.server + 'search/contacts/index.php?q=','lastname','lastname');
    this.dataService1 = this.completerService.remote(this.server + 'search/org/index.php?q=','accountname','accountname');
    this.dataService2 = this.completerService.remote(this.server + 'search/product/index.php?q=','accountname','accountname');
    this.dataService3 = this.completerService.remote(this.server + 'search/users/index.php?q=','last_name','last_name');
    
    
    headers.set('Authorization', "Basic " +btoa(this.userDetails[0].id+':'+sha1(this.userDetails[0].token+this.seconds+secret )));
    headers.set('timestamp', this.seconds);
    
    this.dataService.headers(headers);
    this.dataService1.headers(headers);
    this.dataService2.headers(headers);
    this.dataService3.headers(headers);


  }

  
  ionViewDidLoad() {
    
  }
  
  ngOnInit() {
    
  }

  addNewTicket() {
    if(this.userData.title && this.userData.status) {
      const data = JSON.parse(localStorage.getItem('userData'));
      this.userDetails = data.userData;
      this.userPostData.id = this.userDetails[0].id;
      this.userPostData.token = this.userDetails[0].token;
      this.userPostData.expires = this.userDetails[0].expires;

      this.authService.postTicketData(this.userPostData,this.userData , 'tickets/').then((result) => {
        this.responseData = result;

        this.navCtrl.pop();
      }, (err) => {
        
      });
    } else {
      this.presentToast();
    }

    localStorage.setItem('signedin', 'false');
  }

  getContactsData() {
    this.authService.getData(this.userPostData, 'contacts/')
      .then((result) => {
        this.responseData = result;
        if (this.responseData.contacts) {
          this.ContactData = this.responseData.contacts;
        } else {}
      }, (err) => {

      });
  }
  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'Title or status is not set!',
      duration: 3000,
      position: 'bottom'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }

}
