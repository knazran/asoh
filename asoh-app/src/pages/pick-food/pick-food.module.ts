import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PickFoodPage } from './pick-food';

@NgModule({
  declarations: [
    PickFoodPage,
  ],
  imports: [
    IonicPageModule.forChild(PickFoodPage),
  ],
})
export class PickFoodPageModule {}
