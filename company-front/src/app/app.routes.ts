import { Routes } from '@angular/router';
import {CompanyYandexMapComponent} from './components/company-yandex-map/company-yandex-map.component';
import {CompanyDetailComponent} from './components/company-detail/company-detail.component';
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
        component: CompanyDetailComponent
      },
      {
        path: 'map',
        component: CompanyYandexMapComponent
      }
    ]
  },

];
