import { Component, Input} from '@angular/core';

/**
 * Generated class for the StockCardComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'stock-card',
  templateUrl: 'stock-card.html'
})
export class StockCardComponent {

  @Input() coin_name_in : string;
  @Input() coin_symbol_in : string;
  @Input() price_usd_in : string;
  @Input() percent_change_24h : string;
  @Input() stock_color : string;

  percent_color
  constructor() {
  	console.log(this.coin_name_in)
  	if (this.coin_name_in === undefined){
      this.coin_name_in = "Testcoin";
      this.percent_color= this.percent_change_24h
    }
  }

  ionViewDidLoad() {
    this.percent_color= this.percent_change_24h;
    // console.log(this.percent_color)
  }

}
