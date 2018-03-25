import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service/auth-service';
import { DetTicketPage } from '../det-ticket/det-ticket';
import { AddTicketsPage } from '../add-tickets/add-tickets';
import { HomePage } from '../home/home';
import { TokenmanagerProvider } from '../../providers/tokenmanager/tokenmanager';
import {Events} from 'ionic-angular';
import {$WebSocket} from 'angular2-websocket/angular2-websocket';
import { LocalNotifications } from '@ionic-native/local-notifications';


/**
 * Generated class for the TicketsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tickets',
  templateUrl: 'tickets.html',
})
export class TicketsPage {
  userDetails : any;
  userSecret : any;
  responseData : any;
  TicketSet : any;
  userPostData = {"id": "","token": "", "expires": ""};
  chats = [];
  socket: any;
  key: any;
  myticket : any;
  status : any;
  constructor(public navCtrl: NavController, public app : App, public navParams: NavParams,public authService : AuthService,public tokenmanager: TokenmanagerProvider, public events : Events, private localNotifications: LocalNotifications) {
    
    this.sendtickdata();
    
   
/////////////////////////////////////


////////////////////////////////

  //   events.subscribe('token:expired', expired => {
  //   if(expired == true) {
  //    // this.navCtrl.push(HomePage);
  //    this.app.getRootNav().setRoot(HomePage);
  //   }
  // });

    //console.log(this.userDetails[0].id);
    
    //this.getTickets();
    }
    
    ionViewDidEnter() {
      
      if(localStorage.getItem('mytickets') == 'true') {
        this.status = 'My tickets'; 
      } else {
        this.status = 'All tickets';
      }
      this.getTickets();
    }


  ionViewDidLoad() {
    console.log('ionViewDidLoad TicketsPage');
    var start = true;
    this.events.publish('timer:start', start);
    
  }
  getTickets() {
      this.sendtickdata();
      this.myticket = localStorage.getItem('mytickets');
      if(this.myticket == 'true') {
        this.authService.getData(this.userPostData, 'tickets/index.php?id='+this.userPostData.id)
        .then((result) => {
          this.responseData = result;
          if (this.responseData.tickets) {
            this.TicketSet = this.responseData.tickets;
          } 
          
        }, (err) => {
  
        });
      
      } else {
      this.authService.getData(this.userPostData, 'tickets/')
        .then((result) => {
          this.responseData = result;
          if (this.responseData.tickets) {
            this.TicketSet = this.responseData.tickets;
            console.log(this.TicketSet);
          } 
          
        }, (err) => {
  
        });
      }
  }
  tick_details($event: any, i) {
    console.log(i);
    this.navCtrl.push(DetTicketPage, {param1:this.TicketSet[i]});
    console.log(this.TicketSet[i])
  }
  openAddPage() {
    this.navCtrl.push(AddTicketsPage);
  }
  sendtickdata() {
    const data = JSON.parse(localStorage.getItem('userData'));
    this.userDetails = data.userData;
    this.userPostData.id = this.userDetails[0].id;
    this.userPostData.token = this.userDetails[0].token;
    this.userPostData.expires = this.userDetails[0].expires;
    
  }
   
}