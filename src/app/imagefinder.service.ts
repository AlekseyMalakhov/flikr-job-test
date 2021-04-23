import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImageFinderService {

  constructor() { }

  page = "search";
  getPage(): string {
    return this.page;
  }

  setPage(page: string) {
    this.page = page;
  }
}
