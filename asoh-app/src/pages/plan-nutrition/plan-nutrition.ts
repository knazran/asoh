import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the PlanNutritionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-plan-nutrition',
  templateUrl: 'plan-nutrition.html',
})
export class PlanNutritionPage {

	selectedCategory: string = "";
	categories_list = 
			['Cereals and cereal products', 'Starchy roots tubers and products',
       'Legumes and legume products', 'Nuts seeds and products',
       'Vegetables and vegetable products', 'Fruits and fruit products',
       'Sugars and syrups', 'Meat and meat products', 'Eggs',
       'Fish shellfish and products', 'Milk and milk products',
       'Miscellaneous', 'Beverages', 'Oils and fats',
       'Cereal based dishes', 'Meat dishes', 'Fish and seafood dishes',
       'Miscellaneous dishes', 'Franchised fastfoods chicken',
       'Franchised fastfoods burger', 'Franchised fastfoods pizza',
       'Franchised fastfoods spaghetti', 'Franchised fastfoods sandwich',
       'Franchised fastfoods miscellaneous', 'Franchised fastfoods satay',
       'Traditional Malaysian kuih rice and rice flour based',
       'Traditional Malaysian kuih wheat flour based',
       'Traditional Malaysian kuih miscellaneous']
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PlanNutritionPage');
  }

}
