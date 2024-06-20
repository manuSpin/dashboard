import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Usuario } from '../../../models/usuario.model';
import { delay, Subscription } from 'rxjs';
import { UsuarioService } from '../../../services/usuario.service';
import { ResponseDelete, ResponseSearchByCollection, ResponseUpdateUser, ResponseUsersList } from '../../../interfaces/responses.interface';
import { FileType } from '../../../interfaces/file-type.enum';
import { SearchesService } from '../../../services/searches.service';
import Swal from 'sweetalert2'
import { AuthService } from '../../../services/auth.service';
import { UpdateUserForm } from '../../../interfaces/forms.interface';
import { ModalImageService } from '../../../services/modal-image.service';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styles: ``
})
export class UsersComponent implements OnInit, OnDestroy {

  @ViewChild('searchInput') public searchInput!: ElementRef;

  public usersList: Usuario[] = [];

  public getUsersSubscription?: Subscription;
  public getUsersFilteredSubscription?: Subscription;
  public deleteUserSubscription?: Subscription;
  public editUserSubscription?: Subscription;
  public imgUploadedSubscription?: Subscription;

  public from: number = 0;
  public actualSize = 5;
  public size: number = 5;
  public total: number = 0;
  public loading: boolean = false;
  public term: string = '';
  public type: FileType = FileType.usuarios;

  constructor(private usuarioSservice: UsuarioService,
    private searchesService: SearchesService,
    private authService: AuthService,
    private modalService: ModalImageService) { }

  ngOnInit(): void {
    this.loadUsers();

    this.imgUploadedSubscription = this.modalService.imgUploaded.pipe(delay(1000)).subscribe(response => {
      console.log(response);
      this.loadUsers();
    });
  }

  public loadUsers(): void {
    this.loading = true;

    this.getUsersSubscription = this.usuarioSservice.getUsers(this.from, this.size).subscribe((response: ResponseUsersList) => {
      this.usersList = response.usuarios;
      this.total = response.total;

      if (this.actualSize > this.total) {
        this.actualSize = response.total;
      }

      this.loading = false;
    });
  }

  public loadUsersFiltered(value: string): void {
    this.loading = true;

    this.getUsersFilteredSubscription = this.searchesService.searchCollectionBy(FileType.usuarios, value, this.from, this.size).subscribe((response: ResponseSearchByCollection) => {
      this.usersList = response.resultados as Usuario[];
      this.total = response.total;

      if (this.actualSize > this.total) {
        this.actualSize = response.total;
      }

      this.loading = false;
    });
  }

  public changeValues(value: number) {
    this.actualSize += value;
    this.from += value;

    if (this.actualSize < this.total && this.actualSize % 5 !== 0) {
      this.actualSize = this.from + 5;
    }

    this.selectSearch();
  }

  public filter(value: string): void {
    this.loading = true;
    this.term = value;
    this.from = 0;
    this.actualSize = 5;

    this.selectSearch();
  }

  public cleanSearch() {
    this.searchInput.nativeElement.value = '';
    this.term = '';

    this.selectSearch();
  }

  public deleteUser(usuario: Usuario) {

    console.log(this.authService.userId);
    console.log(usuario.uid);
    console.log(usuario.uid === this.authService.userId);

    if (usuario.uid === this.authService.userId) {
      console.log('entra');
      Swal.fire({
        title: "Error",
        text: "No puede borrar el usuario con el que se ha logado",
        icon: "error"
      });
    } else {
      Swal.fire({
        title: "¿Estás seguro?",
        text: "Está a punto de borrar al usuario " + usuario.nombre + " " + usuario.apellidos + ". No puede deshacer esta acción.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si",
        cancelButtonText: "No"

      }).then((result) => {
        if (result.isConfirmed) {
          this.deleteUserSubscription = this.usuarioSservice.deleteUser(usuario.uid!).subscribe((response: ResponseDelete) => {
            Swal.fire({
              title: "Borrado",
              text: response.msg,
              icon: "success"
            });
          });

          // Fix recarga de usuarios
          // this.actualSize += -5;
          // this.from += -5;

          this.loadUsers();
        }
      });
    }
  }

  public updateRole(user: Usuario): void {

    const { nombre, apellidos, email, role } = user;

    const formData: UpdateUserForm = {
      nombre: nombre,
      apellidos: apellidos,
      email: email,
      role: role
    }

    this.editUserSubscription = this.usuarioSservice.editUser(formData, user.uid!).subscribe((response: ResponseUpdateUser) => {
      console.log('llega');
      Swal.fire({
        title: 'Fantástico',
        text: 'El usuario se ha actualizado correctamente',
        icon: 'success',
        confirmButtonText: 'Cerrar'
      });
    });
  }

  public openImageModal(user: Usuario) {
    this.modalService.openModal(FileType.usuarios, user.uid!, user.img);
  }

  private selectSearch() {
    if (this.term.length === 0) {
      this.loadUsers();

    } else {
      this.loadUsersFiltered(this.term);
    }
  }

  ngOnDestroy(): void {
    if (this.getUsersSubscription) {
      this.getUsersSubscription.unsubscribe();
    }

    if (this.getUsersFilteredSubscription) {
      this.getUsersFilteredSubscription.unsubscribe();
    }

    if (this.deleteUserSubscription) {
      this.deleteUserSubscription.unsubscribe();
    }

    if (this.editUserSubscription) {
      this.editUserSubscription.unsubscribe();
    }

    if (this.imgUploadedSubscription) {
      this.imgUploadedSubscription.unsubscribe();
    }
  }

}
