import {inject, Injectable, signal} from '@angular/core';
import {CompanyApiService} from './company-api.service';
import {CompanySortService} from './company-sort.service';
import {CompanyFilterService} from './company-filter.service';
import {HttpParams} from '@angular/common/http';
import {finalize, switchMap} from 'rxjs';
import {toObservable, toSignal} from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root'
})
export class CompanyFacadeService {
  private readonly companyService = inject(CompanyApiService);
  private readonly sortService = inject(CompanySortService);
  private readonly filterService = inject(CompanyFilterService);
  private readonly filters$ = toObservable(this.filterService.filters);
  readonly loading = signal(false);

  readonly companies = toSignal(
    this.filters$.pipe(
      switchMap((filters) => {
        let params = new HttpParams();
        if (filters.name) params = params.set('q', filters.name);
        if (filters.industry) params = params.set('industry', filters.industry);
        if (filters.type) params = params.set('company_type', filters.type);

        this.loading.set(true);

        return this.companyService.getCompanies(params).pipe( finalize(() => this.loading.set(false)));
      })
    ),
    { initialValue: [] }
  );
}
