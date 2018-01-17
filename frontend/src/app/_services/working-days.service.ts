import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { Observable } from "rxjs/Observable"
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class WorkingDaysService {

    workingDays: Observable<any[]>
    private _workingDays: BehaviorSubject<any[]>;
    private dataStore: {
        workingDays: any[]
    };

    success = undefined;

    constructor(private http: Http) {
        this.dataStore = { workingDays: [] };
        this._workingDays = <BehaviorSubject<any[]>>new BehaviorSubject([]);
        this.workingDays = this._workingDays.asObservable();
    }

    headers = new Headers({ "Content-Type": "application/json" });
    options = new RequestOptions({ headers: this.headers });

    url = 'http://localhost:8080/';

    getAll() {
        this.http.get(this.url + 'get_workingDays')
            .map((response: Response) => response.json())
            .catch(this.handleError)
            .subscribe(data => {
                this.dataStore.workingDays = data;
                this._workingDays.next(Object.assign({}, this.dataStore).workingDays);
            });
    }

    create(workingDay, fullName, subdivision) {
        this.success = undefined;

        let employeeID = workingDay.employeeID;
        let year = workingDay.year;
        let month = workingDay.month;
        let actualAmountWorkDay = workingDay.actualAmountWorkDay;

        this.http.post(this.url + 'create_workingDays', JSON.stringify(workingDay), this.options)
            .map((response: Response) => response.json())
            .catch(this.handleError)
            .subscribe(data => {
                console.log(data);
                data.success = JSON.parse(data.success);
                this.success = data.success;
                if (data.success) {
                    this.dataStore.workingDays.unshift({ employeeID: employeeID, year: year, month: month, actualAmountWorkDay: actualAmountWorkDay, fullName: fullName, subdivision: subdivision });
                    console.log(this.dataStore.workingDays);
                    this._workingDays.next(Object.assign({}, this.dataStore).workingDays);
                }
            });
    }

    update(workingDay) {
        this.success = undefined;

        let updateWorkingDay = workingDay;
        console.log(updateWorkingDay);

        this.http.put(this.url + 'edit_workingDays', JSON.stringify(workingDay), this.options)
            .map(response => response.json())
            .catch(this.handleError)
            .subscribe(data => {
                console.log(data);
                data.success = JSON.parse(data.success);
                this.success = data.success;
                if (data.success) {
                    this.dataStore.workingDays.forEach((t, i) => {
                        if (t.employeeID === updateWorkingDay.employeeID && t.month === updateWorkingDay.month && t.year === updateWorkingDay.year) { this.dataStore.workingDays[i] = updateWorkingDay; }
                    });
                    this._workingDays.next(Object.assign({}, this.dataStore).workingDays);
                }
            });
    }

    delete(workingDay) {
        this.success = undefined;

        this.http.delete(this.url + 'delete_workingDays', new RequestOptions({
            headers: this.headers,
            body: JSON.stringify(workingDay)
        }))
            .map((response: Response) => response.json())
            .catch(this.handleError)
            .subscribe(
            data => {
                console.log(data);
                data.success = JSON.parse(data.success);
                this.success = data.success;
                if (data.success) {
                    this.dataStore.workingDays = this.dataStore.workingDays.filter(workingDays => workingDays !== workingDay);
                    this._workingDays.next(Object.assign({}, this.dataStore).workingDays);
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