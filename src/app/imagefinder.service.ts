import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from "../environments/environment";

const createImages = (data) => {
  const result: string[] = [];
  data.photos.photo.map((el) => {
    const url = `https://live.staticflickr.com/${el.server}/${el.id}_${el.secret}_m.jpg`
    result.push(url);
  });
  return result;
}

@Injectable({
  providedIn: 'root'
})
export class ImageFinderService {
  constructor() { }
  
  private images = new BehaviorSubject([]);
  currentImages = this.images.asObservable();
  changeImages(newImages: string[]) {
    this.images.next(newImages);
  }  

  searchRequest(searchText) {
    var xhttp = new XMLHttpRequest();
    const changeIMG = this.changeImages.bind(this);
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        const images = createImages(JSON.parse(this.responseText));
        changeIMG(images);        
      }
    };
    const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${environment.key}&text=${searchText}&format=json&nojsoncallback=1`;
    xhttp.open("GET", url, true);
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
