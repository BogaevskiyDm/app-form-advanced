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
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { emailValidator, rangeValidator } from '../custom.validators';
import { User } from '../user.class';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  userForm!: FormGroup;
  roles: string[] = ['Гость', 'Модератор', 'Администратор'];
  user: User = new User(1, '', null, null, null, null);

  formErrors: any = {
    name: '',
    password: '',
    email: '',
    role: '',
    age: ''
  }

  validationMessenges: any = {
    name: {
      required: 'Имя обязательно',
      minlength: 'Имя должно cодержать минимум 4 символа',
      maxLength: 'Имя должно cодержать максимум 4 символа'
    },
    age: {
      required: 'Возраст обязателен',
      rangeValidator: 'Значение должно быть числом в диапазоне 18..122'
    },
    password: {
      required: 'Пароль обязателен',
      minlength: 'Пароль должен cодержать минимум 7 символов',
      maxLength: 'Пароль должун cодержать максимум 25 символа'
    },
    email: {
      required: 'Email обязателен',
      emailValidator: 'Неправильный формат Email адреса'
    },
    role: {
      required: 'Обязательное поле'
    }
  }
 
  constructor(private formBilder: FormBuilder) { }

  ngOnInit(): void {
    this.bildForm();
  }
  private bildForm(): void {
    this.userForm = this.formBilder.group({
      name: [this.user.name, [Validators.required, Validators.minLength(4), Validators.maxLength(15)]],
      password: [this.user.password, [Validators.required, Validators.minLength(7), Validators.maxLength(25)]],
      email: [this.user.email, [Validators.required, emailValidator]],
      age: [this.user.age, [Validators.required, rangeValidator(18,122)]],
      role: [this.user.role, Validators.required]
    })

    this.userForm.valueChanges.subscribe(() => this.onValueChanged())
  }
  private onValueChanged(): void {

    if (!this.userForm) { return; }

    const form: any = this.userForm;

    for (const field in this.formErrors) {
      this.formErrors[field] = '';
      const control = form.get(field);

      if (control && control.dirty && control.invalid) {
        const message = this.validationMessenges[field];

        for (const key in control.errors) {
          console.log(message[key]);
          this.formErrors[field] = message[key];
          break;
        }
      }
    }
  }

  onSubmit(form: FormGroup): void {
    console.log(form.valid);
    console.log(form.value);
  }

}
