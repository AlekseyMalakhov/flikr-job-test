import { Component, OnInit } from '@angular/core';
import { RaindropService } from "../raindrop.service";
import { ActivatedRoute } from '@angular/router';
import { ImageFinderService } from "../imagefinder.service";
import { environment } from "../../environments/environment";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  code_url = `https://raindrop.io/oauth/authorize?client_id=${environment.clientID}&redirect_uri=${environment.redirectURI}`;
  user = {fullName: "", _id: null}

  constructor(private raindrop: RaindropService, private route: ActivatedRoute, private imageFinder: ImageFinderService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params.code) {
        this.raindrop.changeAuthCode(params.code);
      }
    });
    this.raindrop.currentUser.subscribe(user => this.user = user);
  }

  logout() {
    this.raindrop.logout();
  }

  onSearchPageSelect(): void {
    this.imageFinder.changePage("search");
  }

  onBookmarksPageSelect(): void {
    this.imageFinder.changePage("bookmarks");
  }

}
