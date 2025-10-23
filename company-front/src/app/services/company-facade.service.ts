import {inject, Injectable, signal} from '@angular/core';
import {CompanyApiService} from './company-api.service';
import {CompanySortService} from './company-sort.service';
import {CompanyFilterService} from './company-filter.service';
import {HttpParams} from '@angular/common/http';
import {catchError, combineLatest, finalize, Observable, of, switchMap, throwError} from 'rxjs';
import {toObservable, toSignal} from '@angular/core/rxjs-interop';
import {Company, CompanyFilters, SortState} from '../model/company.types';

@Injectable({
  providedIn: 'root'
})
export class CompanyFacadeService {
  private readonly companyService = inject(CompanyApiService);
  private readonly sortService = inject(CompanySortService);
  private readonly filterService = inject(CompanyFilterService);

  private readonly filters$ = toObservable(this.filterService.filters);
  private readonly sort$ = toObservable(this.sortService.sort);

  readonly loading = signal(false);
  readonly error = signal(false);

  readonly companies = toSignal(
    this.createCompaniesStream(),
    { initialValue: [] }
  );

  private createCompaniesStream(): Observable<Company[] | null> {
    return combineLatest([this.filters$, this.sort$]).pipe(
      switchMap(([filters, sort]) => {
        const params = this.buildQueryParams(filters, sort);
        return this.loadCompanies(params);
      })
    );
  }

  private buildQueryParams(filters: CompanyFilters, sort: SortState): HttpParams {
    let params = new HttpParams();

    const filterMap: Record<string, string | undefined> = {
      q: filters.name,
      industry: filters.industry,
      company_type: filters.type,
    };

    Object.entries(filterMap).forEach(([key, value]) => {
      if (value) params = params.set(key, value);
    });

    if (sort.field) {
      params = params.set('sort_by', sort.field);
    }
    params = params.set('sort_order', sort.direction);

    return params;
  }

  private loadCompanies(params: HttpParams): Observable<Company[] | null> {
    this.loading.set(true);
    this.error.set(false);

    return this.companyService.getCompanies(params).pipe(
      catchError(() => {
        this.error.set(true);
        return of(null);
      }),
      finalize(() => this.loading.set(false))
    );
  }


  getCompany(id: string){
    this.loading.set(true);
    return this.companyService.getCompany(id).pipe(
      catchError((error) => {
        this.error.set(true)
        return throwError(() => error);
      }),
      finalize(() => this.loading.set(false))
    )
  }
}
