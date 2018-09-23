import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PlanNutritionPage } from './plan-nutrition';

@NgModule({
  declarations: [
    PlanNutritionPage,
  ],
  imports: [
    IonicPageModule.forChild(PlanNutritionPage),
  ],
})
export class PlanNutritionPageModule {}
