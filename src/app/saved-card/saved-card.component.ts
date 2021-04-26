import { Component, OnInit, Input } from '@angular/core';
import { RaindropService } from "../raindrop.service";

@Component({
  selector: 'app-saved-card',
  templateUrl: './saved-card.component.html',
  styleUrls: ['./saved-card.component.css']
})
export class SavedCardComponent implements OnInit {
  @Input() image;
  @Input() index;
  @Input() first_item;
  tags = "";

  constructor(private raindrop: RaindropService) { }

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
    this.raindrop.deleteBookmark(this.image._id);
  }

}