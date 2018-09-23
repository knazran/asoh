import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, AlertController} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AngularFireAuth } from 'angularfire2/auth';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { ClinicListPage } from '../pages/clinic-list/clinic-list';
import { ParentProfilePage } from '../pages/parent-profile/parent-profile';
import { ChildrenProfilesPage } from '../pages/children-profiles/children-profiles';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage:any = LoginPage;
  appMenuItems: Array<any>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,
    public afAuth: AngularFireAuth, public alertCtrl:AlertController) {
    this.initializeApp();
    this.appMenuItems = [
      {title: 'Home', component: HomePage, icon: 'home'},
      {title: 'Profil Anak', component: ChildrenProfilesPage, icon: 'people'},
      {title: 'Pelan Nutrisi', component: "", icon: 'restaurant'},
      {title: 'Carian Klinik', component: "", icon: 'medkit'},
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.

      //*** Control Splash Screen
      // this.splashScreen.show();
      this.splashScreen.hide();

      //*** Control Status Bar
      this.statusBar.styleDefault();
      this.statusBar.overlaysWebView(false);
      
    });
    // this.platform.ready().then(() => {
    //   // Okay, so the platform is ready and our plugins are available.
    //   // Here you can do any higher level native things you might need.
    //   statusBar.styleDefault();
    //   splashScreen.hide();
    // });

    this.afAuth.authState
      .subscribe(
        user => {
          if (user) {
            console.log(user)
            this.rootPage = HomePage;
          } else {
            this.rootPage = LoginPage;
          }
        },
        () => {
          this.rootPage = LoginPage;
        }
      );
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.push(page.component);
    // this.navCtrl.push(page.component)
  }

  editName(){
    let user = this.afAuth.auth.currentUser;
    let alert = this.alertCtrl.create({
        title: 'Kemaskini Nama',
        inputs: [
          {
            name: 'username',
            placeholder: 'Nama Pengguna'
          }
        ],
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            handler: data => {
              console.log('Cancel clicked');
            }
          },
          {
            text: 'Kemaskini',
            handler: data => {
              console.log(data['username'])
              user.updateProfile({displayName: data['username']})
            }
          }
        ]
      });
      alert.present();
  }

  logout() {
    this.nav.setRoot(LoginPage);
  }
}

