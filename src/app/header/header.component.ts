import { Component, OnInit } from '@angular/core';
import { RaindropService } from "../raindrop.service";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  code_url = `https://raindrop.io/oauth/authorize?client_id=${this.raindrop.clientID}&redirect_uri=${this.raindrop.redirectURI}`;

  constructor(private raindrop: RaindropService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      console.log(params.code);
      if (params.code) {
        this.raindrop.changeAuthCode(params.code);
      }
    });
  }

  getCollection() {
    this.raindrop.getCollection();
  }

}
