import { Component, OnInit, Input } from '@angular/core';
import { RaindropService } from "../raindrop.service";

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  @Input() image;
  tags = [];
  tagsString = "";
  tag = "";
  collID = 0;
  user = {fullName: "", _id: null}

  constructor(private raindrop: RaindropService) { }

  ngOnInit(): void {
    this.raindrop.currentCollID.subscribe(id => this.collID = id);
    this.raindrop.currentUser.subscribe(user => this.user = user);
  }

  addTag(e) {
    this.tag = e.target.value;
    if (e.key === "Enter" && this.tag !== "") {
      this.tags.push(this.tag);
      this.tag = "";
      this.createTagsString();
    }
  }

  createTagsString() {
    let str = "";
    this.tags.forEach((el, i) => {
      if (i === 0) {
        str = "#" + el;
      } else {
        str = str + " #" + el;
      }      
    });
    this.tagsString = str;
  }

  addBookmark() {
    const imageObj = {
      link: this.image.url,
      title: this.image.title,
      tags: this.tags,
      type: "image",
      collection: {
        $id: this.collID,
      },
    }
    const JSONstr = JSON.stringify(imageObj);
    this.raindrop.createBookmark(JSONstr);
  }

}
