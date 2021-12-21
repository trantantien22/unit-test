import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { catchError, startWith } from 'rxjs/operators';
import { ValueService } from '../service/value.service';

@Component({
  selector: 'app-test-marble',
  template: `<p class="quote"><i>{{quote | async}}</i></p>
  <button (click)="getQuote()">Next quote</button>
  <p class="error" *ngIf="errorMessage">{{ errorMessage }}</p>`,
  styleUrls: ['./test-marble.component.css']
})
export class TestMarbleComponent implements OnInit {
  errorMessage;
  quote;
  constructor(private valueService: ValueService) { }

  ngOnInit(): void {
    this.getQuote();
  }
  getQuote() {
    this.errorMessage = '';
    this.quote = this.valueService.getQuote().pipe(
      startWith('...'),
      catchError((err: any) => {
        setTimeout(() => this.errorMessage = err.message || err.toString(), 1000);
        return of('...');
      })
    );
  }

}
