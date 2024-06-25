import { Hospital } from "../models/hospital.model";
import { Medico } from "../models/medico.model";
import { Usuario } from "../models/usuario.model";
import { MenuItem } from "./menu.interface";

// LOGIN
export interface ResponseLogin {
  ok: boolean;
  token: string;
  menu: MenuItem[];
}

export interface ResponseGoogleAPILogin {
  clientId: string;
  client_id: string;
  credential: string;
  select_by: string;
}

export interface ResponseLoginGoogle {
  ok: boolean;
  name: string;
  email: string;
  picture: string;
  token: string;
  menu: MenuItem[];
}

// USER
export interface ResponseCreateUserMenu {
  ok: boolean;
  token: string;
  usuario: Usuario;
  menu: MenuItem[];
}

export interface ResponseCreateUser {
  ok: boolean;
  token: string;
  usuario: Usuario;
  menu: MenuItem[];
}

export interface ResponseUpdateUser {
  ok: boolean;
  usuario: Usuario;
}

export interface ResponseUsersList {
  ok: boolean;
  usuarios: Usuario[];
  total: number;
}

// HOSPITALS
export interface ResponseHospitalsList {
  ok: boolean;
  hospitales: Hospital[];
  total: number;
}

export interface ResponseUpdateHospital {
  ok: boolean;
  hospital: Hospital;
}

export interface ResponseCreateHospital {
  ok: boolean;
  hospital: Hospital;
}


// MEDICS
export interface ResponseMedicsList {
  ok: boolean;
  medicos: Medico[];
  total: number;
}

export interface ResponseUpdateMedic {
  ok: boolean;
  medico: Medico;
}

export interface ResponseCreateMedic {
  ok:     boolean;
  medico: Medico;
}

// UPLOADS
export interface ResponseUploadImg {
  ok: boolean;
  filename: string;
  msg: string;
}

// SEARCHES

export interface ResponseSearchByCollection {
  ok: boolean;
  resultados: Usuario[] | Hospital[] | Medico[];
  total: number;
}

export interface ResponseSearchAll {
  ok:         boolean;
  resultados: Resultados;
  total:      number;
}

export interface Resultados {
  usuarios:   Usuario[];
  hospitales: Hospital[];
  medicos:    Medico[];
}

// GENERICS

export interface ResponseDelete {
  ok: boolean;
  msg: string;
}




