import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BindingComponent } from './binding/binding.component';
import { DependencyComponent } from './dependency/dependency.component';
import { FormComponent } from './form/form.component';
import {TestRoutedComponent} from './test-routed/test-routed.component';

const routes: Routes = [
  {path: "binding", component: BindingComponent},
  {path: "dp", component: DependencyComponent},
  {path: 'form', component: FormComponent},
  {path : "routed/:id", component : TestRoutedComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
