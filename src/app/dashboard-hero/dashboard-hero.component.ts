import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
export class Hero {
  id: number;
  name : string;
}
@Component({
  selector: 'dashboard-hero',
  template: `
    <div (click)="click()" class="hero">
      {{hero.name | uppercase}}
    </div>`,
  styleUrls: [ './dashboard-hero.component.css' ]
})
export class DashboardHeroComponent {
  @Input() hero: Hero;
  @Output() selected = new EventEmitter();
  click() { this.selected.emit(this.hero); }
}
 