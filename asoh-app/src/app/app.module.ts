import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { Camera } from '@ionic-native/camera';
import { File } from '@ionic-native/file';
import { FilePath } from '@ionic-native/file-path';
import { FileTransfer } from '@ionic-native/file-transfer';
import { Facebook } from '@ionic-native/facebook'
import { Geolocation } from '@ionic-native/geolocation';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { ForgetPage } from '../pages/forget/forget';
import { ClinicListPage } from '../pages/clinic-list/clinic-list';
import { ChildrenNutritionPlanPage } from '../pages/children-nutrition-plan/children-nutrition-plan';
import { ParentProfilePage } from '../pages/parent-profile/parent-profile';
import { ChildrenProfilesPage } from '../pages/children-profiles/children-profiles';
import { PlanNutritionPage } from '../pages/plan-nutrition/plan-nutrition';

//Angular Firebase Module
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { LoadingProvider } from '../providers/loading/loading';
import { ClinicsProvider } from '../providers/clinics/clinics';
import { HttpClientModule} from '@angular/common/http';
import { NutritionProvider } from '../providers/nutrition/nutrition';

export const firebaseConfig = {
  apiKey: "AIzaSyBH-IBYbSgeJ8xvSZaLKCcxuFeDt7Ij-I4",
    authDomain: "asoh-mampu.firebaseapp.com",
    databaseURL: "https://asoh-mampu.firebaseio.com",
    projectId: "asoh-mampu",
    storageBucket: "asoh-mampu.appspot.com",
    messagingSenderId: "565829672911"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    RegisterPage,
    ForgetPage,
    ClinicListPage,
    ChildrenNutritionPlanPage,
    ParentProfilePage,
    ChildrenProfilesPage,
    PlanNutritionPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    RegisterPage,
    ForgetPage,
    ClinicListPage,
    ChildrenNutritionPlanPage,
    ParentProfilePage,
    ChildrenProfilesPage,
    PlanNutritionPage
  ],
  providers: [
    StatusBar,
    Camera,
    File,
    FilePath,
    FileTransfer,
    Facebook,
    Geolocation,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    LoadingProvider,
    ClinicsProvider,
    NutritionProvider,
  ]
})
export class AppModule {}
