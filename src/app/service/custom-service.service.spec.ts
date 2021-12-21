import { fakeAsync, TestBed } from '@angular/core/testing';

import { CustomServiceService } from './custom-service.service';
import { ValueService } from './value.service';

describe('CustomServiceService', () => {
  let service: CustomServiceService;
  //mock
  const spy = jasmine.createSpyObj('ValueService', ['getValue']);
  beforeEach(() => {
    // set up
    TestBed.configureTestingModule({
      providers: [
        CustomServiceService,
        { provide: ValueService, useValue: spy }
      ]
    });
    //get service
    service = TestBed.inject(CustomServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('#getValue should return stubbed value from a spy', (() => {
    const stubValue = 'stub value';
    spy.getValue.and.returnValue(stubValue);
    expect(service.getValue())
      .toBe(stubValue, 'service returned stub value');
    expect(spy.getValue.calls.mostRecent().returnValue)
      .toBe(stubValue);
  }));
});
