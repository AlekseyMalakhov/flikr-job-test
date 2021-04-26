import { Component, OnInit } from '@angular/core';
import { ImageFinderService } from "../imagefinder.service";

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  constructor(private imageFinder: ImageFinderService) { }

  searchIconColor: string = "primary";
  bookmarksIconColor: string = "basic";
  page:string = "";

  ngOnInit(): void {
    this.imageFinder.currentPage.subscribe(page => {
      this.page = page;
      if (page === "search") {
        this.searchIconColor = "primary";
        this.bookmarksIconColor = "basic";
      }
      if (page === "bookmarks") {
        this.searchIconColor = "basic";
        this.bookmarksIconColor = "primary";
      }
    });
  }

  onSearchPageSelect(): void {
    this.imageFinder.changePage("search");
  }

  onBookmarksPageSelect(): void {
    this.imageFinder.changePage("bookmarks");
  }

}
