import { Hospital } from "../models/hospital.model";
import { Medico } from "../models/medico.model";
import { Usuario } from "../models/usuario.model";

export interface ResponseLogin {
  ok: boolean;
  token: string;
}

export interface ResponseCreateUser {
  ok: boolean;
  token: string;
  usuario: Usuario;
}

export interface ResponseUpdateUser {
  ok: boolean;
  usuario: Usuario;
}

export interface ResponseGoogleAPILogin {
  clientId:   string;
  client_id:  string;
  credential: string;
  select_by:  string;
}

export interface ResponseLoginGoogle {
  ok:      boolean;
  name:    string;
  email:   string;
  picture: string;
  token:   string;
}

export interface ResponseUploadImg {
  ok:       boolean;
  filename: string;
  msg:      string;
}

export interface ResponseUsersList {
  ok:       boolean;
  usuarios: Usuario[];
  total:    number;
}

export interface ResponseSearchByCollection {
  ok:         boolean;
  resultados: Usuario[] | Hospital[] | Medico[];
  total:      number;
}

export interface ResponseDelete {
  ok: boolean;
  msg: string;
}




