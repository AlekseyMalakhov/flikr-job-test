import { Component, OnInit } from '@angular/core';
import {PageEvent} from '@angular/material/paginator';
import { RaindropService } from "../raindrop.service";
import { environment } from "../../environments/environment";

@Component({
  selector: 'app-bookmarks-page',
  templateUrl: './bookmarks-page.component.html',
  styleUrls: ['./bookmarks-page.component.css']
})
export class BookmarksPageComponent implements OnInit {
  // MatPaginator
  pageSize = 25;  //items per page
  pageSizeOptions = [25, 50, 75, 100];
  pageIndex = 0;
  first_item: number = 0;
  last_item: number = this.pageSize - 1;

  private _length: number = 0;
  get length(): number {
      return this._length;
  }
  set length(value: number) {
      this._length = value;
  }

  constructor(private raindrop: RaindropService) { }

  images = [];
  imagesOnPage = [];
  user = {fullName: "", _id: null};
  code_url = `https://raindrop.io/oauth/authorize?client_id=${environment.clientID}&redirect_uri=${environment.redirectURI}`;

  ngOnInit(): void {
    this.raindrop.currentImages.subscribe(images => {
      this.images = images;
      this.length = this.images.length;
      this.imagesOnPage = this.images.slice(this.first_item, this.last_item + 1);
    });    
    this.raindrop.currentUser.subscribe(user => this.user = user);
    if (this.user._id) {
      this.raindrop.getCollection();
    }
  }

  handlePageEvent(event: PageEvent) {
    console.log(event);
    this.length = event.length;
    this.pageSize = event.pageSize; //items per page
    this.pageIndex = event.pageIndex;   
    if (this.pageIndex === 0) {
      this.first_item = 0;
      this.last_item = this.pageSize - 1;
    } else {
      this.first_item = this.pageSize * this.pageIndex;
      this.last_item = this.first_item + this.pageSize - 1;
    }
    this.imagesOnPage = this.images.slice(this.first_item, this.last_item + 1);    
  }

  checkBottom() {
    if (this.pageSize < this.length) {
      return true;
    } else {
      return false;
    }
  }

}
