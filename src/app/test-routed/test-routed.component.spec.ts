import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { ActivatedRouteStub } from './activatedRoute.mock';

import { TestRoutedComponent } from './test-routed.component';

describe('TestRoutedComponent', () => {
  let component: TestRoutedComponent;
  let fixture: ComponentFixture<TestRoutedComponent>;
  let activatedRoute;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestRoutedComponent],
      providers: [
        { provide: ActivatedRoute, useValue: new ActivatedRouteStub() }
      ]
    })
      .compileComponents();
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(TestRoutedComponent);
    component = fixture.componentInstance;     
    activatedRoute = TestBed.inject(ActivatedRoute);
    activatedRoute.setParamMap({ id: 99999 });
    fixture.detectChanges();   
    
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    
  });
  it("onInit",fakeAsync(()=>{
    fixture.detectChanges();
    expect(component.id).toEqual(99999);
  }))
});
