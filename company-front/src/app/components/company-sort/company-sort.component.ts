import {ChangeDetectionStrategy, Component, signal} from '@angular/core';

type DirectionType = "asc" | "desc";

@Component({
  selector: 'app-company-sort',
  imports: [],
  standalone: true,
  templateUrl: './company-sort.component.html',
  styleUrl: './company-sort.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CompanySortComponent {
  sortDirection = signal<DirectionType>("asc");


  sortAsc (){

  }

  sortDesc (){

  }
}
