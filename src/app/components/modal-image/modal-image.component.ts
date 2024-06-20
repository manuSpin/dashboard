import { Component, OnDestroy } from '@angular/core';
import { ModalImageService } from '../../services/modal-image.service';
import { FileType } from '../../interfaces/file-type.enum';
import { FileUploadService } from '../../services/file-upload.service';
import { Subscription } from 'rxjs';
import { ResponseUploadImg } from '../../interfaces/responses.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-image',
  templateUrl: './modal-image.component.html',
  styles: ``
})
export class ModalImageComponent implements OnDestroy{

  public fileToUpload?: File;
  public imgTemp: string | ArrayBuffer | null = null;

  public uploadImgSubscription?: Subscription;

  constructor(public modalService: ModalImageService,
    private fileUploadService: FileUploadService) { }


  public openModal(type: FileType, id: string, img?: string) {
    this.modalService.openModal(type, id, img);
  }

  public closeModal() {
    this.modalService.closeModal();
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
    const type: FileType =  this.modalService.type!;
    const id: string = this.modalService.id!;
    this.uploadImgSubscription = this.fileUploadService.updatePhoto(this.fileToUpload!, type, id).subscribe((response: ResponseUploadImg) => {
      this.closeModal();

      Swal.fire({
        title: 'Fantástico',
        text: response.msg,
        icon: 'success',
        confirmButtonText: 'Cerrar'
      });

      this.modalService.imgUploaded.emit(response.filename);

      }, (error) => {
        Swal.fire({
          title: 'Error',
          text: 'Se ha producido un error actualizando la imagen',
          icon: 'error',
          confirmButtonText: 'Cerrar'
        });
    });
  }

  ngOnDestroy(): void {
    if (this.uploadImgSubscription) {
      this.uploadImgSubscription.unsubscribe();
    }
  }

}
