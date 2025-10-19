import {ChangeDetectionStrategy, Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-layout-component',
  imports: [
    RouterOutlet
  ],
  standalone: true,
  templateUrl: './layout-component.component.html',
  styleUrl: './layout-component.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayoutComponent {

}
