import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface User {
  fullName: string;
  _id: null;
}

@Injectable({
  providedIn: 'root'
})
export class RaindropService {
  constructor() { }

  private user = new BehaviorSubject({fullName: "", _id: null});
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
    const getColls = this.getCollections.bind(this);
    const getUser = this.getUser.bind(this);
    const setToken = (token) => {
      this.access_token = token;
    } 
    const existingToken = localStorage.getItem("raindropToken");
    if (existingToken && existingToken !== "undefined") {
      setToken(existingToken);
      getUser();
      getColls();
      return;
    }
    const body = {
      code: code,
      client_id: this.clientID,
      redirect_uri: this.redirectURI,
      client_secret: "7cf15cbe-222a-462b-8c35-db5933ee4ac1",
      grant_type: "authorization_code",
    };
    const bodyJSON = JSON.stringify(body);          
    const xhttp = new XMLHttpRequest();  
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        const resp = JSON.parse(this.responseText);
        setToken(resp.access_token);
        localStorage.setItem("raindropToken", resp.access_token);
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

  private collID = new BehaviorSubject(0);
  currentCollID = this.collID.asObservable();
  changeCollID(id: number) {
    this.collID.next(id);
  }

  checkCollections(resp) {
    const coll = resp.items.find((el) => el.title === "ImageFinder");
    if (coll) {      
      this.changeCollID(coll._id);
      this.getCollection();
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

  private images = new BehaviorSubject([]);
  currentImages = this.images.asObservable();
  changeImages(newImages: string[]) {
    this.images.next(newImages);
  }

  getCollection() {
    let id: number = 0;
    this.currentCollID.subscribe(collID => id = collID);
    const xhttp = new XMLHttpRequest();
    const setImages = this.changeImages.bind(this);
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        const images = JSON.parse(this.responseText).items;
        console.log(images);
        setImages(images);
      }
    };
    xhttp.open("GET", `https://api.raindrop.io/rest/v1/raindrops/${id}`, true);
    xhttp.setRequestHeader("Authorization", "Bearer " + this.access_token);
    xhttp.send();
  }

  createBookmark(imageObj) {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        console.log(this.responseText);
      }
    };
    xhttp.open("POST", "https://api.raindrop.io/rest/v1/raindrop", true);
    xhttp.setRequestHeader("Authorization", "Bearer " + this.access_token);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(imageObj);
  }

  deleteBookmark(imageID) {
    const update = this.getCollection.bind(this);
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        console.log(this.responseText);
        update();
      }
    };
    xhttp.open("DELETE", `https://api.raindrop.io/rest/v1/raindrop/${imageID}`, true);
    xhttp.setRequestHeader("Authorization", "Bearer " + this.access_token);
    xhttp.send();
  }

  logout() {
    this.access_token = "";
    this.changeUser({fullName: "", _id: null});
    localStorage.removeItem("raindropToken");
  }




}
