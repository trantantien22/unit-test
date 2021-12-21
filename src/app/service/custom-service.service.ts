import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { ValueService } from './value.service';

@Injectable({
  providedIn: 'root'
})
export class CustomServiceService {
  name: string;
  constructor(private valueService: ValueService) { }
  getValue() {
    return this.valueService.getValue();
  }
  getData() {
    return new Promise(reslove => reslove(Math.random()));
  }
  getProfile() {
    return of(Math.random());
  }

}
