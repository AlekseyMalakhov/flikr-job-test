import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RaindropService {

  constructor() { }

  private authCode = new BehaviorSubject("");
  currentAuthCode = this.authCode.asObservable();
  changeAuthCode(newCode: string) {
    this.authCode.next(newCode);
    if (newCode) {
      this.getToken(newCode);
    }
  }

  clientID: string = "60851961a8b11bc584d527bd";
  redirectURI: string = "http://localhost:4200";
  //redirectURI: string = "https://flikr-job-test.herokuapp.com";
  serverURI: string = "http://localhost:3000";
  //serverURI: string = "https://flikr-job-test.herokuapp.com";
  token_url = "https://raindrop.io/oauth/access_token";
  access_token: string = "";

  getToken(code) {
    const body = {
      code: code,
      client_id: this.clientID,
      redirect_uri: this.redirectURI,
      client_secret: "7cf15cbe-222a-462b-8c35-db5933ee4ac1",
      grant_type: "authorization_code",
    };
    const bodyJSON = JSON.stringify(body);
    const setToken = (token) => {
      this.access_token = token;
    }        

    const xhttp = new XMLHttpRequest();  
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        const resp = JSON.parse(this.responseText);
        setToken(resp.access_token);
      }
    };
    xhttp.open("POST", this.serverURI + "/get_token", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(bodyJSON);
  }

  getCollection() {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        console.log(this.responseText);
      }
    };
    xhttp.open("GET", "https://api.raindrop.io/rest/v1/collections", true);
    xhttp.setRequestHeader("Authorization", "Bearer " + this.access_token);
    xhttp.send();
  }

  createCollection() {
    const newCollection = {title: "ImageFinder"};

    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        console.log(this.responseText);

        //Authorization: Bearer ae261404-11r4-47c0-bce3-e18a423da828

        //_id: 17793937
      }
    };
    xhttp.open("POST", "https://api.raindrop.io/rest/v1/collection", true);
    xhttp.setRequestHeader("Authorization", "Bearer " + this.access_token);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(newCollection));
  }




}
