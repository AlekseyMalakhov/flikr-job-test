import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css']
})
export class SearchPageComponent implements OnInit {

  searchInput: string = "";

  constructor() { }

  ngOnInit(): void {
  }

  search(e) {
    console.log(e.target.value);
  }

}
