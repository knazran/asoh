import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';

import { LoginPage } from '../login/login';
import { ClinicListPage } from '../clinic-list/clinic-list';
import { ChildrenNutritionPlanPage } from '../children-nutrition-plan/children-nutrition-plan';
import { ChildrenProfilesPage } from '../children-profiles/children-profiles';

import { AngularFireAuth } from 'angularfire2/auth';
import { LoadingProvider } from '../../providers/loading/loading';
import { ClinicsProvider } from '../../providers/clinics/clinics'
import { Observable } from "rxjs/Rx";

import { Geolocation } from '@ionic-native/geolocation';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

	userData: any;
  displayName: string;
  geoLocData : any;

  constructor(public afAuth: AngularFireAuth, public navCtrl: NavController, public modalCtrl: ModalController,
            public navParam: NavParams,public loadingProvider : LoadingProvider,
            public clinicsProv : ClinicsProvider,  private geolocation: Geolocation) {

  		this.userData = this.navParam.get('res');
      this.getGeolocationData()
  		console.log('userData',this.userData);

  }

  ionViewDidLoad() {
    let currentUser = this.afAuth.auth.currentUser;
    this.userData = currentUser;
    console.log('userData',this.userData);

    if (currentUser.displayName){
      this.displayName = currentUser.displayName
      console.log('DisplayName', this.displayName)
    } else {
      // Show the first time registration modal

    }
  }

  getGeolocationData(){
    // this.loadingProvider.startLoading();
    this.geolocation.getCurrentPosition().then((resp) => {
      let geoData = {'lat': resp.coords.latitude, 'lng':resp.coords.longitude}
      this.geoLocData = geoData
      console.log(geoData)
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

  getClinics(): Promise<any>{
    let lat = String(this.geoLocData.lat);
    let long = String(this.geoLocData.lng);
    let state = "WP KUALA LUMPUR"

    this.loadingProvider.startLoading();
    return new Promise((resolve, reject) => {
      // let payload : Object = {"uid": "testuid", "groupid": this.group_info.groupid, "index": index}
      this.clinicsProv.GetNearestClinics(state,long,lat).subscribe(
         data => {
           let geoData = data.result;
           console.log('clinics data', geoData)
           resolve(geoData);
           this.loadingProvider.stopLoading();

           console.log('clinics data arr', geoData)
           this.goToNearbyClinicsView(geoData);
         },
         error => {
           console.error("Error: Can't contact server");
           reject();
           this.loadingProvider.stopLoading();
           return Observable.throw(error);
         }
      );
    });
  }

  goToNearbyClinicsView(geolocationData){
    this.navCtrl.push(ClinicListPage, {clinics_data: geolocationData});
  }

  goToChildrenNutritionPage(){
    this.navCtrl.push(ChildrenNutritionPlanPage);
  }
  
  goToChildrenProfilePage(){
    this.navCtrl.push(ChildrenProfilesPage);
  }

  
  // showClinicsView(geolocationData){
  //   let modal_args = {
  //     clinics_data : geolocationData
  //   }
  //   let comment_modal = this.modalCtrl.create(ClinicListPage, modal_args);

  //   comment_modal.onDidDismiss(comment => {
  //    console.log(comment);
  //    if (comment === ""){
  //      return;
  //    }
  //  });

  //   comment_modal.present();
  // }

  logout(){
    this.loadingProvider.startLoading();
  	this.afAuth.auth.signOut();
  	this.navCtrl.setRoot(LoginPage);
    this.loadingProvider.stopLoading();

  }

}
