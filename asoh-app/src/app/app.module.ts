import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';


import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
// import { CoinInfoPage } from '../pages/coin-info/coin-info';
import { CommentInputPageModule } from '../pages/comment-input/comment-input.module'
import { CoinInfoPageModule } from '../pages/coin-info/coin-info.module';
// Components
// import { ComponentsModule } from "../components/components.module"
import { StockCardComponent } from "../components/stock-card/stock-card"
import { CommentBoxComponent } from "../components/comment-box/comment-box"

//Providers
import { CoinmarketcapProvider } from '../providers/coinmarketcap/coinmarketcap';

// import {BillionPipe} from '../pipes/billion/billion';

// Import the AF Module
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
 
 
// AF Settings
export const firebaseConfig = {
  apiKey: "AIzaSyB-vdY6GLyhkO4FHc1ukwf8ym-QSunUdGg",
    authDomain: "roi-app-3a77b.firebaseapp.com",
    databaseURL: "https://roi-app-3a77b.firebaseio.com",
    projectId: "roi-app-3a77b",
    storageBucket: "roi-app-3a77b.appspot.com",
    messagingSenderId: "343868096959"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    StockCardComponent,
    CommentBoxComponent
    // BillionPipe
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    HttpClientModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    CoinInfoPageModule,
    CommentInputPageModule,
    // ComponentsModule

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    // CommentInputPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AngularFireDatabase,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CoinmarketcapProvider
  ]
})
export class AppModule {}
