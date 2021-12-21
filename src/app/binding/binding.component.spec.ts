import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { BindingComponent } from './binding.component';

describe('BindingComponent', () => {
  let component: BindingComponent;
  let fixture: ComponentFixture<BindingComponent>;
  let el : HTMLElement;
  let input : HTMLInputElement;
  let btn : HTMLElement;
  

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BindingComponent ],
      imports: [FormsModule]
    })
    .compileComponents();
  });
  
  beforeEach(() => {
    fixture = TestBed.createComponent(BindingComponent);
    component = fixture.componentInstance;
    el = fixture.nativeElement.querySelector('span');
    input = fixture.nativeElement.querySelector("#input-id");
    fixture.detectChanges();
  });

  

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it("title should be abc",()=>{
    expect(el.textContent).toEqual('abc');
  })
  it('update input value',()=>{
    //set input value, then dispatchEvent to fired event
    input.value = "test";
    expect(component.title).toEqual('abc'); // not dispatch event
    input.dispatchEvent(new Event('input'));
    // after dispatch value in component is changed but in HTLM is not change
    expect(component.title).toEqual('test');
    expect(el.textContent).toEqual('abc');
    // need to call detect change to change element
    // or can import ComponentFixtureAutoDetect for auto detect.
    fixture.detectChanges();
    expect(el.textContent).toEqual('test');
  })
});
