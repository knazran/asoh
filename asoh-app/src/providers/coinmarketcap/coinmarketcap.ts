import { HttpClient ,HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http, Response, Headers} from '@angular/http';
import { Observable } from 'rxjs/Rx'
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/finally';
/*
  Generated class for the CoinmarketcapProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

export interface CoinTickerInfo {
	id 	: string,
  name: string,
  symbol: string,
  rank: any,
  price_usd: any,
  price_btc: any,
  last24h_volume_usd?: any,
  market_cap_usd: any,
  available_supply: any,
  total_supply: any,
  percent_change_1h: any,
  percent_change_24h: any,
  percent_change_7d: any,
  last_updated: any,
  max_supply?: any,
}

@Injectable()
export class CoinmarketcapProvider {

	api_url_local : string = "https://roi-appserver.appspot.com/api/v1.0/"
  constructor(public http: HttpClient) {
    console.log('Hello CoinmarketcapProvider Provider');
  }

  static coin_market_dummy : Array<CoinTickerInfo> = [
  	{
		"id": "bitcoin",
    "name": "Bitcoin",
    "symbol": "BTC",
    "rank": 1,
    "price_usd": 9870.23,
    "price_btc": 1.0,
    "last24h_volume_usd": 9337100000.0,
    "market_cap_usd": 166179752326,
    "available_supply": 16836462.0,
    "total_supply": 16836462.0,
    "percent_change_1h": "-0.65",
    "percent_change_24h": "-11.2",
    "percent_change_7d": "-9.38",
    "last_updated": "1517376867",
    },
    {
    	"id": "ethereum",
      "name": "Ethereum",
      "symbol": "ETH",
      "rank": "2",
      "price_usd": "1060.01",
      "price_btc": "0.108873",
      "last24h_volume_usd": "4326480000.0",
      "market_cap_usd": "103157201593",
      "available_supply": "97317197.0",
      "total_supply": "97317197.0",
      "percent_change_1h": "-0.52",
      "percent_change_24h": "-8.92",
      "percent_change_7d": "7.14",
      "last_updated": "1517376853"
    },
    {
    	"id": "ripple",
      "name": "Ripple",
      "symbol": "XRP",
      "rank": "3",
      "price_usd": "1.1021",
      "price_btc": "0.0001132",
      "last24h_volume_usd": "1472450000.0",
      "market_cap_usd": "42694409292.0",
      "available_supply": "38739142811.0",
      "total_supply": "99993093880.0",
      "percent_change_1h": "-1.02",
      "percent_change_24h": "-13.62",
      "percent_change_7d": "-18.37",
      "last_updated": "1517376841"
    }
  ]

  GetTickers(): Observable<any>{
    console.log("Called")
		// let args_json = JSON.stringify(loc_args);
    let api_header = new HttpHeaders({ 'Content-Type': 'application/json' });
    // let get_tickers_url = this.api_url_local + "/api/v1.0/getTickers"
    let get_tickers_url = "https://roi-appserver.appspot.com/api/v1.0/getTickers"
    let options = {headers : api_header};
    // return this.http.get(get_tickers_url, options) // ...using post request
    //         .map((res:Response) => {console.log("Responsed", res);res['tickers']}) // ...and calling .json() on the response to return data
    //         .catch((error:any) => Observable.throw(error.json().error || 'Server error')) //...errors if
    //         // .finally(() => {console.log("Finanlly");JSON.stringify(CoinmarketcapProvider.coin_market_dummy)});
    return this.http.get(get_tickers_url, {
                headers: api_header,
                responseType: 'json'
        });
  }

  GetStats(): Observable<any>{
    // let args_json = JSON.stringify(loc_args);
    let api_header = new HttpHeaders({ 'Content-Type': 'application/json' });
    let get_stats_url = this.api_url_local + "getStats"
    let options = {headers : api_header};
    return this.http.get(get_stats_url, {
                headers: api_header,
                responseType: 'json'
        });
  }
}
