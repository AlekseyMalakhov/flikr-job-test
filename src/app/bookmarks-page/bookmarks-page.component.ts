import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bookmarks-page',
  templateUrl: './bookmarks-page.component.html',
  styleUrls: ['./bookmarks-page.component.css']
})
export class BookmarksPageComponent implements OnInit {

  constructor() { }

  images = [];

  ngOnInit(): void {
    this.updateImages();
  }

  updateImages() {
    const imgString = localStorage.getItem("imageFinder");
    this.images = JSON.parse(imgString);
  }

}
