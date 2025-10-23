import {ChangeDetectionStrategy, Component, inject, signal} from '@angular/core';
import {
  YMapComponent,
  YMapDefaultFeaturesLayerDirective, YMapDefaultMarkerDirective,
  YMapDefaultSchemeLayerDirective
} from 'angular-yandex-maps-v3';
import {CompanyFacadeService} from '../../services/company-facade.service';
import {Company} from '../../model/company.types';


@Component({
  selector: 'app-company-yandex-map',
  imports: [
    YMapDefaultSchemeLayerDirective,
    YMapComponent,
    YMapDefaultFeaturesLayerDirective,
    YMapDefaultMarkerDirective,
  ],
  standalone: true,
  templateUrl: './company-yandex-map.component.html',
  styleUrl: './company-yandex-map.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CompanyYandexMapComponent {
  private readonly companyServce = inject(CompanyFacadeService)
  companies = this.companyServce.companies
  visibleCount = signal(5);
  center = signal<[number, number]>([37.623082, 55.75254]);

  focusCompany(company: Company) {
    this.center.set([company.longitude, company.latitude]);
  }

  showAll() {
    this.visibleCount.set(this.companies()?.length ?? 0);
  }

  get visibleCompanies(): Company[]  {
    return this.companies()?.slice(0, this.visibleCount()) ?? [];
  }
}
