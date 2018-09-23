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
  // clinicsList = Promise<string[]>;

  constructor(public navCtrl: NavController, public navParams: NavParams,
  			  		public viewCtrl: ViewController) {
  	this.clinicsList = this.navParams.get('clinics_data');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ClinicListPage');
  }

  // getClinics(geoData): Promise<any>{
  //   let lat = String(geoLocData.lat);
  //   let long = String(geoLocData.lng);
  //   let state = "WP KUALA LUMPUR"

  //   this.loadingProvider.startLoading();
  //   return new Promise((resolve, reject) => {
  //     // let payload : Object = {"uid": "testuid", "groupid": this.group_info.groupid, "index": index}
  //     this.clinicsProv.GetNearestClinics(state,long,lat).subscribe(
  //        data => {
  //          let geoData = data.result;
  //          console.log('clinics data', geoData)
  //          resolve(geoData);
  //          this.loadingProvider.stopLoading();

  //          // HACKY SOLUTION. RETURN RESULTS AS ARRAY PLEASE
  //          // let geoDataKeys = Object.keys(geoData);
  //          // let geoDataArr = []
  //          // for (let idx of geoDataKeys) { 
  //          //     geoDataArr.push(geoData[idx]);
  //          // }
  //          console.log('clinics data arr', geoData)
  //          this.goToNearbyClinicsView(geoData);
  //        },
  //        error => {
  //          console.error("Error: Can't contact server");
  //          reject();
  //          this.loadingProvider.stopLoading();
  //          return Observable.throw(error);
  //        }
  //     );
  //   });
  // }

}
