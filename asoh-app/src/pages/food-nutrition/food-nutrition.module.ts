import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FoodNutritionPage } from './food-nutrition';

@NgModule({
  declarations: [
    FoodNutritionPage,
  ],
  imports: [
    IonicPageModule.forChild(FoodNutritionPage),
  ],
})
export class FoodNutritionPageModule {}
