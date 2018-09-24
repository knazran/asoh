import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, AngularFireList, AngularFireObject} from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { PlanNutritionPage } from '../pages/plan-nutrition/plan-nutrition';
/**
 * Generated class for the ChildrenProfilesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-children-profiles',
  templateUrl: 'children-profiles.html',
})
export class ChildrenProfilesPage {

	children_list;
  constructor(public navCtrl: NavController, public navParams: NavParams,
  			public afDatabase: AngularFireDatabase, public afAuth: AngularFireAuth) {

  	// let currentUser = this.afAuth.auth.currentUser;
   //  let userData = currentUser;
   //  let userUid = userData.uid;

  	// this.firebase_ref = '/parents'
   //  console.log(this.firebase_ref)

   //  let x_ref = this.afDatabase.list(this.firebase_ref)

   //  this.children_list = this.x_ref.snapshotChanges().map(changes => {
   //    return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
   //  });
   //  // this.items = db.list('items')
   //  console.log(this.children_list)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChildrenProfilesPage');
  }

}
