import {inject, Injectable, signal} from '@angular/core';
import {CompanyApiService} from './company-api.service';
import {toSignal} from '@angular/core/rxjs-interop';
import {CompanyFilters} from '../model/company.types';
import {catchError, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompanyFilterService {
  private readonly companyService = inject(CompanyApiService)
  readonly filters = signal<CompanyFilters>({
    name: '',
    type: '',
    industry: '',
  });
  readonly typesList = toSignal(this.companyService.getTypes()
    .pipe(
      catchError(() => {
        return of(null)
      }),
    ));
  readonly industriesList = toSignal(this.companyService.getIndustries()
    .pipe(
      catchError(() => {
        return of(null)
      }),
    )
  );

  updateFilters(newFilters: CompanyFilters) {
    this.filters.set({ ...this.filters(), ...newFilters });
  }

}
