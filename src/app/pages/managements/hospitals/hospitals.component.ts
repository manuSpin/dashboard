import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Hospital } from '../../../models/hospital.model';
import { FileType } from '../../../interfaces/file-type.enum';
import { delay, Subscription } from 'rxjs';
import { HospitalService } from '../../../services/hospital.service';
import { ResponseCreateHospital, ResponseDelete, ResponseHospitalsList, ResponseSearchByCollection, ResponseUpdateHospital } from '../../../interfaces/responses.interface';
import Swal from 'sweetalert2'
import { ModalImageService } from '../../../services/modal-image.service';
import { SearchesService } from '../../../services/searches.service';
import { CreateHospitalForm, UpdateHospitalForm } from '../../../interfaces/forms.interface';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-hospitals',
  templateUrl: './hospitals.component.html',
  styles: ``
})
export class HospitalsComponent implements OnInit, OnDestroy {

  @ViewChild('searchInput') public searchInput!: ElementRef;

  public hospitalsList: Hospital[] = [];

  public from: number = 0;
  public actualSize = 5;
  public size: number = 5;
  public total: number = 0;
  public loading: boolean = false;
  public term: string = '';
  public type: FileType = FileType.hospitales;

  public getHospitalsSubscription?: Subscription;
  public deleteHospitalSubscription?: Subscription;
  public getHospitalsFilteredSubscription?: Subscription;
  public editHospitalSubscription?: Subscription;
  public imgUploadedSubscription?: Subscription;
  public createHospitalSubscription?: Subscription;

  constructor(private hospitalsService: HospitalService,
    private modalService: ModalImageService,
    private searchesService: SearchesService,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.loadHospitals();

    this.imgUploadedSubscription = this.modalService.imgUploaded.pipe(delay(1000)).subscribe(response => {
      this.loadHospitals();
    });
  }

  public loadHospitals(): void {
    this.loading = true;
    this.getHospitalsSubscription = this.hospitalsService.getHospitals(this.from, this.size).subscribe((response: ResponseHospitalsList) => {
      this.hospitalsList = response.hospitales;
      this.total = response.total;

      if (this.actualSize > this.total) {
        this.actualSize = response.total;
      }

      this.loading = false;
    });
  }

  public loadHospitalFiltered(value: string): void {
    this.loading = true;

    this.getHospitalsFilteredSubscription = this.searchesService.searchCollectionBy(this.type, value, this.from, this.size).subscribe((response: ResponseSearchByCollection) => {
      this.hospitalsList = response.resultados as Hospital[];
      this.total = response.total;

      if (this.actualSize > this.total) {
        this.actualSize = response.total;
      }

      this.loading = false;
    });

  }

  public filter(value: string): void {
    this.loading = true;
    this.term = value;
    this.from = 0;
    this.actualSize = 5;

    this.selectSearch();
  }

  public changeValues(value: number): void {
    this.actualSize += value;
    this.from += value;

    if (this.actualSize < this.total && this.actualSize % 5 !== 0) {
      this.actualSize = this.from + 5;
    }

    this.selectSearch();
  }

  public cleanSearch(): void {
    this.searchInput.nativeElement.value = '';
    this.term = '';

    this.selectSearch();
  }

  public editHospital(hospital: Hospital): void {

    const formData: UpdateHospitalForm = { nombre: hospital.nombre, creator: this.authService.userId }

    this.editHospitalSubscription = this.hospitalsService.editHospital(formData, hospital.uid!).subscribe((response: ResponseUpdateHospital) => {
      Swal.fire({
        title: 'Fantástico',
        text: 'Se ha actualizado correctamente los datos del hospital',
        icon: 'success'
      });

    }, (error) => {
      Swal.fire({
        title: 'Error',
        text: 'Se ha producido un error',
        icon: 'error'
      });

    });
  }

  public deleteHospital(hospital: Hospital): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Está a punto de borrar el hospital ' + hospital.nombre + '. No puede deshacer esta acción.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
      cancelButtonText: 'No'

    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteHospitalSubscription = this.hospitalsService.deleteHospital(hospital.uid!).subscribe((response: ResponseDelete) => {
          Swal.fire({
            title: 'Borrado',
            text: response.msg,
            icon: 'success'
          });

          // Fix recarga de usuarios
          this.actualSize += -5;
          this.from += -5;
          this.loadHospitals();
        });
      }
    });
  }

  public openImageModal(hospital: Hospital): void {
    this.modalService.openModal(this.type, hospital.uid!, hospital.img);
  }

  public async openCreateModal() {
    const name = await Swal.fire<string>({
      title: 'Crear hospital',
      input: 'text',
      inputLabel: 'Nombre del hospital: ',
      showCancelButton: true,
      confirmButtonText: 'Crear',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      inputValue: ''
    });
    console.log(name);
    if (name.value && name.value.trim().length > 0) {
      const formData: CreateHospitalForm = { nombre: name.value!.trim() };

      this.createHospitalSubscription = this.hospitalsService.createHospital(formData).subscribe((response: ResponseCreateHospital) => {
        Swal.fire({
          title: 'Fantástico',
          text: 'Se ha creado el hospital',
          icon: 'success'
        });
      });

      this.loadHospitals();
    }
  }

  private selectSearch(): void {
    if (this.term.length === 0) {
      this.loadHospitals();

    } else {
      this.loadHospitalFiltered(this.term);
    }
  }

  ngOnDestroy(): void {
    if (this.getHospitalsSubscription) {
      this.getHospitalsSubscription.unsubscribe();
    }

    if (this.deleteHospitalSubscription) {
      this.deleteHospitalSubscription.unsubscribe();
    }

    if (this.getHospitalsFilteredSubscription) {
      this.getHospitalsFilteredSubscription.unsubscribe();
    }

    if (this.editHospitalSubscription) {
      this.editHospitalSubscription.unsubscribe();
    }

    if (this.imgUploadedSubscription) {
      this.imgUploadedSubscription.unsubscribe();
    }

    if (this.createHospitalSubscription) {
      this.createHospitalSubscription.unsubscribe();
    }
  }
}
