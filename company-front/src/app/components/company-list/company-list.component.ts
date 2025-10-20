import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {ApiService} from '../../services/api.service';
import {Company} from '../../model/company.interface';
import {Observable} from 'rxjs';
import {AsyncPipe} from '@angular/common';
import {CompanyItemComponent} from '../company-item/company-item.component';

@Component({
  selector: 'app-company-list',
  imports: [
    AsyncPipe,
    CompanyItemComponent
  ],
  standalone: true,
  templateUrl: './company-list.component.html',
  styleUrl: './company-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CompanyListComponent {
  private apiService = inject(ApiService);
  protected companies$: Observable<Company[]> = this.apiService.getCompanies();
}
