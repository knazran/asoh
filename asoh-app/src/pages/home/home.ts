import { Component, NgModule} from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { CoinInfoPage } from '../coin-info/coin-info'
import { CoinmarketcapProvider, CoinTickerInfo} from '../../providers/coinmarketcap/coinmarketcap'
import { Observable } from "rxjs/Rx";

import {BillionPipe} from '../../pipes/billion/billion';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  // pipes: [BillionPipe]
})


export class HomePage {
	inputcoin:string = "Bitcoin";

	coin_market_tickers : Array<CoinTickerInfo> = [];
	coin_stats : any = {
		"total_market_cap_usd" :"",
		"total_24h_volume_usd": ""
	}

  constructor(public navCtrl: NavController, public navParams: NavParams, 
  						public coinmarketcap: CoinmarketcapProvider) {

  }

  ionViewWillEnter(){
      this.GetCoinTickers().then((res) => {

      }).catch(e => {
			    console.log(e);
			});
			this.GetCoinStats().then((res) => {

      }).catch(e => {
			    console.log(e);
			});
  }

  GetCoinTickers() : Promise<any>{
		return new Promise((resolve, reject) => {
		  // let payload : Object = {"uid": "testuid", "groupid": this.group_info.groupid, "index": index}
		  this.coinmarketcap.GetTickers().subscribe(
		     data => {
		       this.coin_market_tickers = data['tickers']
		       resolve(data);
		     },
		     error => {
		       console.error("Error: Can't contact server");
		       this.coin_market_tickers = CoinmarketcapProvider.coin_market_dummy
		       reject();
		       return Observable.throw(error);
		     }
		  );
		});
	}

  GetCoinStats() : Promise<any>{
		return new Promise((resolve, reject) => {
		  // let payload : Object = {"uid": "testuid", "groupid": this.group_info.groupid, "index": index}
		  this.coinmarketcap.GetStats().subscribe(
		     data => {
		     	 console.log("Okay")
		       console.log(data);
		       this.coin_stats = data['stats']
		       resolve(data);
		     },
		     error => {
		       console.error("Error: Can't contact server");
		       // this.coin_market_tickers = CoinmarketcapProvider.coin_market_dummy
		       reject();
		       return Observable.throw(error);
		     }
		  );
		});
	}

	  /* Returns attribute coloring - move to directive? */
	getStockPerformanceColor(type: any): string {
    // console.log(type)
		if (parseInt(type) > 0) return '#32DB64'; //Green
		// if (parseInt(type) === 0) return '#FFFF66'; //Yellow
		if (parseInt(type) <= 0) return '#FF0000'; //Red	
		else {console.log('NO COLOR'); return '#32DB64'};
	}

	goToCoinInfoPage(index: number){
	  this.navCtrl.push(CoinInfoPage, {coin_info: this.coin_market_tickers[index]});
	}
}
