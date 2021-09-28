import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { defer, of, throwError } from 'rxjs';
import { CustomServiceService } from '../service/custom-service.service';

import { DependencyComponent } from './dependency.component';
import { ComponentFixtureAutoDetect } from '@angular/core/testing';
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
  //defind mock method for getProfile
  mockServive.getProfile.and.returnValue(of("random string"));
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DependencyComponent],
      imports: [],
      providers: [
        { provide: CustomServiceService, useValue: mockServive }
      ]
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
  it("get data from subcribe", () => {
    // define mock fuction for getData of service
    mockServive.getData.and.returnValue(of(1));
    component.getData();
    expect(component.data).toEqual(1);
  })
  it("update name from service", () => {
    const text = "new random text";
    service.name = text;
    fixture.detectChanges();
    expect(el.textContent).toEqual(text);
  })
  it("async binding", fakeAsync(() => {
    const text = 'new random';
    //redefind mock function getProfile
    mockServive.getProfile.and.returnValue(of(text));
    component.ngOnInit();
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('div').textContent).toEqual(text);
  }));
  it("async binding catch error", fakeAsync(() => {
    const text = "error";
    //redefind mock function getProfile with error
    mockServive.getProfile.and.returnValue(throwError(text));
    component.ngOnInit();
    fixture.detectChanges();  // update errorMessage within setTimeout()
    expect(fixture.nativeElement.querySelector('div').textContent).toEqual(text);
  }));

});
