import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {Company} from '../../model/company.types';
import {RouterLink} from '@angular/router';
import {CompanyNamePipe} from '../../pipes/company-name-pipe';

@Component({
  selector: 'app-company-item',
  imports: [
    RouterLink,
    CompanyNamePipe
  ],
  standalone: true,
  templateUrl: './company-item.component.html',
  styleUrl: './company-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CompanyItemComponent {
  @Input({ required: true }) company!: Company;
}
