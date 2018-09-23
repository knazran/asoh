import { Component } from '@angular/core';

/**
 * Generated class for the ChildrenCardComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'children-card',
  templateUrl: 'children-card.html'
})
export class ChildrenCardComponent {

  text: string;

  constructor() {
    console.log('Hello ChildrenCardComponent Component');
    this.text = 'Hello World';
  }

}
