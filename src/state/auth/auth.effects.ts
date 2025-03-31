import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as AuthActions from './auth.actions';
import { AuthService } from 'src/app/Services/auth.service';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';

@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions, private authService: AuthService) {}

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      mergeMap(({ credentials }) =>
        this.authService.login(credentials).pipe(
          map((response) =>
            AuthActions.loginSuccess({
              credentials: {
                user_id: response.user_id,
                access_token: response.access_token,
              },
            })
          ),
          catchError((error) =>
            of(AuthActions.loginFailure({ error: error.error }))
          )
        )
      )
    )
  );
}
