import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
// import { SnotifyService } from 'ng-snotify';
import {ToastrService} from 'ngx-toastr'
import { GlobalFunctions } from '../../common/global-function';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  @ViewChild('logInNgForm') logInNgForm: any;
  logInForm: any=FormGroup;
  isBtnLoading: boolean = false;
  hidePassword: boolean = true;

  constructor(
    // private _authService: AuthService,
    private _formBuilder: FormBuilder,
    private _router: Router,
    private _globalFunctions: GlobalFunctions,
    private toastr:ToastrService,
    private _authService:AuthService
  ) {

  }

  ngOnInit(){
    localStorage.clear();
    this.logInForm = this._formBuilder.group({
      email: ['', [Validators.required,Validators.email]],
      password: ['', Validators.required]
    });
  }

  showPassword(){
    this.hidePassword = !this.hidePassword;
  }


  validate(): boolean {
    let flag: boolean = true;
    const errorFields: any = [];
    if (!this.logInForm.value.email || this.logInForm.value.email === "") {
      // this._sNotify.error('Email or mobile is required!', 'Oops!');

      errorFields.push('Username');
      flag = false;
      // return false;
    }
    if (!this.logInForm.value.password || this.logInForm.value.password === "") {
      // this._sNotify.error('Password is required!', 'Oops!');
      errorFields.push('Password');
      flag = false;
      // return false;
    }
    if (!flag) {
      let errorString: string = '';
      errorString = errorFields.join(' & ');
      this.toastr.clear();
      this.toastr.error(errorString + ' must be filled!', 'Oops!');
    }
    return flag;
    // return true;
  }

  logIn():void{
    this.isBtnLoading = true;
    if (!this.validate()) {
      this.isBtnLoading = false;
      return;
    }
    const loginDataObj: any = {
      email: this.logInForm.value.email.toString(),
      password: this.logInForm.value.password
    };
    this.logInForm.disable();
    this._authService.logIn(loginDataObj).subscribe((result: any) => {
      if (result && result.IsSuccess) {
        localStorage.setItem('accessToken', result.Data.accessToken);
        this.toastr.success(result.Message, 'Success');
        this.isBtnLoading = false;
        this._router.navigate(['blog-list']);
      } else {
        this.logInForm.enable();
        this._globalFunctions.successErrorHandling(result, this, true);
        this.isBtnLoading = false;
      }
    }, (error: any) => {
      this.logInForm.enable();
      this.logInNgForm.resetForm();
      this._globalFunctions.errorHanding(error, this, true);
      this.isBtnLoading = false;
    });
  }

}
