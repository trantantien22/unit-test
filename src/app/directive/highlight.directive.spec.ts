import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { HighlightDirective } from './highlight.directive';
@Component({
  template: `
  <h2 highlight="yellow">Something Yellow</h2>
  <h2 highlight>The Default (Gray)</h2>
  <h2>No Highlight</h2>
  <input #box [highlight]="box.value" value="cyan"/>`
})
class TestComponent { }
describe('DirectiveCom', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let des;
  let bareH2;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestComponent, HighlightDirective]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    des = fixture.debugElement.queryAll(By.directive(HighlightDirective));
    bareH2 = fixture.debugElement.query(By.css('h2:not([highlight])'));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should have three highlighted elements', () => {
    expect(des.length).toBe(3);
  });

  it('should color 1st <h2> background "yellow"', () => {
    const bgColor = des[0].nativeElement.style.backgroundColor;
    expect(bgColor).toBe('yellow');
  });

  it('should color 2nd <h2> background w/ default color', () => {
    const dir = des[1].injector.get(HighlightDirective) as HighlightDirective;
    const bgColor = des[1].nativeElement.style.backgroundColor;
    expect(bgColor).toBe(dir.defaultColor);
  });

  it('should bind <input> background to value color', () => {
    // easier to work with nativeElement
    const input = des[2].nativeElement as HTMLInputElement;
    expect(input.style.backgroundColor).toBe('cyan', 'initial backgroundColor');

    input.value = 'green';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(input.style.backgroundColor).toBe('green', 'changed backgroundColor');
  });


  it('bare <h2> should not have a customProperty', () => {
    expect(bareH2.properties.customProperty).toBeUndefined();
  });

});

