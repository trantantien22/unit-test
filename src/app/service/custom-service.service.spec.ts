import { TestBed } from '@angular/core/testing';

import { CustomServiceService } from './custom-service.service';
import { ValueService } from './value.service';

describe('CustomServiceService', () => {
  let service: CustomServiceService;
  let valueServiceSpy: jasmine.SpyObj<ValueService>;
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
    valueServiceSpy = TestBed.inject(ValueService) as jasmine.SpyObj<ValueService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('#getValue should return stubbed value from a spy', () => {
    const stubValue = 'stub value';
    valueServiceSpy.getValue.and.returnValue(stubValue);
    expect(service.getValue())
      .toBe(stubValue, 'service returned stub value');
    expect(valueServiceSpy.getValue.calls.count())
      .toBe(1, 'spy method was called once');
    expect(valueServiceSpy.getValue.calls.mostRecent().returnValue)
      .toBe(stubValue);
  });
});
