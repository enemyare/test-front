import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {CompanyItemComponent} from '../company-item/company-item.component';
import {CompanyFilterComponent} from '../company-filter/company-filter.component';
import {CompanyFacadeService} from '../../services/company-facade.service';

@Component({
  selector: 'app-company-list',
  imports: [
    CompanyItemComponent,
    CompanyFilterComponent
  ],
  standalone: true,
  templateUrl: './company-list.component.html',
  styleUrl: './company-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CompanyListComponent {
  private readonly companyFacadeService = inject(CompanyFacadeService);
  protected companies  = this.companyFacadeService.companies;
  protected loading = this.companyFacadeService.loading;
}
