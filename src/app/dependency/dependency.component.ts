import { Component, OnInit } from '@angular/core';
import { CustomServiceService } from '../service/custom-service.service';
import { catchError, startWith } from 'rxjs/operators';
import { of } from 'rxjs';
import { LocalService } from '../service/local.service ';
@Component({
  selector: 'app-dependency',
  templateUrl: './dependency.component.html',
  styleUrls: ['./dependency.component.css'],
  providers: [LocalService]
})
export class DependencyComponent implements OnInit {

  constructor(public service: CustomServiceService, private localService: LocalService) { }
  data;
  error;
  profile$;
  ngOnInit(): void {
    this.profile$ = this.service.getProfile().pipe(
      startWith('...'),
      catchError((error)=>{
      error = error;
      return of(error);
    }));
  }
  getData(){
    this.service.getData().then(d=>{
      this.data = d;
    }).catch(error=>{
      this.error = error;
    })
  }
  testLocalService(){
    return this.localService.test();
  }
  

}
