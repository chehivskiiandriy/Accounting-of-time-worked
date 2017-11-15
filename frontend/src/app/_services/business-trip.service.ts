import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import {Observable} from "rxjs/Observable"
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class BusinessTripService {

    businessTrips: Observable<any[]>
    private _businessTrips: BehaviorSubject<any[]>;
    private dataStore: {
        businessTrips: any[]
    };

    constructor(private http: Http) {
        this.dataStore = { businessTrips: [] };
        this._businessTrips = <BehaviorSubject<any[]>>new BehaviorSubject([]);
        this.businessTrips = this._businessTrips.asObservable();
    }

    headers = new Headers({"Content-Type": "application/json"});
    options = new RequestOptions({ headers: this.headers });

    url = 'http://localhost:8080/';
    
    getAll() {
        this.http.get(this.url +'get_businessTrips')
        .map((response: Response) => response.json())
        .catch(this.handleError)
        .subscribe(data => {
            this.dataStore.businessTrips = data;
            this._businessTrips.next(Object.assign({}, this.dataStore).businessTrips);
          });
    }

    private handleError(error: any) {
        console.error('Error', error);
        return Observable.throw(error.message || error);
    }
}   