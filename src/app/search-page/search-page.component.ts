import { Component, OnInit } from '@angular/core';
import { ImageFinderService } from "../imagefinder.service";

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css']
})
export class SearchPageComponent implements OnInit {

  searchText = "";
  images = [];    

  constructor(private ImageFinderService: ImageFinderService) { }

  ngOnInit(): void {
    this.ImageFinderService.currentImages.subscribe(images => this.images = images);
    this.ImageFinderService.currentSearchText.subscribe(searchText => this.searchText = searchText);
  }

  search(e) {
    this.ImageFinderService.changeSearchText(e.target.value);
  }

}
