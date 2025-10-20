import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {Company} from '../model/company.interface';
import {ApiResponse} from '../model/ApiResponse.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly http: HttpClient = inject(HttpClient);
  private readonly baseUrl: string = "https://faker-api.milki.space";

  public getCompanies(): Observable<Company[]> {
    return this.http.get<ApiResponse<Company>>(`https://faker-api.milki.space/companies?page=1&per_page=50&sort_by=id&sort_order=asc`).pipe(
      map(response => response.data)
    );
  }

  public getCompany(id: string): Observable<Company> {
    return this.http.get<Company>(`${this.baseUrl}/companies/${id}`);
  }
}
