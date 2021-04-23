import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  constructor() { }

  place = {
    name: "some place",
    description: "#superplace",
    img: "1.jpg",
  }

  ngOnInit(): void {
  }

}
