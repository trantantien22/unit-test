import { ComponentFixture, fakeAsync, flush, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { defer, fromEvent, Observable, of, throwError } from 'rxjs';
import { CustomServiceService } from '../service/custom-service.service';

import { DependencyComponent } from './dependency.component';
import { delay } from 'rxjs/operators';
import { LocalService } from '../service/local.service ';
export function asyncData<T>(data: T) {
  return defer(() => Promise.resolve(data));
}
describe('DependencyComponent', () => {
  let component: DependencyComponent;
  let fixture: ComponentFixture<DependencyComponent>;
  let service: CustomServiceService;
  let el: HTMLElement;
  let asynEl: HTMLElement;
  // create mock service
  const mockServive = jasmine.createSpyObj('CustomServiceService', ['getData', "getName", "getProfile"]);
  const mockLocalService = jasmine.createSpyObj('LocalService', ['test']);
  //defind mock method for getProfile
  mockServive.getProfile.and.returnValue(of("random string"));
  mockLocalService.test.and.returnValue("test");
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DependencyComponent],
      imports: [],
      providers: [
        { provide: CustomServiceService, useValue: mockServive },
        // { provide: LocalService, useValue: mockLocalService } // cannot mock service this way for service inject in component level

      ]
    })
      .overrideComponent(DependencyComponent,
        {
          set: { providers: [{ provide: LocalService, useValue: mockLocalService }] } // should mock service this way for service injected in component level
        })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DependencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    //get service
    service = TestBed.inject(CustomServiceService);
    el = fixture.nativeElement.querySelector('span');
    asynEl = fixture.nativeElement.querySelector('div');

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  describe("subcribe/then for getData function", () => {
    it("get data from subcribe/then", fakeAsync(() => {
      // define mock fuction for getData of service
      mockServive.getData.and.returnValue(Promise.resolve(1));
      component.getData();
      tick();
      expect(component.data).toEqual(1);
    }))
    it("get data from subcribe/catch", fakeAsync(() => {
      // define mock fuction for getData of service
      mockServive.getData.and.returnValue(Promise.reject("error"));
      component.getData();
      tick();
      expect(component.error).toEqual("error");
    }))
    it("get data from subcribe/then waitForAsync", waitForAsync(() => {
      // define mock fuction for getData of service
      mockServive.getData.and.returnValue(Promise.resolve(1));
      component.getData();
      fixture.whenStable().then(() => {
        expect(component.data).toEqual(1);
      })

    }))
  })
  it("update name from service", (() => {
    const text = "new random text";
    service.name = text;
    fixture.detectChanges();
    expect(el.textContent).toEqual(text);
  }))
  it("async binding", (() => {
    const text = 'new random';
    //redefind mock function getProfile
    mockServive.getProfile.and.returnValue(of(text));
    component.ngOnInit();
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('div').textContent).toEqual(text);

  }));


  it("async binding", fakeAsync(() => {
    const text = 'new random';
    //redefind mock function getProfile
    mockServive.getProfile.and.returnValue(asyncData(text));
    component.ngOnInit();
    fixture.detectChanges();
    expect(asynEl.textContent).toEqual('...');
    tick();
    fixture.detectChanges();
    expect(asynEl.textContent).toEqual(text);

    // fixture.whenStable().then(()=>{
    //   fixture.detectChanges();
    //   expect(fixture.nativeElement.querySelector('div').textContent).toEqual(text);
    // })


  }));

  it("async binding catch error", (() => {
    const text = "error";
    //redefind mock function getProfile with error
    mockServive.getProfile.and.returnValue(throwError(text));
    component.ngOnInit();
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('div').textContent).toEqual(text);
  }));

  it("localService", () => {
    component.testLocalService();
    expect(mockLocalService.test).toHaveBeenCalled();
  })




  let timeValue;
  function testTimeout() {
    setTimeout(() => {
      timeValue = 1
    });
    setTimeout(() => {
      timeValue = 2
    }, 2000);
  }
  it("#testTimeout by fakeAsyn", fakeAsync(() => {
    testTimeout();
    tick(1000);
    expect(timeValue).toEqual(1);
    tick(1000);
    expect(timeValue).toEqual(2);
  }))
  
  it("#waitForAsync", waitForAsync(() => {
    let rs;
    of(1).subscribe(data => rs = data);    
    of(2).subscribe(data => rs = data);
    fixture.whenStable().then(() => {
      expect(rs).toEqual(2);
    })
  }))
  


});