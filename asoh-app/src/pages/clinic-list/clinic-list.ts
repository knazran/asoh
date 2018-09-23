import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';

/**
 * Generated class for the ClinicListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-clinic-list',
  templateUrl: 'clinic-list.html',
})
export class ClinicListPage {

	clinicsList = {};

  constructor(public navCtrl: NavController, public navParams: NavParams,
  			  		public viewCtrl: ViewController) {
  	this.clinicsList = this.navParams.get('clinics_data');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ClinicListPage');
  }

  dismiss() {
     // let data = { 'comment': 'commentBox' };
     this.viewCtrl.dismiss();
   }

}
