import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { first } from 'rxjs/operators';

import { DashboardHeroComponent, Hero } from './dashboard-hero.component';

describe('DashboardHeroComponent', () => {
  let component: DashboardHeroComponent;
  let fixture: ComponentFixture<DashboardHeroComponent>;
  let heroEl;
  let heroDe;
  const expectedHero = { id: 42, name: 'Test Name' };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardHeroComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardHeroComponent);
    component = fixture.componentInstance;
    // find the hero's DebugElement and element
    heroDe = fixture.debugElement.query(By.css('.hero'));
    heroEl = heroDe.nativeElement;
    // mock the hero supplied by the parent component
    component.hero = expectedHero;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should display hero name in uppercase', () => {
    const expectedPipedName = component.hero.name.toUpperCase();
    expect(heroEl.textContent).toContain(expectedPipedName);
  });
 
  it('should raise selected event when clicked (triggerEventHandler)', fakeAsync(() => {
    let selectedHero: Hero | undefined;
    component.selected.pipe(first()).subscribe((hero: Hero) => selectedHero = hero);  
    heroDe.triggerEventHandler('click', null);
    expect(selectedHero).toEqual(expectedHero);
  }));
});
