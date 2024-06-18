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

