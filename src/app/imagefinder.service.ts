import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from "../environments/environment";
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators'

const createImages = (data) => {
  type imageObj = {
    url: string;
    title: string;
  };
  
  const result: imageObj[] = [];
  data.photos.photo.map((el) => {
    const image = {
      url: `https://live.staticflickr.com/${el.server}/${el.id}_${el.secret}_m.jpg`,
      title: el.title,
    };
    result.push(image);
  });
  return result;
}

@Injectable({
  providedIn: 'root'
})
export class ImageFinderService {
  constructor(private http: HttpClient) { }
  
  private images = new BehaviorSubject([]);
  currentImages = this.images.asObservable();
  changeImages(newImages: string[]) {
    this.images.next(newImages);
  }  

  searchRequest(searchText) {
    const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${environment.key}&text=${searchText}&format=json&nojsoncallback=1`;
    return this.http.get(url);
  }

  private searchText = new BehaviorSubject("");
  currentSearchText = this.searchText.asObservable();
  changeSearchText(newText: string) {
    this.searchText.next(newText);
    const changeIMG = this.changeImages.bind(this);
    this.searchRequest(newText).subscribe(images => {
      const imgs = createImages(images);
      changeIMG(imgs);
    });
  }

  private page = new BehaviorSubject("search");
  currentPage = this.page.asObservable();
  changePage(newPage: string) {
    this.page.next(newPage);
  }
  
}
