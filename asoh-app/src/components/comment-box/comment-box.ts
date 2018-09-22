import { Component } from '@angular/core';

/**
 * Generated class for the CommentBoxComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'comment-box',
  templateUrl: 'comment-box.html'
})
export class CommentBoxComponent {

  text: string;

  constructor() {
    console.log('Hello CommentBoxComponent Component');
    this.text = 'Hello World';
  }

}
