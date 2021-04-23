import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageFinderService {

  constructor() { }

  searchRequest(searchText) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        console.log(this.responseText);
      }
    };
    xhttp.open("GET", `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=1602f3a321b52a9d5d58447c288352bf&text=${searchText}&format=json&nojsoncallback=1`, true);
    xhttp.send();
  }

  private searchText = new BehaviorSubject("");
  currentSearchText = this.searchText.asObservable();
  changeSearchText(newText: string) {
    this.searchText.next(newText);
    this.searchRequest(newText);
  }

  private page = new BehaviorSubject("search");
  currentPage = this.page.asObservable();
  changePage(newPage: string) {
    this.page.next(newPage);
  }
  
}
