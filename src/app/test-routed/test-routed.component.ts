import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-test-routed',
  templateUrl: './test-routed.component.html',
  styleUrls: ['./test-routed.component.css']
})
export class TestRoutedComponent implements OnInit {

  constructor(private activateRoute : ActivatedRoute) { }
  id;
  ngOnInit(): void {
    this.activateRoute.paramMap.subscribe(params => {
      this.id = params.get('id');
    })
  }

}
