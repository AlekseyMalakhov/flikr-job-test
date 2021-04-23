import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageFinderService {

  constructor() { }

  private page = new BehaviorSubject("search");
  currentPage = this.page.asObservable();
  changePage(newPage: string) {
    this.page.next(newPage);
  }
  
}
