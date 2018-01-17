import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import {Observable} from "rxjs/Observable"
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class ReportService {

    constructor(private http: Http) { }

    headers = new Headers({"Content-Type": "application/json"});
    options = new RequestOptions({ headers: this.headers });

    url = 'http://localhost:8080/';
    
    getAll(param) {
        return this.http.get(this.url +'get_report', new RequestOptions({
            headers: this.headers,
            params: param
         }))
        .map((response: Response) => response.json())
        .catch(this.handleError);
    }

    private handleError(error: any) {
        console.error('Error', error);
        return Observable.throw(error.message || error);
    }

}   