import { Injectable} from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import * as sha1 from 'sha1';
import {Md5} from 'ts-md5/dist/md5';


/*
  Generated class for the AuthServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

@Injectable()
export class AuthService {
userDetails : any;
signedin : any;

  constructor(public http : Http) {
    
  
  }


  postData(credentials, type) {
    return new Promise((resolve, reject) => {
      
      let apiUrl = localStorage.getItem('currentsrv');
      this.signedin = localStorage.getItem('signedin');
      let key = Md5.hashStr(credentials.password);
      var seconds = new Date().getTime() / 1000 | 0;
      let headers = new Headers({"timestamp": seconds, 'Content-Type': 'application/x-www-form-urlencoded', "secret" : credentials.secret});

      let keymd = key+credentials.username+seconds;
      let keysha1 = sha1(keymd);
      let keyfinal = credentials.username+':'+keysha1;
      
      this.http.post(apiUrl + type, keyfinal, {headers: headers})
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });

  }
  postDataSigned(username, password,type) {
    return new Promise((resolve, reject) => {
      
      let apiUrl = localStorage.getItem('currentsrv');
      this.signedin = localStorage.getItem('signedin');
      let key = password;
      var seconds = new Date().getTime() / 1000 | 0;
      let headers = new Headers({"timestamp": seconds, 'Content-Type': 'application/x-www-form-urlencoded', "secret" : "0"});
      let keymd = key+username+seconds;
      let keysha1 = sha1(keymd);
      let keyfinal = username+':'+keysha1;
      
      this.http.post(apiUrl + type, keyfinal, {headers: headers})
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });

  }

  getData(credentials, type) {
    return new Promise((resolve, reject) => {
      let apiUrl = localStorage.getItem('currentsrv');
      var seconds = new Date().getTime() / 1000 | 0;
      let secret = JSON.parse(localStorage.getItem('userSecret'));
      let key = credentials.token+seconds+secret;
      let base = btoa(credentials.id+':'+sha1(key));
      let headers = new Headers({ "Authorization": "Basic " +base, "timestamp": seconds});
      let options = new RequestOptions({ headers: headers });
      
      
      this.http.get(apiUrl + type,options)
      .subscribe(res => {
        resolve(res.json());
      }, (err) => {
        reject(err);
      });
    });
      
                      
}

deleteData(credentials, type) {
  return new Promise((resolve, reject) => {
    let apiUrl = localStorage.getItem('currentsrv');
    var seconds = new Date().getTime() / 1000 | 0;
    let secret = JSON.parse(localStorage.getItem('userSecret'));
    let key = credentials.token+seconds+secret;
    let base = btoa(credentials.id+':'+sha1(key));

    let headers = new Headers({ "Authorization": "Basic " +base, "timestamp": seconds, 'Content-Type': 'application/x-www-form-urlencoded'});
    let options = new RequestOptions({ headers: headers });
    
    this.http.delete(apiUrl + type,options)
    .subscribe(res => {
      resolve(res.json());
    }, (err) => {
      reject(err);
    });
  });                  
}

postTicketData(credentials, data, type) {
  return new Promise((resolve, reject) => {
    let apiUrl = localStorage.getItem('currentsrv');
    var seconds = new Date().getTime() / 1000 | 0;
    let secret = JSON.parse(localStorage.getItem('userSecret'));
    let key = credentials.token+seconds+secret;
    let base = btoa(credentials.id+':'+sha1(key));
    let headers = new Headers({ "Authorization": "Basic " +base, "timestamp": seconds});
    let options = new RequestOptions({ headers: headers });
    
    this.http.post(apiUrl + type,data, options)
    .subscribe(res => {
      resolve(res.json());
    }, (err) => {
      reject(err);
    });
  });
}

EditData(credentials, data, type) {
  return new Promise((resolve, reject) => {
    let apiUrl = localStorage.getItem('currentsrv');
    var seconds = new Date().getTime() / 1000 | 0;
    let secret = JSON.parse(localStorage.getItem('userSecret'));
    let key = credentials.token+seconds+secret;
    let base = btoa(credentials.id+':'+sha1(key));
    let headers = new Headers({ "Authorization": "Basic " +base, "timestamp": seconds});
    let options = new RequestOptions({ headers: headers });
    
    this.http.put(apiUrl + type,data, options)
    .subscribe(res => {
      resolve(res.json());
    }, (err) => {
      reject(err);
    });
  });
}

}