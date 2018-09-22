import { Component } from '@angular/core';
import { IonicPage, NavController, ViewController,NavParams } from 'ionic-angular';

/**
 * Generated class for the CommentInputPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-comment-input',
  templateUrl: 'comment-input.html',
})
export class CommentInputPage {

	coin_symbol;
	coin_name ;
	coin_price_usd;
	commentBox;
  constructor(public navCtrl: NavController, public navParams: NavParams,
  				public viewCtrl: ViewController	) {
  	this.coin_symbol = this.navParams.get('coin_symbol');
	this.coin_name = this.navParams.get('coin_name');
	this.coin_price_usd = this.navParams.get('coin_price_usd');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CommentInputPage');
  }
  dismiss() {
     // let data = { 'comment': 'commentBox' };
     this.viewCtrl.dismiss(this.commentBox || "");
   }
}
