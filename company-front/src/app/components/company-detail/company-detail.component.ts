import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  selector: 'app-company-detail',
  imports: [],
  standalone: true,
  templateUrl: './company-detail.component.html',
  styleUrl: './company-detail.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CompanyDetailComponent {

}
