
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { emailValidator, rangeValidator } from '../custom.validators';
import { FORM_ERRORS, FORM_LABLES, FORM_PLACEHOLDERS, FORM_ROLES, FORM_SUCCESS, VALIDATION_MESSENGES } from '../form-data';
import { User } from '../user.class';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  roles = FORM_ROLES;
  labels = FORM_LABLES;
  placeholders = FORM_PLACEHOLDERS;
  success = FORM_SUCCESS;
  errors: any = FORM_ERRORS;
  validationMessenges: any = VALIDATION_MESSENGES;
  userForm!: FormGroup;
  private user: User = new User(1, null, null, null, null, null);

  name!:AbstractControl;
  password!:AbstractControl;
  email!:AbstractControl;
  age!:AbstractControl;
  role!:AbstractControl;

  constructor(private formBilder: FormBuilder) { }
  
  ngOnInit(): void {
    this.bildForm();
  }
  private bildForm(): void {
    this.userForm = this.formBilder.group({
      name: [this.user.name, [Validators.required,Validators.minLength(4),Validators.maxLength(15)]],
      password: [this.user.password, [Validators.required,Validators.minLength(7),Validators.maxLength(25)]],
      email: [this.user.email, [Validators.required, emailValidator]],
      age: [this.user.age, [Validators.required, rangeValidator(18, 122)]],
      role: [this.user.role, Validators.required]
    })

    this.userForm.valueChanges.subscribe(() => this.onValueChanged())
    this.createControls()
  }

  private createControls(){
    this.name = this.userForm.controls.name;
    this.password = this.userForm.controls.password;
    this.email = this.userForm.controls.email;
    this.age = this.userForm.controls.age;
    this.role = this.userForm.controls.role;
  }

  onValueChanged(): void {

    if (!this.userForm) { return; }

    const form: any = this.userForm;

    for (const field in this.errors) {
      this.errors[field] = '';
      const control = form.get(field);
      if (control && (control.dirty || control.touched) && control.invalid) {
        const message = this.validationMessenges[field];
        for (const key in control.errors) {
          console.log(message[key]);
          this.errors[field] = message[key];
          break;
        }
      }
    }
  }

  onSubmit(form: FormGroup): void {

  }

}

