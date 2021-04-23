import { Component, OnInit } from '@angular/core';
import { ImageFinderService } from "../imagefinder.service";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(private ImageFinderService: ImageFinderService) { }

  page:string = "";

  ngOnInit(): void {
    this.page = this.ImageFinderService.getPage();
  }

  getPage(): string {
    return this.ImageFinderService.getPage();
  }

}
