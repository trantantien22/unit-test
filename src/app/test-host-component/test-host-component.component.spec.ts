import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardHeroComponent } from '../dashboard-hero/dashboard-hero.component';
import { TestHostComponent } from './test-host-component.component';

describe('TestHostComponent', () => {
  let component: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;
  let heroEl;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestHostComponent, DashboardHeroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
    heroEl = fixture.nativeElement.querySelector('.hero');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should display hero name', () => {
    const expectedPipedName = component.hero.name.toUpperCase();
    expect(heroEl.textContent).toContain(expectedPipedName);
  });  
  it('should raise selected event when clicked', () => {
    heroEl.click();
    expect(component.selectedHero).toBe(component.hero);

  });
});
