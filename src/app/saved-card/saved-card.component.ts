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
  tags = "";

  constructor() { }

  ngOnInit(): void {
  }

  delete() {
    const bookmarks = localStorage.getItem("imageFinder");
    const arr = JSON.parse(bookmarks);
    arr.splice(this.index, 1);
    const JSONstr = JSON.stringify(arr);
    localStorage.setItem("imageFinder", JSONstr);
    this.removeItemEvent.emit();
  }

}