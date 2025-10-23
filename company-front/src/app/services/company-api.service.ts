import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {map} from 'rxjs';
import {Company} from '../model/company.types';
import {ApiResponse} from '../model/api-response.interface';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CompanyApiService {
  private readonly http: HttpClient = inject(HttpClient);
  private readonly baseUrl: string = environment.apiUrl;

  public getCompanies(params?: HttpParams)  {
    return this.http.get<ApiResponse<Company>>(`${this.baseUrl}/companies?page=1&per_page=50&sort_by=id&sort_order=asc`,
      {params}
    )
      .pipe(
      map(response => response.data)
    );
  }

  public getCompany(id: string) {
    return this.http.get<Company>(`${this.baseUrl}/companies/${id}`);
  }

  public getIndustries() {
    return this.http.get<String[]>(`${this.baseUrl}/industries`);
  }

  public getTypes() {
    return this.http.get<String[]>(`${this.baseUrl}/types`);
  }
}
