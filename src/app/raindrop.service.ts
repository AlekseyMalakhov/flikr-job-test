import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface User {
  fullName: string;
}

@Injectable({
  providedIn: 'root'
})
export class RaindropService {

  constructor() { }

  private user = new BehaviorSubject({fullName: ""});
  currentUser = this.user.asObservable();
  changeUser(newUser: User) {
    this.user.next(newUser);
  }

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
    const getColls = this.getCollections.bind(this);
    const getUser = this.getUser.bind(this);
    const xhttp = new XMLHttpRequest();  
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        const resp = JSON.parse(this.responseText);
        setToken(resp.access_token);
        getUser();
        getColls();        
      }
    };
    xhttp.open("POST", this.serverURI + "/get_token", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(bodyJSON);
  }

  getUser() {
    const setUser = (res) => {
      console.log(res.user);
      this.changeUser(res.user);
    }
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        setUser(JSON.parse(this.responseText));
      }
    };
    xhttp.open("GET", "https://api.raindrop.io/rest/v1/user", true);
    xhttp.setRequestHeader("Authorization", "Bearer " + this.access_token);
    xhttp.send();
  }

  getCollections() {
    const xhttp = new XMLHttpRequest();
    const check = this.checkCollections.bind(this);
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        check(JSON.parse(this.responseText));
      }
    };
    xhttp.open("GET", "https://api.raindrop.io/rest/v1/collections", true);
    xhttp.setRequestHeader("Authorization", "Bearer " + this.access_token);
    xhttp.send();
  }

  checkCollections(resp) {
    const coll = resp.items.find((el) => el.title === "ImageFinder");
    /*
    access: {for: 632978, level: 4, root: false, draggable: true}
    author: true
    count: 0
    cover: []
    created: "2021-04-25T11:03:46.617Z"
    creatorRef: {_id: 632978, fullName: "Aleksey Malakhov", name: "aleksey-malakhov-eng"}
    description: ""
    expanded: true
    lastAction: "2021-04-25T11:03:46.617Z"
    lastUpdate: "2021-04-25T11:03:46.617Z"
    public: false
    slug: "image-finder"
    sort: 17793937
    title: "ImageFinder"
    user: {$ref: "users", $id: 632978, $db: ""}
    view: "list"
    _id: 17793937
    */
    if (coll) {
      console.log("we have it");
      this.getCollection(coll._id);
    } else {
      this.createCollection();
    }
  }

  createCollection() {
    const newCollection = {title: "ImageFinder"};
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        console.log(this.responseText);
      }
    };
    xhttp.open("POST", "https://api.raindrop.io/rest/v1/collection", true);
    xhttp.setRequestHeader("Authorization", "Bearer " + this.access_token);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(newCollection));
  }

  getCollection(collID) {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        console.log(JSON.parse(this.responseText));
      }
    };
    xhttp.open("GET", `https://api.raindrop.io/rest/v1/raindrops/${collID}`, true);
    xhttp.setRequestHeader("Authorization", "Bearer " + this.access_token);
    xhttp.send();
  }




}
