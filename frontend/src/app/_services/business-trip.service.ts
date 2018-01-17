import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { Observable } from "rxjs/Observable"
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class BusinessTripService {

    businessTrips: Observable<any[]>
    private _businessTrips: BehaviorSubject<any[]>;
    private dataStore: {
        businessTrips: any[]
    };

    success = undefined;

    constructor(private http: Http) {
        this.dataStore = { businessTrips: [] };
        this._businessTrips = <BehaviorSubject<any[]>>new BehaviorSubject([]);
        this.businessTrips = this._businessTrips.asObservable();
    }

    headers = new Headers({ "Content-Type": "application/json" });
    options = new RequestOptions({ headers: this.headers });

    url = 'http://localhost:8080/';

    getAll() {
        this.http.get(this.url + 'get_businessTrips')
            .map((response: Response) => response.json())
            .catch(this.handleError)
            .subscribe(data => {
                this.dataStore.businessTrips = data;
                this._businessTrips.next(Object.assign({}, this.dataStore).businessTrips);
            });
    }

    create(businessTrip, fullName, subdivision) {
        this.success = undefined;
        businessTrip.startBusinessTrip = businessTrip.startBusinessTrip._d.getFullYear() + "-" + this.pad(businessTrip.startBusinessTrip._d.getMonth() + 1) + "-" + this.pad(businessTrip.startBusinessTrip._d.getDate());
        businessTrip.finishBusinessTrip = businessTrip.finishBusinessTrip._d.getFullYear() + "-" + this.pad(businessTrip.finishBusinessTrip._d.getMonth() + 1) + "-" + this.pad(businessTrip.finishBusinessTrip._d.getDate());

        let employeeID = businessTrip.employeeID;
        let startBusinessTrip = businessTrip.startBusinessTrip;
        let finishBusinessTrip = businessTrip.finishBusinessTrip;

        this.http.post(this.url + 'create_businessTrip', JSON.stringify(businessTrip), this.options)
            .map((response: Response) => response.json())
            .catch(this.handleError)
            .subscribe(data => {
                console.log(data);
                data.success = JSON.parse(data.success);
                this.success = data.success;
                if (data.success) {
                    this.dataStore.businessTrips.unshift({ id: data.id, employeeID: employeeID, startBusinessTrip: startBusinessTrip, finishBusinessTrip: finishBusinessTrip, fullName: fullName, subdivision: subdivision });
                    console.log(this.dataStore.businessTrips);
                    this._businessTrips.next(Object.assign({}, this.dataStore).businessTrips);
                }
            });
    }

    update(businessTrip) {
        this.success = undefined;
        businessTrip.startBusinessTrip = businessTrip.startBusinessTrip._d.getFullYear() + "-" + this.pad(businessTrip.startBusinessTrip._d.getMonth() + 1) + "-" + this.pad(businessTrip.startBusinessTrip._d.getDate());
        businessTrip.finishBusinessTrip = businessTrip.finishBusinessTrip._d.getFullYear() + "-" + this.pad(businessTrip.finishBusinessTrip._d.getMonth() + 1) + "-" + this.pad(businessTrip.finishBusinessTrip._d.getDate());

        let updateBusinessTrip = businessTrip;
        console.log(updateBusinessTrip);

        this.http.put(this.url + 'edit_businessTrip', JSON.stringify(businessTrip), this.options)
            .map(response => response.json())
            .catch(this.handleError)
            .subscribe(data => {
                console.log(data);
                data.success = JSON.parse(data.success);
                this.success = data.success;
                if (data.success) {
                    this.dataStore.businessTrips.forEach((t, i) => {
                        if (t.id === updateBusinessTrip.id) { this.dataStore.businessTrips[i] = updateBusinessTrip; }
                    });
                    this._businessTrips.next(Object.assign({}, this.dataStore).businessTrips);
                }
            });
    }

    delete(businessTrip) {
        this.success = undefined;

        this.http.delete(this.url + 'delete_businessTrip', new RequestOptions({
            headers: this.headers,
            body: JSON.stringify(businessTrip)
        }))
            .map((response: Response) => response.json())
            .catch(this.handleError)
            .subscribe(
            data => {
                console.log(data);
                data.success = JSON.parse(data.success);
                this.success = data.success;
                if (data.success) {
                    this.dataStore.businessTrips = this.dataStore.businessTrips.filter(businessTrips => businessTrips !== businessTrip);
                    this._businessTrips.next(Object.assign({}, this.dataStore).businessTrips);
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