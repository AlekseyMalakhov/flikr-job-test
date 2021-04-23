import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input() image;
  tags = "";

  constructor() { }

  ngOnInit(): void {
  }

  addTags(e) {
    this.tags = e.target.value;
  }

  addBookmark() {
    const imageObj = {
      url: this.image,
      tags: this.tags,
    }
    const bookmarks = localStorage.getItem("imageFinder");
    let arr = [];
    if (bookmarks) {
        arr = JSON.parse(bookmarks);
    }
    arr.push(imageObj);
    const JSONstr = JSON.stringify(arr);
    localStorage.setItem("imageFinder", JSONstr);
  }

}
