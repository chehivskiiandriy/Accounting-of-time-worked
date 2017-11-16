import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import {Observable} from "rxjs/Observable"
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class HolidaysService {

    holidays: Observable<any[]>
    private _holidays: BehaviorSubject<any[]>;
    private dataStore: {
        holidays: any[]
    };

    constructor(private http: Http) {
        this.dataStore = { holidays: [] };
        this._holidays = <BehaviorSubject<any[]>>new BehaviorSubject([]);
        this.holidays = this._holidays.asObservable();
    }

    headers = new Headers({"Content-Type": "application/json"});
    options = new RequestOptions({ headers: this.headers });

    url = 'http://localhost:8080/';
    
    getAll() {
        this.http.get(this.url +'get_holidays')
        .map((response: Response) => response.json())
        .catch(this.handleError)
        .subscribe(data => {
            this.dataStore.holidays = data;
            this._holidays.next(Object.assign({}, this.dataStore).holidays);
          });
    }

    getFilteredbyEmployee(id) {
        let filter = [];
        filter = this.dataStore.holidays.filter((e) => e.employeeID === id); 
        return filter;
    }

    private handleError(error: any) {
        console.error('Error', error);
        return Observable.throw(error.message || error);
    }
}   