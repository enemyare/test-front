import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {CompanyApiService} from '../../services/company-api.service';
import {Company} from '../../model/company.interface';
import {AsyncPipe} from '@angular/common';
import {ActivatedRoute} from '@angular/router';
import {catchError, Observable, of, switchMap} from 'rxjs';

@Component({
  selector: 'app-company-detail',
  imports: [
    AsyncPipe,
  ],
  standalone: true,
  templateUrl: './company-detail.component.html',
  styleUrl: './company-detail.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CompanyDetailComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly apiService = inject(CompanyApiService);
  company$: Observable<Company | null> = this.route.paramMap.pipe(
    switchMap(params => {
      const id = params.get('id');
      if (!id) {
        return of(null);
      }
      return this.apiService.getCompany(id);
    }),
    catchError(error => {
      return of(null);
    })
  );
}
