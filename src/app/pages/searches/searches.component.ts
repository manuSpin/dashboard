import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { SearchesService } from '../../services/searches.service';
import { ResponseSearchAll } from '../../interfaces/responses.interface';
import { Usuario } from '../../models/usuario.model';
import { Hospital } from '../../models/hospital.model';
import { Medico } from '../../models/medico.model';
import { FileType } from '../../interfaces/file-type.enum';

@Component({
  selector: 'app-searches',
  templateUrl: './searches.component.html',
  styles: ``
})
export class SearchesComponent implements OnInit, OnDestroy {

  public foundUsers: Usuario[] = [];
  public foundHospitals: Hospital[] = [];
  public foundMedics: Medico[] = [];

  public userType: FileType = FileType.usuarios;
  public hospitalType: FileType = FileType.hospitales;
  public medicType: FileType = FileType.medicos;

  public activatedRouteSubscription?: Subscription;
  public getSearchSubscription?: Subscription;

  constructor(private activatedRoute: ActivatedRoute,
    private searchesService: SearchesService) { }

  ngOnInit(): void {
    this.activatedRouteSubscription = this.activatedRoute.params.subscribe(({ termino }) => {
      this.search(termino);
    });
  }

  public search(term: string): void {
    this.getSearchSubscription = this.searchesService.searchAll(term).subscribe((response: ResponseSearchAll) => {
      console.log(response);
      this.foundUsers = response.resultados.usuarios;
      this.foundHospitals = response.resultados.hospitales;
      this.foundMedics = response.resultados.medicos;
    });
  }

  ngOnDestroy(): void {
    if (this.activatedRouteSubscription) {
      this.activatedRouteSubscription.unsubscribe();
    }

    if (this.getSearchSubscription) {
      this.getSearchSubscription.unsubscribe();
    }
  }
}
