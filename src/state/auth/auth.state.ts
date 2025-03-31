import { AuthDTO } from 'src/app/Models/auth.dto';

export interface AuthState {
  credentials: AuthDTO;
  loading: boolean;
  loaded: boolean;
  error: any;
}

export const initialAuthState: AuthState = {
  credentials: {
    user_id: '',
    access_token: '',
    email: '',
    password: '',
  },
  loading: false,
  loaded: false,
  error: null,
};
