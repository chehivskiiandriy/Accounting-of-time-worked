import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import {Observable} from "rxjs/Observable"
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class WorkingDaysService {

    workingDays: Observable<any[]>
    private _workingDays: BehaviorSubject<any[]>;
    private dataStore: {
        workingDays: any[]
    };

    constructor(private http: Http) {
        this.dataStore = { workingDays: [] };
        this._workingDays = <BehaviorSubject<any[]>>new BehaviorSubject([]);
        this.workingDays = this._workingDays.asObservable();
    }

    headers = new Headers({"Content-Type": "application/json"});
    options = new RequestOptions({ headers: this.headers });

    url = 'http://localhost:8080/';
    
    getAll() {
        this.http.get(this.url +'get_workingDays')
        .map((response: Response) => response.json())
        .catch(this.handleError)
        .subscribe(data => {
            this.dataStore.workingDays = data;
            this._workingDays.next(Object.assign({}, this.dataStore).workingDays);
          });
    }

    getFilteredbyEmployeeStartAndFinishDate(id, startYear, startMonth, finishYear, finishMonth) {
        let filter = [];
        filter = this.dataStore.workingDays.filter((e) => {
            return e.employeeID == id && 
            (
                (e.year == startYear && e.year == finishYear && e.month >= startMonth && e.month <= finishMonth) ||
                (startYear != finishYear && ((e.year == startYear && e.month >= startMonth) || (e.year == finishYear && e.month <= finishMonth) )) || 
                (e.year > startYear && e.year < finishYear)
            )
        }); 
        console.log(filter);
        filter.reverse();
        console.log(filter);
        return filter;
    }

    private handleError(error: any) {
        console.error('Error', error);
        return Observable.throw(error.message || error);
    }
}   