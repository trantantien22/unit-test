import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { FormComponent } from './form.component';

describe('FormComponent', () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;
  let de : DebugElement;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormComponent ],
      imports:[FormsModule, ReactiveFormsModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement.query(By.css('form'));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it("should not call on submit if form invalid",()=>{
    spyOn(component,'onSubmit').and.callFake(()=>{});
    let btn = fixture.debugElement.query(By.css("button")).nativeElement;
    fixture.detectChanges();
    btn.click();
    expect(component.onSubmit).toHaveBeenCalledTimes(0);
  })
  it("inut name with length = 4, form invalid",()=>{
   component.contactForm.controls['name'].setValue("abcd");
   component.contactForm.controls['email'].setValue("tran@gmail.com");
   expect(component.contactForm.valid).toBeFalse();
  })
  it("inut invalid email, form invalid",()=>{
    component.contactForm.controls['name'].setValue("abcde");
    component.contactForm.controls['email'].setValue("tra");
    expect(component.contactForm.valid).toBeFalse();
   })
   it("inut valid email, name, form invalid",()=>{
    component.contactForm.controls['name'].setValue("abcde");
    component.contactForm.controls['email'].setValue("tran@gmail.com");
    expect(component.contactForm.valid).toBeTrue();
    // need to call detectChanges to update UI
    fixture.detectChanges();
    spyOn(component,'onSubmit').and.callFake(()=>{});
    let btn = fixture.debugElement.query(By.css("button")).nativeElement;
    btn.click();
    expect(component.onSubmit).toHaveBeenCalledTimes(1);
   })
});
