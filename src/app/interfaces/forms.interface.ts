export interface RegisterForm {
  nombre: string;
  apellidos: string;
  email: string;
  password: string;
  confirmPassword: string;
  terminos: boolean;
}

export interface UpdateUserForm {
  nombre: string;
  apellidos: string;
  email: string;
  role: string;
}
