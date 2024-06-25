import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ResponseSearchAll, ResponseSearchByCollection } from '../interfaces/responses.interface';
import { FileType } from '../interfaces/file-type.enum';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class SearchesService {
  private baseUrl = environment.baseUrl;

  private get headers() {
    return this.authService.headersWithToken;
  }

  constructor(private http: HttpClient,
    private authService: AuthService) { }

  public searchCollectionBy(type: FileType, term: string, from: number, size?: number): Observable<ResponseSearchByCollection> {
    let url = this.baseUrl + '/todo/collection/' + type + '/' + term + '?from=' + from;

    if (size) {
      url += '&size=' + size;
    }
    return this.http.get<ResponseSearchByCollection>(url, this.headers);
  }

  public searchAll(term: string): Observable<ResponseSearchAll> {
    return this.http.get<ResponseSearchAll>(this.baseUrl + '/todo/' + term, this.headers);
  }
}
