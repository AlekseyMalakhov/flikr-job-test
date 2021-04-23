import { Component, OnInit } from '@angular/core';
import { ImageFinderService } from "../imagefinder.service";
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css']
})
export class SearchPageComponent implements OnInit {

  //private subject: Subject<string> = new Subject();

  searchText = "";
  images = [];    

  constructor(private ImageFinderService: ImageFinderService) { }

  ngOnInit(): void {
    this.ImageFinderService.currentImages.subscribe(images => this.images = images);
    this.ImageFinderService.currentSearchText.subscribe(searchText => this.searchText = searchText);

    //this.subject.pipe(debounceTime(10000)).subscribe(searchText => this.search(searchText));
  }  

  search(e) {
    this.ImageFinderService.changeSearchText(e.target.value);
  }

}
