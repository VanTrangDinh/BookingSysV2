import { Login } from './login/login.usecase';
import { PasswordResetRequest } from './password-reset-request/password-reset-request.usecase';
import { PasswordReset } from './password-reset/password-reset.usecase';
import { UserRegister } from './register/user-register.usecase';

export const USE_CASES = [
  //
  UserRegister,
  Login,
  PasswordResetRequest,
  PasswordReset,
  // SwitchEnvironment,
  // SwitchOrganization,
  // PasswordResetRequest,
  // PasswordReset,
];
