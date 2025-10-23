import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {CompanySortService} from '../../services/company-sort.service';
import {FormsModule} from '@angular/forms';
import {SortField} from '../../model/company.types';

@Component({
  selector: 'app-company-sort',
  imports: [
    FormsModule
  ],
  standalone: true,
  templateUrl: './company-sort.component.html',
  styleUrl: './company-sort.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class CompanySortComponent {
  private readonly sortService = inject(CompanySortService);
  sort = this.sortService.sort;

  readonly sortOptions = [
    { value: '', label: 'Без сортировки' },
    { value: 'name', label: 'Название' },
    { value: 'type', label: 'Тип' },
    { value: 'industry', label: 'Отрасль' },
  ];

  onFieldChange(field: SortField): void {
    this.sortService.setField(field);
  }

  toggleDirection(): void {
    this.sortService.toggleDirection();
  }
}
