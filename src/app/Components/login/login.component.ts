import { Component, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { HeaderMenus } from 'src/app/Models/header-menus.dto';
import { Store } from '@ngrx/store';
import { AppState } from 'src/state/app.state';
import * as AuthActions from 'src/state/auth/auth.actions';
import {
  selectAuthError,
  selectUserId,
} from 'src/state/auth/auth.selectors';
import { HeaderMenusService } from 'src/app/Services/header-menus.service';
import { SharedService } from 'src/app/Services/shared.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  email: UntypedFormControl;
  password: UntypedFormControl;
  loginForm: UntypedFormGroup;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private sharedService: SharedService,
    private headerMenusService: HeaderMenusService,
    private router: Router,
    private store: Store<AppState>
  ) {
    this.email = new UntypedFormControl('', [
      Validators.required,
      Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
    ]);

    this.password = new UntypedFormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(16),
    ]);

    this.loginForm = this.formBuilder.group({
      email: this.email,
      password: this.password,
    });
  }

  ngOnInit(): void {
    // Si hay login correcto
    this.store.select(selectUserId).subscribe((userId) => {
      if (userId) {
        const headerInfo: HeaderMenus = {
          showAuthSection: true,
          showNoAuthSection: false,
        };
        this.headerMenusService.headerManagement.next(headerInfo);
        this.router.navigateByUrl('home');
      }
    });

    // Si hay error
    this.store.select(selectAuthError).subscribe((error) => {
      if (error) {
        const headerInfo: HeaderMenus = {
          showAuthSection: false,
          showNoAuthSection: true,
        };
        this.headerMenusService.headerManagement.next(headerInfo);
        this.sharedService.errorLog(error);
        this.sharedService.managementToast('loginFeedback', false, error);
      }
    });
  }

  login(): void {
    if (this.loginForm.invalid) {
      return;
    }

    const credentials = {
      email: this.email.value,
      password: this.password.value,
    };

    this.store.dispatch(AuthActions.login({ credentials }));
  }
}
