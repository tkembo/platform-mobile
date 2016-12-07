import { Component, Input } from '@angular/core';

@Component({
  selector: 'response-card',
  templateUrl: 'card.html',
  inputs: ['response', 'index']
})
export class CardComponent {

  index: number = 0;
  response: any = {};
  offset: number = 1000;
  placeholderUser: string = "assets/images/placeholder-user.jpg";
  placeholderPhoto: string = "assets/images/placeholder-photo.jpg";
  imageUser: string = "https://www.gravatar.com/avatar/74a8d7dadabcd2ac5c45f68e5a53cedf.jpg?s=32";
  imagePhoto: string = "http://lorempixel.com/400/200/sports/1";

  constructor() {
    console.log('Card Component');
  }

  ngOnInit() {
  }

  cardSelected(event) {
    console.log('Card cardSelected');
  }

  menuSelected(event) {
    console.log('Card menuSelected');
  }
}
