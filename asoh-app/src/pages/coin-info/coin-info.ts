import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController} from 'ionic-angular';
import { AngularFireDatabase, AngularFireList, AngularFireObject} from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

import { CommentInputPage } from '../comment-input/comment-input'
 /**
 * Generated class for the CoinInfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-coin-info',
  templateUrl: 'coin-info.html',
})
export class CoinInfoPage {

	coinInfo : any;
	coin_symbol : string;
	coin_name : string;
	coin_percent_change_24h : string;
	coin_price_usd : string;
	coin_market_cap_usd : string;
	coin_total_supply : string;
	coin_last_updated : string;

  coin_firebase_ref : string;
  commentsRef: AngularFireList<any>;
  // commentsRef: AngularFireObject<any>;
  user_comments: Observable<any[]>;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public afDatabase: AngularFireDatabase, public modalCtrl: ModalController) {
    // this.commentsRef = afDatabase.list('/btc', ref => ref.orderByChild('timestamp'));
    // this.commentsRef = afDatabase.list(this.coin_firebase_ref, ref => ref.orderByChild('timestamp'));
    // // this.user_comments = this.commentsRef.valueChanges()
    // // Use snapshotChanges().map() to store the key
    // this.user_comments = this.commentsRef.snapshotChanges().map(changes => {
    //   return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    // });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CoinInfoPage');
    this.coinInfo = this.navParams.get("coin_info")
  	console.log(this.coinInfo)

  	this.coin_symbol = this.coinInfo.symbol;
  	this.coin_name = this.coinInfo.name;
  	this.coin_percent_change_24h = this.coinInfo.percent_change_24h;
  	this.coin_price_usd = this.coinInfo.price_usd;
  	this.coin_market_cap_usd = this.coinInfo.market_cap_usd;
  	this.coin_total_supply = this.coinInfo.total_supply;
  	// this.coin_last_updated = (Date.now() - this.coinInfo.last_updated).toString();
    this.coin_last_updated = this.coinInfo.last_updated;
    this.coin_firebase_ref = '/'+ this.coin_symbol.toLowerCase()
    console.log(this.coin_firebase_ref)
    this.commentsRef = this.afDatabase.list(this.coin_firebase_ref, ref => ref.orderByChild('timestamp'));
    // this.user_comments = this.commentsRef.valueChanges()
    // Use snapshotChanges().map() to store the key
    this.user_comments = this.commentsRef.snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });

  }

  addComment(comment: string) {
    this.commentsRef.push({ comment: comment, username: "Dude", timestamp: Date.now()});
  }

  addCoinComment() {
    let modal_args = {
      coin_symbol : this.coin_symbol,
      coin_name: this.coin_name,
      coin_price_usd : this.coin_price_usd
    }
    let comment_modal = this.modalCtrl.create(CommentInputPage, modal_args);

    comment_modal.onDidDismiss(comment => {
     console.log(comment);
     if (comment === ""){
       return;
     }
     this.commentsRef.push({ comment: comment, username: "Dude", timestamp: Date.now()});
   });

    comment_modal.present();
  }
  // updateComment(key: string, newText: string) {
  //   this.commentsRef.update(key, { text: newText });
  // }
  // deleteComment(key: string) {    
  //   this.commentsRef.remove(key); 
  // }

}
