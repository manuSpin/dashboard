import { environment } from "../../environments/environment";
import { Hospital } from "./hospital.model";
import { Usuario } from "./usuario.model";

export class Medico {
  public nombre: string;
  public apellidos?: string;
  public img?: string;
  public uid?: string;
  public creator: Usuario;
  public hospital: LightHospital;

  constructor(nombre: string, creator: Usuario, hospital: LightHospital, apellidos?: string, img?: string, uid?: string) {
    this.nombre = nombre;
    this.apellidos = apellidos;
    this.img = img;
    this.uid = uid;
    this.creator = creator;
    this.hospital = hospital;
  }
  private baseUrl = environment.baseUrl;

  public get imageUrl() {
    if (this.img) {
      return this.baseUrl + '/uploads/medicos/' + this.img;
    } else {
      return this.baseUrl + '/uploads/no-image.jpg';
    }
  }
}

interface LightHospital {
  _id: string;
  nombre: string;
}


