import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StorageService } from '../storage-service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  validateCreds = { isValidUsername: true, isPasswordMatched: true };
  error: string;
  loggedUser: any;
  constructor(private formBuilder: FormBuilder,
              private storageService: StorageService,
              private router: Router) { }

  buildLoginForm() {
    this.loginForm = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  isValidUser(loggedInUser) {
    let userProfiles = this.storageService.getItem('userDetails');
    let validateFields = {
      isValidUsername: true,
      isPasswordMatched: true
    };
    if (! userProfiles) {
      return;
    }
    this.loggedUser = userProfiles.find((elem) => {
        let userName = loggedInUser.userName;
        let isUserAvail = userName === elem.userName || 
                          userName === elem.email || 
                          userName === elem.phone;
        validateFields.isValidUsername = isUserAvail;
        let isCorrectPassword = loggedInUser.password === elem.password;
        validateFields.isPasswordMatched = isCorrectPassword;
        return isUserAvail && isCorrectPassword;
    });
    return validateFields;
  }
  onLogin() {
    let formObj = this.loginForm.getRawValue();
    this.validateCreds = this.isValidUser(formObj);
    if (! this.validateCreds) {
      this.error = 'The Credentials that you have entered does not match any account.' +
                   'If you do not have an account please Sign up';
      return;
    }
    if (this.validateCreds.isValidUsername && this.validateCreds.isPasswordMatched) {
        this.storageService.setLoggedInUser(formObj);
        this.router.navigateByUrl('/userProfile');
    } else {
      this.error = ! this.validateCreds.isValidUsername ? 
                    'The username or email address or phone number that you have entered does not match any account.' +
      'If you do not have an account please Sign up' : ! this.validateCreds.isPasswordMatched ? ('The password that you have entered is incorrect.') : 'Please try again!!';
    }
  }

  ngOnInit() {
    this.buildLoginForm();
  }

}
