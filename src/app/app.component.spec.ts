import { Component, CUSTOM_ELEMENTS_SCHEMA, Directive, HostListener, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { SharedComponentModule } from './shared-component/shared-component.module';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
          //SharedComponentModule, //can add SharedComponentModule to ipmprot header, footer normaly
      ],
      declarations: [
        AppComponent,
        HeaderStub, // overwrite mock component
        FooterStub,
        RouterLinkDirectiveStub
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA] //inorge unknow element (not import or declare)
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  describe('#test router link', () => {
    let linkDes;
    let routerLinks;
    beforeEach(() => {
      linkDes = fixture.debugElement.queryAll(By.directive(RouterLinkDirectiveStub));
      routerLinks = linkDes.map(de => de.injector.get(RouterLinkDirectiveStub));
    })
    it("show have correct link", () => {
      expect(routerLinks.length).toBe(3, 'should have 3 routerLinks');
      expect(routerLinks[0].linkParams).toBe('/binding');
    })
    it('it should change navigatedTo when click om', () => {
      const heroesLinkDe = linkDes[0];    // DebugElement
      const heroesLink = routerLinks[0];  // directive
    
      expect(heroesLink.navigatedTo).toBeNull('should not have navigated yet');
    
      heroesLinkDe.triggerEventHandler('click', {});
      fixture.detectChanges();    
      expect(heroesLink.navigatedTo).toBe('/binding');
    });

  });

});
@Component({
  selector: 'app-header'
})
export class HeaderStub {
  @Input() customText;

}

@Component({
  selector: 'app-footer'
})
export class FooterStub {

}
@Directive({
  selector: '[routerLink]'
})
export class RouterLinkDirectiveStub {
  @Input('routerLink') linkParams: any;
  navigatedTo: any = null;

  @HostListener('click')
  onClick() {
    this.navigatedTo = this.linkParams;
  }
}