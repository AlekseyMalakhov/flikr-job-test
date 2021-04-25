import { Injectable } from '@angular/core';
import { OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RaindropService implements OnInit {

  constructor(private route: ActivatedRoute) { }

  code: string = "";

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.code = params.code;
      if (this.code) {
        this.getToken();
      }
    });
  }

  clientID: string = "60851961a8b11bc584d527bd";
  redirectURI: string = "http://localhost:4200";
  serverURI: string = "http://localhost:3000";
  //redirectURI: string = "https://flikr-job-test.herokuapp.com";
  code_url = `https://raindrop.io/oauth/authorize?client_id=${this.clientID}&redirect_uri=${this.redirectURI}`;
  token_url = "https://raindrop.io/oauth/access_token";
  access_token: string = "";

  getToken() {
    const body = {
      code: this.code,
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
        //{"access_token":"91463816-bf4d-45fc-8dc9-504be2cdca9d","refresh_token":"85498c4d-bb5e-4404-bf6b-1f37d4ddc6c1","expires":1209599973,"expires_in":1209599,"token_type":"Bearer"}
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

        //Authorization: Bearer ae261404-11r4-47c0-bce3-e18a423da828
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
