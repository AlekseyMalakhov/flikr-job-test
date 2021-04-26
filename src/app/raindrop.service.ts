import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http'
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators'

interface User {
  fullName: string;
  _id: null;
}

const url = "https://api.raindrop.io/rest/v1";

@Injectable({
  providedIn: 'root'
})
export class RaindropService {
  constructor(private http: HttpClient) { }

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

  authHeaders;
  JSONHeaders;
  JSONAuthHeaders;

  createHttpHeaders() {
    const token = this.access_token;
    this.authHeaders = {
      headers: new HttpHeaders({
        Authorization: token,
      })
    };
    this.JSONHeaders = {
      headers: new HttpHeaders({
        Authorization: token,
      })
    };
    this.JSONAuthHeaders = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: token,
      })
    };
  }

  getToken(code) {
    const getColls = this.getCollections.bind(this);
    const getUser = this.getUser.bind(this);
    const setToken = (token) => {
      this.access_token = token;
      this.createHttpHeaders();      
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
        setToken("Bearer "+ resp.access_token);
        localStorage.setItem("raindropToken", "Bearer " + resp.access_token);    
        getUser();
        getColls();        
      }
    };
    xhttp.open("POST", this.serverURI + "/get_token", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(bodyJSON);
  }

  userRequest() {
    return this.http.get(url + "/user", this.authHeaders);
  }
  getUser() {
    this.changeUser.bind(this);
    this.userRequest().subscribe((newUser: any) => this.changeUser(newUser.user));
  }
  
  collectionRequest() {
    return this.http.get(url + "/collections", this.authHeaders);
  }
  getCollections() {
    this.checkCollections.bind(this);
    this.collectionRequest().subscribe(coll => this.checkCollections(coll));
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

  createCollrequest() {
    const newCollection = {title: "ImageFinder"};
    return this.http.post(url + "/collection", newCollection, this.JSONAuthHeaders);
  }
  createCollection() {
    this.createCollrequest().subscribe((resp: any) => {
      this.changeCollID(resp.item._id);
      this.getCollection();
    });
  }

  private images = new BehaviorSubject([]);
  currentImages = this.images.asObservable();
  changeImages(newImages: string[]) {
    this.images.next(newImages);
  }

  getCollRequest() {
    let id: number = 0;
    this.currentCollID.subscribe(collID => id = collID);
    return this.http.get(url + `/raindrops/${id}`, this.authHeaders);
  }
  getCollection() {
    this.getCollRequest().subscribe((resp: any) => {
      const images = resp.items;
      this.changeImages(images);
    });
  }

  createBookmarkRequest(imageObj) {
    return this.http.post(url + "/raindrop", imageObj, this.JSONAuthHeaders);
  }
  createBookmark(imageObj) {
    this.createBookmarkRequest(imageObj).subscribe();
  }

  // createBookmark(imageObj) {
  //   const xhttp = new XMLHttpRequest();
  //   xhttp.onreadystatechange = function() {
  //     if (this.readyState == 4 && this.status == 200) {
  //     }
  //   };
  //   xhttp.open("POST", "https://api.raindrop.io/rest/v1/raindrop", true);
  //   xhttp.setRequestHeader("Authorization", this.access_token);
  //   xhttp.setRequestHeader("Content-type", "application/json");
  //   xhttp.send(imageObj);
  // }

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
    xhttp.setRequestHeader("Authorization", this.access_token);
    xhttp.send();
  }

  logout() {
    this.access_token = "";
    this.changeUser({fullName: "", _id: null});
    localStorage.removeItem("raindropToken");
  }




}
