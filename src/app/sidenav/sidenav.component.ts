import { Component, OnInit } from '@angular/core';
import { ImageFinderService } from "../imagefinder.service";

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  constructor(private ImageFinderService: ImageFinderService) { }

  searchIconColor: string = "primary";
  bookmarksIconColor: string = "basic";


  ngOnInit(): void {
  }

  onSearchPageSelect(): void {
    this.ImageFinderService.changePage("search");
    this.searchIconColor = "primary";
    this.bookmarksIconColor = "basic";
  }

  onBookmarksPageSelect(): void {
    this.ImageFinderService.changePage("bookmarks");
    this.searchIconColor = "basic";
    this.bookmarksIconColor = "primary";
  }

}
