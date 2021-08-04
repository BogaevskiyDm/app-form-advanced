// import { Message } from '@angular/compiler/src/i18n/i18n_ast';
// import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
// import { NgForm } from '@angular/forms';
// import { User } from '../user.class';

// @Component({
//   selector: 'app-form',
//   templateUrl: './form.component.html',
//   styleUrls: ['./form.component.scss']
// })
// export class FormComponent implements OnInit, AfterViewInit {

//   roles: string[] = ['Гость', 'Модератор', 'Администратор'];
//   model: User = new User(1, '', '', null);
//   formErrors: any = {
//     name: '',
//     age: ''
//   }
//   validationMessenges: any = {
//     name: {
//       required: 'Имя обязательно',
//       minlength: 'Имя должно cодержать минимум 4 символа'
//     },
//     age: {
//       required: 'Возраст обязателен'
//     }
//   }

//   @ViewChild('userForm') userForm: NgForm | null = null;

//   constructor() { }

//   ngOnInit(): void {

//   }

//   ngAfterViewInit(): void {
//     this.userForm?.valueChanges?.subscribe(() => this.onValueChanged())
//   }

//   private onValueChanged(data?: any): void {
//     const form: any = this.userForm?.form;

//     for (const field in this.formErrors) {

//       this.formErrors[field] = '';
//       const control = form.get(field);

//       if (control && control.dirty && control.invalid) {
//         const message = this.validationMessenges[field];

//         for (const key in control.errors) {
//           console.log(message[key]);
//           this.formErrors[field] += message[key] + '';
//         }
//       }
//     }

//   }

//   onSubmit(): void {
//     console.log('Form submitted');
//   }

// }

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  userForm = new FormGroup({
    name: new FormControl('', Validators.required),
    password: new FormControl('', [Validators.required, Validators.minLength(7)])
  })

  ngOnInit(): void {

  }
  onSubmit(form: FormGroup): void {
    console.log(form.valid);
    console.log(form.value);
  }

}
