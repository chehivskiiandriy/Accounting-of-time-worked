import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import {Observable} from "rxjs/Observable"
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class SickLeaveService {

    sickLeaves: Observable<any[]>
    private _sickLeaves: BehaviorSubject<any[]>;
    private dataStore: {
        sickLeaves: any[]
    };

    success = undefined;

    constructor(private http: Http) {
        this.dataStore = { sickLeaves: [] };
        this._sickLeaves = <BehaviorSubject<any[]>>new BehaviorSubject([]);
        this.sickLeaves = this._sickLeaves.asObservable();
    }

    headers = new Headers({"Content-Type": "application/json"});
    options = new RequestOptions({ headers: this.headers });

    url = 'http://localhost:8080/';
    
    getAll() {
        this.http.get(this.url +'get_sickLeaves').map((response: Response) => response.json()).subscribe(data => {
            this.dataStore.sickLeaves = data;
            this._sickLeaves.next(Object.assign({}, this.dataStore).sickLeaves);
          }, error => console.log('Could not load disciplines.'));
    }

    create(sickLeave, fullName, subdivision) {
        this.success = undefined;
        sickLeave.startDisease = sickLeave.startDisease._d.getFullYear() + "-" + this.pad(sickLeave.startDisease._d.getMonth() + 1) + "-" + this.pad(sickLeave.startDisease._d.getDate());
        sickLeave.finishDisease  = sickLeave.finishDisease._d.getFullYear() + "-" + this.pad(sickLeave.finishDisease._d.getMonth() + 1) + "-" + this.pad(sickLeave.finishDisease._d.getDate());
        
        let employeeID = sickLeave.employeeID;
        let startDisease = sickLeave.startDisease;
        let finishDisease = sickLeave.finishDisease;
        let disease = sickLeave.disease;
        
        this.http.post(this.url + 'create_sickLeaves', JSON.stringify(sickLeave), this.options)
        .map((response: Response) => response.json())
        .catch(this.handleError)
        .subscribe(data => {
            console.log(data);
            data.success = JSON.parse(data.success);
            this.success = data.success;
            if(data.success) { 
                this.dataStore.sickLeaves.unshift({id: data.id, employeeID: employeeID, startDisease: startDisease, finishDisease: finishDisease, disease: disease, fullName: fullName, subdivision: subdivision});
                console.log(this.dataStore.sickLeaves);
                this._sickLeaves.next(Object.assign({}, this.dataStore).sickLeaves);
            }
          });
    }

    update(sickLeave) {
        this.success = undefined;
        sickLeave.startDisease = sickLeave.startDisease._d.getFullYear() + "-" + this.pad(sickLeave.startDisease._d.getMonth() + 1) + "-" + this.pad(sickLeave.startDisease._d.getDate());
        sickLeave.finishDisease  = sickLeave.finishDisease._d.getFullYear() + "-" + this.pad(sickLeave.finishDisease._d.getMonth() + 1) + "-" + this.pad(sickLeave.finishDisease._d.getDate());
        
        let updateSickLeave = sickLeave;
        console.log(updateSickLeave);
        
        this.http.put(this.url + 'edit_sickLeave', JSON.stringify(sickLeave), this.options)
        .map(response => response.json())
        .catch(this.handleError)
        .subscribe(data => {
            console.log(data);
            data.success = JSON.parse(data.success);
            this.success = data.success;
            if(data.success) { 
                this.dataStore.sickLeaves.forEach((t, i) => {
                    if (t.id === updateSickLeave.id) { this.dataStore.sickLeaves[i] = updateSickLeave; }
                });
                this._sickLeaves.next(Object.assign({}, this.dataStore).sickLeaves);
            }
        });
    }

    delete(sickLeave) {
        this.success = undefined;

        this.http.delete(this.url + 'delete_sickLeaves', new RequestOptions({
            headers: this.headers,
            body: JSON.stringify(sickLeave)
         }))
         .map((response: Response) => response.json())
         .catch(this.handleError)
         .subscribe(
            data => {
                console.log(data);
                data.success = JSON.parse(data.success);
                this.success = data.success;
                if(data.success) { 
                    this.dataStore.sickLeaves = this.dataStore.sickLeaves.filter(sickLeaves => sickLeaves !== sickLeave);
                    this._sickLeaves.next(Object.assign({}, this.dataStore).sickLeaves);
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