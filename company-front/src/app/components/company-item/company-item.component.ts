import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {Company} from '../../model/company.interface';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-company-item',
  imports: [
    RouterLink
  ],
  standalone: true,
  templateUrl: './company-item.component.html',
  styleUrl: './company-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CompanyItemComponent {
  @Input({ required: true }) company!: Company;
}
