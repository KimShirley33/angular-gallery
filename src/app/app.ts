import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Gallery } from './components/gallery/gallery';

/**
 * Root component. Provides the page shell (header + footer) and hosts the
 * gallery container. Kept deliberately thin — all gallery logic lives in the
 * Gallery component.
 */
@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Gallery],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}
