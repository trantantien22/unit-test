import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  contactForm: FormGroup;
  constructor() { }

  ngOnInit(): void {
    this.createForm();
  }
  createForm() {
    this.contactForm = new FormGroup({
      'name': new FormControl("",
        [Validators.required,
        Validators.minLength(5)
        ]),
      'email': new FormControl("", [Validators.required, Validators.email])
    })
  }
  onSubmit() {

  }

}
