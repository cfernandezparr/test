import { createReducer, on } from '@ngrx/store';
import { AuthState, initialAuthState } from './auth.state';
import * as AuthActions from './auth.actions';

export const authReducer = createReducer(
  initialAuthState,

  on(AuthActions.login, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    error: null,
  })),

  on(AuthActions.loginSuccess, (state, { credentials }) => ({
    ...state,
    credentials: {
      ...state.credentials,
      user_id: credentials.user_id,
      access_token: credentials.access_token,
    },
    loading: false,
    loaded: true,
    error: null,
  })),

  on(AuthActions.loginFailure, (state, { error }) => ({
    ...state,
    loading: false,
    loaded: false,
    error,
  })),

  on(AuthActions.logout, () => initialAuthState)
);
