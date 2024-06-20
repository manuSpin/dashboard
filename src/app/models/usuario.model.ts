import { environment } from "../../environments/environment";

export class Usuario {
  public nombre: string;
  public apellidos?: string;
  public email: string;
  public password: string;
  public role: string;
  public google: boolean;
  public img?: string;
  public uid?: string;

  constructor(nombre: string, email: string, password: string, role: string,
    google: boolean, apellidos?: string, img?: string, uid?: string) {
    this.nombre = nombre;
    this.apellidos = apellidos;
    this.email = email;
    this.password = password;
    this.role = role;
    this.google = google;
    this.img = img;
    this.uid = uid;
  }
  private baseUrl = environment.baseUrl;

  public get imageUrl() {

    if (!this.img) {
      return this.baseUrl + '/uploads/no-image.jpg';

    } else if (this.img?.includes('https')) {
      return this.img;

    } else {
      return this.baseUrl + '/uploads/usuarios/' + this.img;
    }
  }
}
