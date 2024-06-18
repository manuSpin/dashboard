import { FileType } from './../../interfaces/file-type.enum';
import { Usuario } from './../../models/usuario.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { AuthService } from '../../services/auth.service';
import { ResponseUpdateUser, ResponseUploadImg } from '../../interfaces/responses.interface';
import { FileUploadService } from '../../services/file-upload.service';
import Swal from 'sweetalert2';
import { HttpResponseBase } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: ``
})
export class ProfileComponent implements OnInit {

  public profileForm?: FormGroup;
  public usuario!: Usuario;
  public fileToUpload?: File;
  public imgTemp: string | ArrayBuffer | null = null;

  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private usuariosService: UsuarioService,
    private fileUploadService: FileUploadService) {
    this.usuario = this.authService.usuario;
  }

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      nombre: [this.usuario.nombre || '', [Validators.required]],
      apellidos: [this.usuario.apellidos || ''],
      email: [this.usuario.email || '', [Validators.required, Validators.email]]
    });
  }

  public updateProfile(): void {
    console.log(this.profileForm?.value);

    this.usuariosService.editUser(this.profileForm?.value).subscribe((response: ResponseUpdateUser) => {
      Swal.fire({
        title: 'Fantástico',
        text: 'El usuario se ha actualizado correctamente',
        icon: 'success',
        confirmButtonText: 'Cerrar'
      });

    }, (error) => {

      Swal.fire({
        title: 'Error',
        text: error.error.msg,
        icon: 'error',
        confirmButtonText: 'Cerrar'
      });
    });
  }

  public changeImage(event: any) {
    this.fileToUpload = event.target!.files[0];

    if (!event) {
      this.imgTemp = null;
    }

    if (this.fileToUpload) {
      const reader = new FileReader();
      reader.readAsDataURL(this.fileToUpload);

      reader.onloadend = () => {
        this.imgTemp = reader.result;
      }
    }

  }

  public uploadImg() {
    this.fileUploadService.updatePhoto(this.fileToUpload!, FileType.usuarios, this.usuario.uid!).subscribe((response: ResponseUploadImg) => {
      const title = response.ok ? 'Fantástico' : 'Error';
      const icon = response.ok ? 'success' : 'error';

      Swal.fire({
        title: title,
        text: response.msg,
        icon: icon,
        confirmButtonText: 'Cerrar'
      });

      if (response.ok) {
        this.usuario.img = response.filename;
      }
    });
  }

}
