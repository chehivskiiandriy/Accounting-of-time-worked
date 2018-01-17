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

    success = undefined;

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

    create(hooky, fullName, subdivision) {
        this.success = undefined;
        hooky.dayHooky = hooky.dayHooky._d.getFullYear() + "-" + this.pad(hooky.dayHooky._d.getMonth() + 1) + "-" + this.pad(hooky.dayHooky._d.getDate());
        
        let employeeID = hooky.employeeID;
        let dayHooky = hooky.dayHooky;
        
        this.http.post(this.url + 'create_hooky', JSON.stringify(hooky), this.options)
        .map((response: Response) => response.json())
        .catch(this.handleError)
        .subscribe(data => {
            console.log(data);
            data.success = JSON.parse(data.success);
            this.success = data.success;
            if(data.success) { 
                this.dataStore.hookies.unshift({id: data.id, employeeID: employeeID, dayHooky: dayHooky, fullName: fullName, subdivision: subdivision});
                console.log(this.dataStore.hookies);
                this._hookies.next(Object.assign({}, this.dataStore).hookies);
            }
          });
    }

    update(hooky) {
        this.success = undefined;
        hooky.dayHooky = hooky.dayHooky._d.getFullYear() + "-" + this.pad(hooky.dayHooky._d.getMonth() + 1) + "-" + this.pad(hooky.dayHooky._d.getDate());
        
        let updateHooky = hooky;
        console.log(updateHooky);
        
        this.http.put(this.url + 'edit_hooky', JSON.stringify(hooky), this.options)
        .map(response => response.json())
        .catch(this.handleError)
        .subscribe(data => {
            console.log(data);
            data.success = JSON.parse(data.success);
            this.success = data.success;
            if(data.success) { 
                this.dataStore.hookies.forEach((t, i) => {
                    if (t.id === updateHooky.id) { this.dataStore.hookies[i] = updateHooky; }
                });
                this._hookies.next(Object.assign({}, this.dataStore).hookies);
            }
        });
    }

    delete(hooky) {
        this.success = undefined;

        this.http.delete(this.url + 'delete_hooky', new RequestOptions({
            headers: this.headers,
            body: JSON.stringify(hooky)
         }))
         .map((response: Response) => response.json())
         .catch(this.handleError)
         .subscribe(
            data => {
                console.log(data);
                data.success = JSON.parse(data.success);
                this.success = data.success;
                if(data.success) { 
                    this.dataStore.hookies = this.dataStore.hookies.filter(hookies => hookies !== hooky);
                    this._hookies.next(Object.assign({}, this.dataStore).hookies);
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