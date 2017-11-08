import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

// import { Discipline } from './../_models/discipline';
// import { Discip } from './../_models/discip';

import {Observable} from "rxjs/Observable"
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class EmployeesService {

    employees: Observable<any[]>
    private _employees: BehaviorSubject<any[]>;
    private dataStore: {
        employees: any[]
    };

    constructor(private http: Http) {
        this.dataStore = { employees: [] };
        this._employees = <BehaviorSubject<any[]>>new BehaviorSubject([]);
        this.employees = this._employees.asObservable();
    }

    headers = new Headers({"Content-Type": "application/json"});
    options = new RequestOptions({ headers: this.headers });

    url = 'http://localhost:8080/';
    
    getAll() {
        this.http.get(this.url +'get_employees').map((response: Response) => response.json()).subscribe(data => {
            this.dataStore.employees = data;
            this._employees.next(Object.assign({}, this.dataStore).employees);
          }, error => console.log('Could not load disciplines.'));
    }

    create(employee, subdivisionName) {
        let surname = employee.surname;
        let name = employee.name;
        let patronymic = employee.patronymic;
        let age = employee.age;
        let subdivisionID = employee.subdivisionID;
        this.http.post(this.url + 'create_employees', JSON.stringify(employee), this.options)
        .map((response: Response) => response.json())
        .catch(this.handleError)
        .subscribe(data => {
            console.log(data);
            data.success = JSON.parse(data.success);
            if(data.success) { 
                this.dataStore.employees.push({id: data.id, surname: surname, name: name, patronymic: patronymic, age: age, subdivisionID: subdivisionID, subdivision: subdivisionName});
                console.log(this.dataStore.employees);
                this._employees.next(Object.assign({}, this.dataStore).employees);
            }
          });
    }

    update(employee, subdivisionName) {
        let updateemployee = employee;
        updateemployee.subdivision = subdivisionName;
        console.log(updateemployee);
        this.http.put(this.url + 'edit_employees', JSON.stringify(employee), this.options)
        .map(response => response.json())
        .catch(this.handleError)
        .subscribe(data => {
            console.log(data);
            data.success = JSON.parse(data.success);
            if(data.success) { 
                // this.dataStore.employees.forEach((t, i) => {
                //     if (t.id === updateemployee.id) { this.dataStore.employees[i] = updateemployee; }
                // });
                // this._employees.next(Object.assign({}, this.dataStore).employees);
            }
        });
    }

    delete(employee) {
        this.http.delete(this.url + 'delete_employees', new RequestOptions({
            headers: this.headers,
            body: JSON.stringify(employee)
         }))
         .map((response: Response) => response.json())
         .catch(this.handleError)
         .subscribe(
            data => {
                console.log(data);
                data.success = JSON.parse(data.success);
                if(data.success) { 
                    this.dataStore.employees = this.dataStore.employees.filter(employees => employees !== employee);
                    this._employees.next(Object.assign({}, this.dataStore).employees);
                } 
            });
    }

    private handleError(error: any) {
        console.error('Error', error);
        return Observable.throw(error.message || error);
    }
}   