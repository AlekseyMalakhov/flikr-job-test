import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
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

  getToken() {
    const body = {
      code: this.code,
      client_id: this.clientID,
      redirect_uri: this.redirectURI,
      client_secret: "7cf15cbe-222a-462b-8c35-db5933ee4ac1",
      grant_type: "authorization_code",
    };
    const bodyJSON = JSON.stringify(body);
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        console.log(this.responseText);
      }
    };
    xhttp.open("POST", this.serverURI + "/get_token", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(bodyJSON);
  }
}
