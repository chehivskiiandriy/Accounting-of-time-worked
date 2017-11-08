import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

// import { Discipline } from './../_models/discipline';
// import { Discip } from './../_models/discip';

import {Observable} from "rxjs/Observable"
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class SubdivisionService {

    subdivisions: Observable<any[]>
    private _subdivisions: BehaviorSubject<any[]>;
    private dataStore: {
        subdivisions: any[]
    };

    constructor(private http: Http) {
        this.dataStore = { subdivisions: [] };
        this._subdivisions = <BehaviorSubject<any[]>>new BehaviorSubject([]);
        this.subdivisions = this._subdivisions.asObservable();
    }

    headers = new Headers({"Content-Type": "application/json"});
    options = new RequestOptions({ headers: this.headers });

    url = 'http://localhost:8080/';
    
    getAll() {
        this.http.get(this.url +'get_subdiv').map((response: Response) => response.json()).subscribe(data => {
            this.dataStore.subdivisions = data;
            this._subdivisions.next(Object.assign({}, this.dataStore).subdivisions);
          }, error => console.log('Could not load disciplines.'));
    }

    getSub(id) {
        console.log(id);
        let name;
        this.dataStore.subdivisions.forEach(t => {
            console.log(t);
            if (t.id == id) { 
                console.log(t.name);
                name = t.name; 
            }
        });
        return name;
    }

    create(subdivision) {
        let name = subdivision.name;
        this.http.post(this.url + 'create_subdiv', JSON.stringify(subdivision), this.options)
        .map((response: Response) => response.json())
        .catch(this.handleError)
        .subscribe(data => {
            console.log(data);
            data.success = JSON.parse(data.success);
            if(data.success) { 
                this.dataStore.subdivisions.push({id: data.id, name: name});
                console.log(this.dataStore.subdivisions);
                this._subdivisions.next(Object.assign({}, this.dataStore).subdivisions);
            }
          });
    }

    update(discipline) {
        let updatediscipline = discipline;
        console.log(updatediscipline);
        this.http.put(this.url + 'edit_subdiv', JSON.stringify(discipline), this.options)
        .map(response => response.json())
        .catch(this.handleError)
        .subscribe(data => {
            console.log(data);
            data.success = JSON.parse(data.success);
            if(data.success) { 
                this.dataStore.subdivisions.forEach((t, i) => {
                    if (t.id === updatediscipline.id) { this.dataStore.subdivisions[i] = updatediscipline; }
                });
                this._subdivisions.next(Object.assign({}, this.dataStore).subdivisions);
            }
        });
    }

    delete(subdivision) {
        this.http.delete(this.url + 'delete_subdiv', new RequestOptions({
            headers: this.headers,
            body: JSON.stringify(subdivision)
         }))
         .map((response: Response) => response.json())
         .catch(this.handleError)
         .subscribe(
            data => {
                console.log(data);
                data.success = JSON.parse(data.success);
                if(data.success) { 
                    this.dataStore.subdivisions = this.dataStore.subdivisions.filter(subdivisions => subdivisions !== subdivision);
                    this._subdivisions.next(Object.assign({}, this.dataStore).subdivisions);
                } 
            });
    }

    private handleError(error: any) {
        console.error('Error', error);
        return Observable.throw(error.message || error);
    }
}   