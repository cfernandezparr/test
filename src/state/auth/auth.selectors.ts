import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './auth.state';

// 1. Seleccionamos el estado completo de 'auth'
export const selectAuthState = createFeatureSelector<AuthState>('auth');

// 2. Extraemos las credenciales
export const selectCredentials = createSelector(
  selectAuthState,
  (state: AuthState) => state.credentials
);

// 3. Extraemos el token
export const selectAccessToken = createSelector(
  selectCredentials,
  (credentials) => credentials.access_token
);

// 4. Extraemos el user_id
export const selectUserId = createSelector(
  selectCredentials,
  (credentials) => credentials.user_id
);

// 5. Estado de carga
export const selectAuthLoading = createSelector(
  selectAuthState,
  (state: AuthState) => state.loading
);

// 6. Error
export const selectAuthError = createSelector(
  selectAuthState,
  (state: AuthState) => state.error
);
