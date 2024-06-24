import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, delay } from 'rxjs';
import { HospitalService } from '../../../services/hospital.service';
import { ResponseCreateMedic, ResponseHospitalsList } from '../../../interfaces/responses.interface';
import { Hospital } from '../../../models/hospital.model';
import { MedicService } from '../../../services/medic.service';
import { FileType } from '../../../interfaces/file-type.enum';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2'
import { Medico } from '../../../models/medico.model';
import { ActivatedRoute, Router } from '@angular/router';
import { UpdateMedicoForm } from '../../../interfaces/forms.interface';

@Component({
  selector: 'app-medic',
  templateUrl: './medic.component.html',
  styles: ``
})
export class MedicComponent implements OnInit, OnDestroy {

  public medicForm!: FormGroup;

  public hospitalList: Hospital[] = [];
  public selectedHospital?: Hospital;
  public selectedMedic?: Medico;
  public medicType: FileType = FileType.medicos;
  public hospitalType: FileType = FileType.hospitales;

  public getHospitalSubscription?: Subscription;
  public createMedicSubscription?: Subscription;
  public editMedicSubscription?: Subscription;
  public getMedicByIdSubscription?: Subscription;
  public activatedRouteSubscription?: Subscription;
  public changeHospitalSubscription?: Subscription;

  constructor(private hospitalService: HospitalService,
    private medicsService: MedicService,
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.initForm();

    this.activatedRouteSubscription = this.activatedRoute.params.subscribe(params => { this.loadMedic(params['id']); });

    this.changeHospitalSubscription = this.medicForm.get('hospital')?.valueChanges.subscribe(hospital => {
      this.selectedHospital = this.hospitalList.find(x => x.uid === hospital);
    });

    this.getHospitalList();
  }

  public initForm(): void {
    this.medicForm = this.fb.group({
      nombre: ['', Validators.required],
      apellidos: [''],
      hospital: [0, Validators.required],
      img: [''],
    });
  }

  public loadMedic(id: string): void {
    if (id !== 'nuevo') {
      this.getMedicByIdSubscription = this.medicsService.getById(id).pipe(delay(100)).subscribe((response: ResponseCreateMedic) => {
        if (response.medico) {
          this.selectedMedic = response.medico;

          this.medicForm.get('nombre')?.setValue(this.selectedMedic.nombre);
          this.medicForm.get('apellidos')?.setValue(this.selectedMedic.apellidos);
          this.medicForm.get('hospital')?.setValue(this.selectedMedic.hospital._id);
        } else {
          this.router.navigate(['/dashboard/medicos/']);
        }
      });
    }
  }


  public getHospitalList(): void {
    this.getHospitalSubscription = this.hospitalService.getHospitals(0).subscribe((response: ResponseHospitalsList) => {
      this.hospitalList = response.hospitales;
    });
  }

  public saveMedic(): void {
    console.log(this.selectedMedic?.uid);
    if (this.selectedMedic !== undefined) {

      this.medicsService.editMedic(this.medicForm.value, this.selectedMedic.uid!).subscribe((response: ResponseCreateMedic) => {
        Swal.fire({
          title: 'Fantástico',
          text: 'Se han guardado los datos correctamente',
          icon: 'success'
        });
      });

    } else {
      this.medicsService.createMedic(this.medicForm.value).subscribe((response: ResponseCreateMedic) => {
        Swal.fire({
          title: 'Fantástico',
          text: 'Se ha guardado el médico correctamente',
          icon: 'success'
        });

        this.router.navigate(['/dashboard/medico/', response.medico.uid!]);

      });
    }
  }

  ngOnDestroy(): void {
    if (this.getHospitalSubscription) {
      this.getHospitalSubscription.unsubscribe();
    }

    if (this.createMedicSubscription) {
      this.createMedicSubscription.unsubscribe();
    }

    if (this.editMedicSubscription) {
      this.editMedicSubscription.unsubscribe();
    }

    if (this.selectedHospital) {
      this.selectedHospital = undefined;
    }

    if (this.getMedicByIdSubscription) {
      this.getMedicByIdSubscription = undefined;
    }

    if (this.activatedRouteSubscription) {
      this.activatedRouteSubscription = undefined;
    }

    if (this.changeHospitalSubscription) {
      this.changeHospitalSubscription = undefined;
    }

  }

}
