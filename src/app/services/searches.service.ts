import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ResponseSearchByCollection } from '../interfaces/responses.interface';
import { FileType } from '../interfaces/file-type.enum';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class SearchesService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient,
    private authService: AuthService) { }

  public searchCollectionBy(type: FileType, term: string, from: number, size?: number): Observable<ResponseSearchByCollection> {
    const headers = this.authService.headersWithToken;

    let url = this.baseUrl + '/todo/collection/' + type + '/' + term + '?from=' + from;

    if (size) {
      url += '&size=' + size;
    }
    return this.http.get<ResponseSearchByCollection>(url, headers);
  }
}
