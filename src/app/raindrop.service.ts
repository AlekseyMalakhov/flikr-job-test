import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { environment } from "../environments/environment";
import { Observable, throwError } from 'rxjs';

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

  //token_url = "https://raindrop.io/oauth/access_token";
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
        'Content-Type':  'application/json',
      })
    };
    this.JSONAuthHeaders = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: token,
      })
    };
  }

  getTokenRequest(bodyJSON) {
    return this.http.post(environment.serverURI + "/get_token", bodyJSON, this.JSONHeaders)
  }
  getToken(code) {
    const getColls = this.getCollections.bind(this);
    const getUser = this.getUser.bind(this);
    const setToken = (token) => {
      this.access_token = token;
      this.createHttpHeaders();      
    } 
    const existingToken = localStorage.getItem("raindropToken");
    if (existingToken && existingToken !== "Bearer undefined") {
      setToken(existingToken);
      getUser();
      getColls();
      return;
    }
    const body = {
      code: code,
      client_id: environment.clientID,
      redirect_uri: environment.redirectURI,
      client_secret: "7cf15cbe-222a-462b-8c35-db5933ee4ac1",
      grant_type: "authorization_code",
    };
    this.getTokenRequest(body).subscribe((resp: any) => {
      setToken("Bearer "+ resp.access_token);
      localStorage.setItem("raindropToken", "Bearer " + resp.access_token);    
      getUser();
      getColls();
    });
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

  deleteBookmarkRequest(imageID) {
    return this.http.delete(url + `/raindrop/${imageID}`, this.authHeaders);
  }

  deleteBookmark(imageID) {
    this.deleteBookmarkRequest(imageID).subscribe(resp => this.getCollection());
  }

  logout() {
    this.access_token = "";
    this.changeUser({fullName: "", _id: null});
    localStorage.removeItem("raindropToken");
    window.location.href = "/";
  }




}
