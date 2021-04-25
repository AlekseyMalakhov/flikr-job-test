import { Component, OnInit, Input } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-saved-card',
  templateUrl: './saved-card.component.html',
  styleUrls: ['./saved-card.component.css']
})
export class SavedCardComponent implements OnInit {
  @Output() removeItemEvent = new EventEmitter<any>();

  @Input() image;
  @Input() index;
  @Input() first_item;
  tags = "";

  constructor() { }

  ngOnInit(): void {
    const tagsArr = this.image.tags;
    let str = "";
    tagsArr.forEach((el, i) => {
      if (i === 0) {
        str = "#" + el;
      } else {
        str = str + " #" + el;
      }      
    });
    this.tags = str;
  }

  delete() {
    const bookmarks = localStorage.getItem("imageFinder");
    const arr = JSON.parse(bookmarks);
    arr.splice((this.first_item + this.index), 1);
    const JSONstr = JSON.stringify(arr);
    localStorage.setItem("imageFinder", JSONstr);
    this.removeItemEvent.emit();
  }

}