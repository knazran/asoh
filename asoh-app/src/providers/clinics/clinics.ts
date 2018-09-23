import { HttpClient ,HttpHeaders, HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { Http, Response, Headers} from '@angular/http';
import { Observable } from 'rxjs/Rx'
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/finally';

/*
  Generated class for the ClinicsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ClinicsProvider {

	api_url_local : string = "http://127.0.0.1:5000/"
	api_url_gcp : string = "https://asoh-mampu.appspot.com/"

  constructor(public http: HttpClient) {
    console.log('Hello ClinicsProvider Provider');
  }

  GetNearestClinics(state:string, long:any, lat:any): Observable<any>{
    console.log("Called")
		// let args_json = JSON.stringify(loc_args);
    let api_header = new HttpHeaders({ 'Content-Type': 'application/json' });
    let params_in = new HttpParams();
    params_in = params_in.append('state', state)
    params_in = params_in.append('long', long)
    params_in = params_in.append('lat', lat)

    // CHANGE THIS
    let get_clinics_url = this.api_url_local + "getclinic"
    // let get_clinics_url = this.api_url_gcp + "getclinic"
    
    let options = {headers : api_header};
    
    return this.http.get(get_clinics_url, {
                headers: api_header,
                params : params_in,
                responseType: 'json'
        });
  }
}
