import { Component, OnInit } from '@angular/core';
import { CustomServiceService } from '../service/custom-service.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
@Component({
  selector: 'app-dependency',
  templateUrl: './dependency.component.html',
  styleUrls: ['./dependency.component.css']
})
export class DependencyComponent implements OnInit {

  constructor(public service: CustomServiceService) { }
  data;
  error;
  profile$;
  ngOnInit(): void {
    this.profile$ = this.service.getProfile().pipe(catchError((error)=>{
      error = error;
      return of(error);
    }));
  }
  getData(){
    this.service.getData().subscribe(d=>{
      this.data = d;
    })
  }
  

}
