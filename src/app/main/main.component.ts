import { Component, OnInit } from '@angular/core';
import { ImageFinderService } from "../imagefinder.service";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(private imageFinder: ImageFinderService) { }

  page:string = "";

  ngOnInit(): void {
    this.imageFinder.currentPage.subscribe(page => this.page = page);
  }

}
