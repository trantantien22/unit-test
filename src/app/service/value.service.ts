import { Injectable } from '@angular/core';
import { Observable, Observer, of, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
export interface Quote {
    id: number;
    quote: string;
}
@Injectable({
    providedIn: 'root'
})
export class ValueService {
    private value;
    constructor() { }
    getValue() {
        return this.value;
    }
    getQuote(): Observable<string> {
        return of(Math.random().toFixed(3));
    }

}
