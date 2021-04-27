import { Component, OnInit } from '@angular/core';
import { ImageFinderService } from "../imagefinder.service";
import { RaindropService } from "../raindrop.service";
import {PageEvent} from '@angular/material/paginator';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { environment } from "../../environments/environment";

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css']
})
export class SearchPageComponent implements OnInit {  
  code_url = `https://raindrop.io/oauth/authorize?client_id=${environment.clientID}&redirect_uri=${environment.redirectURI}`;

  private searchSub$ = new Subject<string>();
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

  debounceTime: number = 700;
 
  constructor(private imageFinder: ImageFinderService, private raindrop: RaindropService) { }

  ngOnInit(): void {
    this.imageFinder.currentImages.subscribe(images => {
      this.images = images;
      this.length = images.length;
      this.imagesOnPage = this.images.slice(this.first_item, this.last_item + 1);
    });
    this.imageFinder.currentSearchText.subscribe(searchText => this.searchText = searchText);
    this.raindrop.currentUser.subscribe(user => this.user = user);

    this.searchSub$.pipe(
      debounceTime(this.debounceTime),
      distinctUntilChanged()
    ).subscribe((searchText: string) => {
      this.searchText = searchText;
      if (this.searchText) {
        this.imageFinder.changeSearchText(this.searchText);
      }
    });
  }

  search(e) {
    this.searchSub$.next(e.target.value);
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
