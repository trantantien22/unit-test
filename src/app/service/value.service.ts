import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ValueService {
    value;
    constructor() { }
    getValue() {
        return this.value;
    }

}
