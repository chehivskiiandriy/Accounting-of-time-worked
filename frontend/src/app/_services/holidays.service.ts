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

    success = undefined;

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

    create(holiday, fullName, subdivision) {
        this.success = undefined;
        holiday.startHoliday = holiday.startHoliday._d.getFullYear() + "-" + this.pad(holiday.startHoliday._d.getMonth() + 1) + "-" + this.pad(holiday.startHoliday._d.getDate());
        holiday.finishHoliday  = holiday.finishHoliday._d.getFullYear() + "-" + this.pad(holiday.finishHoliday._d.getMonth() + 1) + "-" + this.pad(holiday.finishHoliday._d.getDate());
        
        let employeeID = holiday.employeeID;
        let startHoliday = holiday.startHoliday;
        let finishHoliday = holiday.finishHoliday;
        
        this.http.post(this.url + 'create_holiday', JSON.stringify(holiday), this.options)
        .map((response: Response) => response.json())
        .catch(this.handleError)
        .subscribe(data => {
            console.log(data);
            data.success = JSON.parse(data.success);
            this.success = data.success;
            if(data.success) { 
                this.dataStore.holidays.unshift({id: data.id, employeeID: employeeID, startHoliday: startHoliday, finishHoliday: finishHoliday, fullName: fullName, subdivision: subdivision});
                console.log(this.dataStore.holidays);
                this._holidays.next(Object.assign({}, this.dataStore).holidays);
            }
          });
    }

    update(holiday) {
        this.success = undefined;
        holiday.startHoliday = holiday.startHoliday._d.getFullYear() + "-" + this.pad(holiday.startHoliday._d.getMonth() + 1) + "-" + this.pad(holiday.startHoliday._d.getDate());
        holiday.finishHoliday  = holiday.finishHoliday._d.getFullYear() + "-" + this.pad(holiday.finishHoliday._d.getMonth() + 1) + "-" + this.pad(holiday.finishHoliday._d.getDate());
        
        let updateHoliday = holiday;
        console.log(updateHoliday);
        
        this.http.put(this.url + 'edit_holiday', JSON.stringify(holiday), this.options)
        .map(response => response.json())
        .catch(this.handleError)
        .subscribe(data => {
            console.log(data);
            data.success = JSON.parse(data.success);
            this.success = data.success;
            if(data.success) { 
                this.dataStore.holidays.forEach((t, i) => {
                    if (t.id === updateHoliday.id) { this.dataStore.holidays[i] = updateHoliday; }
                });
                this._holidays.next(Object.assign({}, this.dataStore).holidays);
            }
        });
    }

    delete(holiday) {
        this.success = undefined;

        this.http.delete(this.url + 'delete_holiday', new RequestOptions({
            headers: this.headers,
            body: JSON.stringify(holiday)
         }))
         .map((response: Response) => response.json())
         .catch(this.handleError)
         .subscribe(
            data => {
                console.log(data);
                data.success = JSON.parse(data.success);
                this.success = data.success;
                if(data.success) { 
                    this.dataStore.holidays = this.dataStore.holidays.filter(holidays => holidays !== holiday);
                    this._holidays.next(Object.assign({}, this.dataStore).holidays);
                } 
            });
    }

    private handleError(error: any) {
        console.error('Error', error);
        return Observable.throw(error.message || error);
    }

    pad(number) {
        if (number < 10) {
          return '0' + number;
        }
        return number;
      }
}   