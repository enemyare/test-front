import {inject, Injectable, signal} from '@angular/core';
import {CompanyApiService} from './company-api.service';
import {CompanySortService} from './company-sort.service';
import {CompanyFilterService} from './company-filter.service';
import {HttpParams} from '@angular/common/http';
import {catchError, combineLatest, finalize, of, switchMap, throwError} from 'rxjs';
import {toObservable, toSignal} from '@angular/core/rxjs-interop';

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
    combineLatest([this.filters$, this.sort$]).pipe(
      switchMap(([filters, sort]) => {
        let params = new HttpParams();

        if (filters.name) params = params.set('q', filters.name);
        if (filters.industry) params = params.set('industry', filters.industry);
        if (filters.type) params = params.set('company_type', filters.type);

        if (sort.field) {
          params = params.set('sort_by', sort.field);
        }
        params = params.set('sort_order', sort.direction);

        this.loading.set(true);

        return this.companyService
          .getCompanies(params)
          .pipe(
            catchError(() => {
              this.error.set(true)
              return of(null);
            }),
            finalize(() => this.loading.set(false))
        );
      })
    ),
    { initialValue: [] })

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
