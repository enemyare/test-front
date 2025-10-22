import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {Company} from '../../model/company.types';
import {AsyncPipe} from '@angular/common';
import {ActivatedRoute} from '@angular/router';
import {catchError, Observable, of, switchMap} from 'rxjs';
import {CompanyNamePipe} from '../../pipes/company-name-pipe';
import {CompanyFacadeService} from '../../services/company-facade.service';

@Component({
  selector: 'app-company-detail',
  imports: [
    AsyncPipe,
    CompanyNamePipe,
  ],
  standalone: true,
  templateUrl: './company-detail.component.html',
  styleUrl: './company-detail.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CompanyDetailComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly companyFacadeService = inject(CompanyFacadeService);
  isLoading = this.companyFacadeService.loading
  isError = this.companyFacadeService.error

  company$: Observable<Company | null> = this.route.paramMap.pipe(
    switchMap(params => {
      const id = params.get('id');
      if (!id) {
        return of(null);
      }
      return this.companyFacadeService.getCompany(id);
    }),
    catchError(()  => {
      return of(null);
    })
  );
}
