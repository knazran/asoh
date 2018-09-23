import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, AngularFireList, AngularFireObject, FirebaseListObservable} from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { PlanNutritionPage } from '../plan-nutrition/plan-nutrition';

/**
 * Generated class for the ChildrenNutritionPlanPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-children-nutrition-plan',
  templateUrl: 'children-nutrition-plan.html',
})
export class ChildrenNutritionPlanPage {

	static children_dummy = []
	children_list : FirebaseListObservable<any[]>

  constructor(public navCtrl: NavController, public navParams: NavParams,
  	public afDatabase: AngularFireDatabase, public afAuth: AngularFireAuth) {
  		this.children_list = afDatabase.list('/children').valueChanges()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChildrenNutritionPlanPage');
  }

  goToPlanNutritionPage(){
    this.navCtrl.push(PlanNutritionPage);
  }

}
