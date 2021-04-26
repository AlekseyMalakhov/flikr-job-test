import { Component, OnInit } from '@angular/core';
import { ImageFinderService } from "../imagefinder.service";
import { RaindropService } from "../raindrop.service";
import {PageEvent} from '@angular/material/paginator';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css']
})
export class SearchPageComponent implements OnInit {
  //private subject: Subject<string> = new Subject();
  code_url = `https://raindrop.io/oauth/authorize?client_id=${this.raindrop.clientID}&redirect_uri=${this.raindrop.redirectURI}`;

  searchText = "";
  images = [];
  imagesOnPage = [];
  user = {fullName: "", _id: null}
  
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
  
  constructor(private ImageFinderService: ImageFinderService, private raindrop: RaindropService) { }

  ngOnInit(): void {
    this.ImageFinderService.currentImages.subscribe(images => {
      this.images = images;
      this.length = images.length;
      this.imagesOnPage = this.images.slice(this.first_item, this.last_item + 1);
    });
    this.ImageFinderService.currentSearchText.subscribe(searchText => this.searchText = searchText);
    this.raindrop.currentUser.subscribe(user => this.user = user);
    //this.subject.pipe(debounceTime(10000)).subscribe(searchText => this.search(searchText));
  }  

  search(e) {
    this.ImageFinderService.changeSearchText(e.target.value);
  }

  handlePageEvent(event: PageEvent) {
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

  checkScrollBar() {
    if (window.innerWidth > document.body.clientWidth) {
      return true;
    }
  }
}
