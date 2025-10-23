import { Routes } from '@angular/router';
import {CompanyListComponent} from './components/company-list/company-list.component';
import {LayoutComponent} from './components/layout-component/layout-component.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: CompanyListComponent
      },
      {
        path: 'detail/:id',
        loadComponent: () =>
          import('./components/company-detail/company-detail.component').then(
            (m) => m.CompanyDetailComponent
          ),
      },
      {
        path: 'map',
        loadComponent: () =>
          import('./components/company-yandex-map/company-yandex-map.component').then(
            (m) => m.CompanyYandexMapComponent
          ),
      },
    ]
  },

];
