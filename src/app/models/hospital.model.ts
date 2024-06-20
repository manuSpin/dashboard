import { environment } from "../../environments/environment";
import { Usuario } from "./usuario.model";

export class Hospital {
  public nombre: string;
  public img?: string;
  public uid?: string;
  public creator: Usuario;

  constructor(nombre: string, creator: Usuario, img?: string, uid?: string) {
    this.nombre = nombre;
    this.img = img;
    this.uid = uid;
    this.creator = creator;
  }
  private baseUrl = environment.baseUrl;

  public get imageUrl() {
    if (this.img) {
      return this.baseUrl + '/uploads/hospital/' + this.img;
    } else {
      return this.baseUrl + '/uploads/no-image.jpg';
    }
  }
}
