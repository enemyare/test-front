import {inject, Injectable, signal} from '@angular/core';
import {CompanyApiService} from './company-api.service';
import {toSignal} from '@angular/core/rxjs-interop';
import {CompanyFilters} from '../model/company.types';

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
  readonly typesList = toSignal(this.companyService.getTypes());
  readonly industriesList = toSignal(this.companyService.getIndustries());

  updateFilters(newFilters: CompanyFilters) {
    this.filters.set({ ...this.filters(), ...newFilters });
  }

}
