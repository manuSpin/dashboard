export class Usuario {
  public nombre: string;
  public apellidos: string;
  public email: string;
  public password: string;
  public role: string;
  public google: boolean;
  public img: string;
  public uid?: string;

  constructor(nombre: string, apellidos: string, email: string, password: string,
    role: string, google: boolean, img: string, uid?: string) {
      this.nombre = nombre;
      this.apellidos = apellidos;
      this.email = email;
      this.password = password;
      this.role = role;
      this.google = google;
      this.img = img;
      this.uid = uid;
    }
}
