import {Injectable, signal} from '@angular/core';
import {SortField, SortState} from '../model/company.types';

@Injectable({
  providedIn: 'root'
})
export class CompanySortService {
  readonly sort = signal<SortState>({
    field: '',
    direction: 'asc',
  });

  setField(field: SortField) {
    this.sort.update((s) => ({ ...s, field }));
  }

  toggleDirection() {
    this.sort.update((s) => ({
      ...s,
      direction: s.direction === 'asc' ? 'desc' : 'asc',
    }));
  }
}
