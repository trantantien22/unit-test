import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BindingComponent } from './binding/binding.component';
import { DependencyComponent } from './dependency/dependency.component';
import { DashboardHeroComponent } from './dashboard-hero/dashboard-hero.component';
import { FormComponent } from './form/form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HighlightDirective } from './directive/highlight.directive';
import { TestRoutedComponent } from './test-routed/test-routed.component';
import { TestMarbleComponent } from './test-marble/test-marble.component';
import { SharedComponentModule } from './shared-component/shared-component.module';

@NgModule({
  declarations: [
    AppComponent,
    BindingComponent,
    DependencyComponent,
    DashboardHeroComponent,
    FormComponent,
    HighlightDirective,
    TestRoutedComponent,
    TestMarbleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedComponentModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [ ]
})
export class AppModule { }
