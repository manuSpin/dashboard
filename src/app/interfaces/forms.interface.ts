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
  apellidos?: string;
  email: string;
  role: string;
}

export interface UpdateHospitalForm {
  nombre: string;
  creator: string;
}

export interface UpdateMedicoForm {
  nombre: string;
  apellidos: string;
  hospital: string;
}

export interface CreateHospitalForm {
  nombre: string;
  img?: string;
}


export interface CreateMedicForm {
  nombre: string;
  apellidos: string;
  hospital: string;
  img?: string;
}
