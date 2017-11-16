import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import {Observable} from "rxjs/Observable"
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class HookyService {

    hookies: Observable<any[]>
    private _hookies: BehaviorSubject<any[]>;
    private dataStore: {
        hookies: any[]
    };

    constructor(private http: Http) {
        this.dataStore = { hookies: [] };
        this._hookies = <BehaviorSubject<any[]>>new BehaviorSubject([]);
        this.hookies = this._hookies.asObservable();
    }

    headers = new Headers({"Content-Type": "application/json"});
    options = new RequestOptions({ headers: this.headers });

    url = 'http://localhost:8080/';
    
    getAll() {
        this.http.get(this.url +'get_hooky')
        .map((response: Response) => response.json())
        .catch(this.handleError)
        .subscribe(data => {
            this.dataStore.hookies = data;
            this._hookies.next(Object.assign({}, this.dataStore).hookies);
          });
    }

    getFilteredbyEmployee(id) {
        let filter = [];
        filter = this.dataStore.hookies.filter((e) => e.employeeID === id); 
        return filter;
    }

    private handleError(error: any) {
        console.error('Error', error);
        return Observable.throw(error.message || error);
    }
}   