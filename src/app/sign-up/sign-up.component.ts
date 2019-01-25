import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StorageService } from '../storage-service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  signUpForm: FormGroup;
  signUpFormErrors: any;
  error: string;
  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private storageService: StorageService) { }

  buildSignUpForm() {
    this.signUpForm = this.formBuilder.group({
      userName: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9]*$')]],
      name: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.minLength(8), Validators.pattern('^[a-zA-Z0-9]*$')]],
      confirmPassword: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.maxLength(10), Validators.pattern('^[0-9]*$')]],
      address: ['', Validators.maxLength(30)]
    });
    this.buildFormErrors();
  }
  
  buildFormErrors() {
    this.signUpFormErrors = {
      userDetails: {},
      name: {},
      email: {},
      password:{},
      confirmPassword: {},
      phone: {},
      address: {}
    }
  }

  submitForm() {
    if (!this.signUpForm.valid) {
        return;
    }
    let formObj = this.signUpForm.getRawValue();
    if (formObj.password !== formObj.confirmPassword) {
      this.error = "Password mismatch!!";
      return;
    }
    this.storageService.setItem('userDetails', formObj);
    this.router.navigateByUrl('/login');
  }

  cancelSignUp() {
    this.router.navigateByUrl('/login');
  }

  ngOnInit() {
    this.buildSignUpForm();
  }

}
