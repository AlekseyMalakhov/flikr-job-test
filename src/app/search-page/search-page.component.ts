import { Component, OnInit } from '@angular/core';
import { ImageFinderService } from "../imagefinder.service";

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css']
})
export class SearchPageComponent implements OnInit {

images = [
    {
      name: "some place",
      description: "#superplace",
      img: "1.jpg",
    },
    {
      name: "some place",
      description: "#superplace",
      img: "2.jpg",
    },
    {
      name: "some place",
      description: "#superplace",
      img: "3.jpg",
    },
    {
      name: "some place",
      description: "#superplace",
      img: "3.jpg",
    },
    {
      name: "some place",
      description: "#superplace",
      img: "1.jpg",
    },
    {
      name: "some place",
      description: "#superplace",
      img: "2.jpg",
    },
    {
      name: "some place",
      description: "#superplace",
      img: "1.jpg",
    },
    {
      name: "some place",
      description: "#superplace",
      img: "2.jpg",
    }
  ];

  constructor(private ImageFinderService: ImageFinderService) { }

  ngOnInit(): void {
  }

  search(e) {
    console.log(e.target.value);
    this.ImageFinderService.changeSearchText(e.target.value);
  }

}
