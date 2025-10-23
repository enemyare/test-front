import {Component, DestroyRef, effect, inject, OnInit} from '@angular/core';
import {CompanyFilterService} from '../../services/company-filter.service';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {debounceTime} from 'rxjs';
import {CompanyFacadeService} from '../../services/company-facade.service';

@Component({
  selector: 'app-company-filter',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './company-filter.component.html',
  styleUrl: './company-filter.component.scss'
})
export class CompanyFilterComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly filterService = inject(CompanyFilterService);
  private readonly facadeService = inject(CompanyFacadeService);
  private destroyRef = inject(DestroyRef);

  form!: FormGroup;
  companyTypes = this.filterService.typesList;
  industries = this.filterService.industriesList;

  constructor() {
    effect(() => {
      const isLoading = this.facadeService.loading();
      if (isLoading) {
        this.form.disable({emitEvent: false});
      } else {
        this.form.enable({emitEvent: false});
      }
    });
  }

  ngOnInit() {
    this.form = this.fb.group({
      name: [''],
      type: [''],
      industry: [''],
    });

    this.form.valueChanges
      .pipe(
        debounceTime(300),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((value) => {
      this.filterService.updateFilters(value);
    });
  }
}
