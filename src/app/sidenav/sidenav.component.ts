import { Component, OnInit } from '@angular/core';
import { ImageFinderService } from "../imagefinder.service";

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  constructor(private ImageFinderService: ImageFinderService) { }

  ngOnInit(): void {
  }

  onSearchPageSelect(): void {
    this.ImageFinderService.changePage("search");
  }

  onBookmarksPageSelect(): void {
    this.ImageFinderService.changePage("bookmarks");
  }

}
