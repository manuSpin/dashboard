import { EventEmitter, Injectable } from '@angular/core';
import { FileType } from '../interfaces/file-type.enum';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ModalImageService {

  private _hideModal: boolean = true;
  private baseUrl = environment.baseUrl;

  public type?: FileType;
  public id?: string;
  public img?: string = 'no-image.jpg';

  public imgUploaded: EventEmitter<string> = new EventEmitter();

  public get hideModal() {
    return this._hideModal;
  }

  constructor() { }

  public openModal(type: FileType, id: string, img?: string) {
    this._hideModal = false;
    this.type = type;
    this.id = id;
    // this.img = img;

    if (img?.includes('https')) {
      this.img = img;

    } else {
      this.img = this.baseUrl + '/uploads/' +  type + '/' + img
    }
  }

  public closeModal() {
    this._hideModal = true;
  }
}
