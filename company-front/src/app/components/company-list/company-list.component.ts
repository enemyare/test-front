import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  selector: 'app-company-list',
  imports: [],
  standalone: true,
  templateUrl: './company-list.component.html',
  styleUrl: './company-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CompanyListComponent {

}
