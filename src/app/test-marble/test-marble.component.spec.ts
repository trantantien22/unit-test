import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { cold, getTestScheduler } from 'jasmine-marbles';
import { Observable, of } from 'rxjs';
import { RunHelpers } from 'rxjs/internal/testing/TestScheduler';
import { filter, map } from 'rxjs/operators';
import { TestScheduler } from 'rxjs/testing';
import { ValueService } from '../service/value.service';

import { TestMarbleComponent } from './test-marble.component';

describe('TestMarbleComponent', () => {
  let component: TestMarbleComponent;
  let fixture: ComponentFixture<TestMarbleComponent>;
  let getQuoteSpy: jasmine.Spy;
  let quoteEl: HTMLElement;
  const testQuote = 'abc';
  const errorMessage = () => {
    const el = fixture.nativeElement.querySelector('.error');
    return el ? el.textContent : null;
  };

  beforeEach(async () => {
    const valueServiceMock = jasmine.createSpyObj('ValueService', ['getQuote']);
    getQuoteSpy = valueServiceMock.getQuote;

    await TestBed.configureTestingModule({
      declarations: [TestMarbleComponent],
      providers: [
        { provide: ValueService, useValue: valueServiceMock }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestMarbleComponent);
    component = fixture.componentInstance;
    getQuoteSpy.and.returnValue(of('def'));

    fixture.detectChanges();
    getTestScheduler().flush();
    quoteEl = fixture.nativeElement.querySelector('.quote');
  });

  it('should create', fakeAsync(() => {
    expect(component).toBeTruthy();
  }));
  it('should show quote after getQuote (marbles)', fakeAsync(() => {
    const q$ = cold('---x--|', { x: testQuote });
    getQuoteSpy.and.returnValue(q$);
    component.ngOnInit();
    fixture.detectChanges();
    expect(quoteEl.textContent).toBe('...', 'should show placeholder');

    getTestScheduler().flush(); // flush the observables

    fixture.detectChanges(); // update view

    expect(quoteEl.textContent).toBe(testQuote, 'should show quote');
    expect(errorMessage()).toBeNull('should not show error');
  }));
  it("should display error when fails", fakeAsync(() => {
    // observable error after delay
    const q$ = cold("---#|", null, new Error("test failure"));
    getQuoteSpy.and.returnValue(q$);

    component.getQuote();
    fixture.detectChanges();
    expect(quoteEl.textContent).toBe("...", "should show placeholder");

    getTestScheduler().flush(); // flush the observables
    tick(1000); // component shows error after a setTimeout()
    fixture.detectChanges(); // update error message

    expect(component.errorMessage).toMatch(
      /test failure/,
      "should display error"
    );
    expect(quoteEl.textContent).toBe("...", "should show placeholder");
  }));
});
describe('Test Schedule', () => {
  let testScheduler;
  beforeEach(() => {
    testScheduler = new TestScheduler((actual, expected) => {
      expect(expected).toEqual(actual);
    });
  })
  const evenMultiTwo = (source$: Observable<number>): Observable<number> => {
    return source$.pipe(filter(x => x % 2 === 0),
      map(y => y * 2));

  }
  it("should filter even number then * 2 with cold", (() => {
    testScheduler.run((runHelper: RunHelpers) => {
      const { cold, expectObservable } = runHelper;
      const source$ = cold('a-b-c-d-e-f-g-h-i-j|', { a: 1, b: 2, c: 3, d: 4, e: 5, f: 6, g: 7, h: 8, i: 9, j: 10 });
      const expected = '    --x---y---z---t---k|'
      const returnValue = evenMultiTwo(source$);
      expectObservable(returnValue).toBe(expected, { x: 4, y: 8, z: 12, t: 16, k: 20 });
    })
  }))
  it("should filter even number then * 2 with hot example 1", (() => {
    testScheduler.run((runHelper: RunHelpers) => {
      const { hot, expectObservable } = runHelper;
      const source$ = hot('a-b-c-d-e-f-g-h-i-j|', { a: 1, b: 2, c: 3, d: 4, e: 5, f: 6, g: 7, h: 8, i: 9, j: 10 });
      const sub = '        ----^---------!'
      const expected = '   ------x---y----';
      const returnValue = evenMultiTwo(source$);
      expectObservable(returnValue, sub).toBe(expected, { x: 8, y: 12 });
    })
  }))
  it("should filter even number then * 2 with hot example 2", (() => {
    testScheduler.run((runHelper: RunHelpers) => {
      const { hot, expectObservable } = runHelper;
      const source$ = hot('--^-c-d-e-f-g-h-i-j|', { a: 1, b: 2, c: 3, d: 4, e: 5, f: 6, g: 7, h: 8, i: 9, j: 10 });
      const expected = '     ----x---y---z---t|';
      const returnValue = evenMultiTwo(source$);
      expectObservable(returnValue).toBe(expected, { x: 8, y: 12, z: 16, t: 20 });
    })
  }))
 

})
