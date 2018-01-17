import { Injectable } from "@angular/core";

import { Observable } from "rxjs/Observable";


import "rxjs/add/observable/of";
import "rxjs/add/operator/do";
import "rxjs/add/operator/delay";

@Injectable()
export class AuthService {
    isLoggedIn: boolean = false;

    redirectUrl: string;

    login(password: string): Observable<boolean> {
        return Observable   
            .of(true)       
            .delay(1000)    
            .do(val => {    
                if (password == "12345")
                    this.isLoggedIn = true;
                    return this.isLoggedIn;
            });
    }

    logout(): void {
        this.isLoggedIn = false;
    }
}
