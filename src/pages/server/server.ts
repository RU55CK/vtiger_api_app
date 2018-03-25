import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ServerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-server',
  templateUrl: 'server.html',
})
export class ServerPage {
  storage : any;
  serverip: any;
  oldstorage : any;
  newstorage : any;
  ips : string[] = [];
  ip : string;
  lenghts : any;
  vals : any;
  temp: any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad ServerPage');
     this.storage = localStorage.getItem('server'); 
     this.storage = JSON.parse(this.storage);
    
    
  }
  chosenserver($event, item) {
    localStorage.setItem('currentsrv',$event.srcElement.innerText)
    this.navCtrl.pop();
  }
  add() {
    this.temp = this.storage;
    this.ip = 'http://' + this.ip;
    //localStorage.removeItem('server');
    //this.ips.push(this.ip);
    this.ips = this.storage;
    this.ips[this.ips.length] = this.ip;
    this.newstorage = JSON.stringify(this.ips);
    localStorage.setItem('server', this.newstorage);
    this.ip = '';
    this.ionViewDidLoad();
  }
  delete(st){
    let index = this.storage.indexOf(st);
    if(index > -1){
       this.storage.splice(index, 1); 
       localStorage.setItem("server",JSON.stringify(this.storage))
     }
 }
}
