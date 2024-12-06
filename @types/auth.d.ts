export interface LoginForm {
  username: string;
  password: string;
}

export interface RegisterForm {
  name: string;
  username: string;
  password: string;
  confirmPassword: string;
}

export interface User {
  id?: string;
  name?: string;
  username?: string;
  password?: string;
}