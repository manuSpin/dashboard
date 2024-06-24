import { delay, Subscription } from 'rxjs';
import { FileType } from '../../../interfaces/file-type.enum';
import { Medico } from '../../../models/medico.model';
import { ModalImageService } from '../../../services/modal-image.service';
import { SearchesService } from '../../../services/searches.service';
import { MedicService } from './../../../services/medic.service';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ResponseDelete, ResponseMedicsList, ResponseSearchByCollection } from '../../../interfaces/responses.interface';
import Swal from 'sweetalert2'
import { Hospital } from '../../../models/hospital.model';

@Component({
  selector: 'app-medics',
  templateUrl: './medics.component.html',
  styles: ``
})
export class MedicsComponent implements OnInit, OnDestroy {

  @ViewChild('searchInput') public searchInput!: ElementRef;

  public medicsList: Medico[] = [];
  public hospitalList: Hospital[] = [];

  public from: number = 0;
  public actualSize = 5;
  public size: number = 5;
  public total: number = 0;
  public loading: boolean = false;
  public term: string = '';
  public type: FileType = FileType.medicos;

  public getMedicsSubscription?: Subscription;
  public deleteMedicSubscription?: Subscription;
  public getMedicsFilteredSubscription?: Subscription;
  public imgUploadedSubscription?: Subscription;
  public getHospitalSubscription?: Subscription;

  constructor(private medicsService: MedicService,
    private modalService: ModalImageService,
    private searchesService: SearchesService) { }

  ngOnInit(): void {
    this.loadMedics();

    this.imgUploadedSubscription = this.modalService.imgUploaded.pipe(delay(1000)).subscribe(response => {
      this.loadMedics();
    });
  }

  public loadMedics(): void {
    this.loading = true;

    this.getMedicsSubscription = this.medicsService.getMedics(this.from, this.size).subscribe((response: ResponseMedicsList) => {
      this.medicsList = response.medicos;
      this.total = response.total;

      if (this.actualSize > this.total) {
        this.actualSize = response.total;
      }

      this.loading = false;
    });
  }

  public loadMedicsFiltered(value: string): void {
    this.loading = true;

    this.getMedicsFilteredSubscription = this.searchesService.searchCollectionBy(this.type, value, this.from, this.size).subscribe((response: ResponseSearchByCollection) => {
      this.medicsList = response.resultados as Medico[];
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

  public deleteMedic(medic: Medico): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Está a punto de borrar al médico ' + medic.nombre + ' ' + medic.apellidos + '. No puede deshacer esta acción.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
      cancelButtonText: 'No'

    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteMedicSubscription = this.medicsService.deleteMedic(medic.uid!).subscribe((response: ResponseDelete) => {
          Swal.fire({
            title: 'Borrado',
            text: response.msg,
            icon: 'success'
          });

          // Fix recarga de usuarios
          // this.actualSize += -5;
          // this.from += -5;
          this.loadMedics();
        });
      }
    });
  }

  public openImageModal(medic: Medico) {
    this.modalService.openModal(this.type, medic.uid!, medic.img);
  }


  private selectSearch(): void {
    if (this.term.length === 0) {
      this.loadMedics();

    } else {
      this.loadMedicsFiltered(this.term);
    }
  }


  ngOnDestroy(): void {
    if (this.getMedicsSubscription) {
      this.getMedicsSubscription.unsubscribe();
    }

    if (this.getMedicsFilteredSubscription) {
      this.getMedicsFilteredSubscription.unsubscribe();
    }

    if (this.deleteMedicSubscription) {
      this.deleteMedicSubscription.unsubscribe();
    }

    if (this.imgUploadedSubscription) {
      this.imgUploadedSubscription.unsubscribe();
    }

    if (this.getHospitalSubscription) {
      this.getHospitalSubscription.unsubscribe();
    }
  }



}
