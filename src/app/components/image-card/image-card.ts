import { ChangeDetectionStrategy, Component, input, output, signal } from '@angular/core';
import { GalleryImage } from '../../models/gallery-image';

/**
 * Presentational component for a single image in the grid.
 *
 * It owns no data of its own: the image arrives through an input and user
 * interaction leaves through an output. This keeps the card reusable and lets
 * the parent gallery stay in control of state (container/presentational).
 */
@Component({
  selector: 'app-image-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './image-card.html',
  styleUrl: './image-card.scss',
})
export class ImageCard {
  /** Image to render. Required input. */
  readonly image = input.required<GalleryImage>();

  /** Emitted when the user activates the card (click or keyboard). */
  readonly select = output<GalleryImage>();

  /** Tracks whether the thumbnail has finished loading, for a fade-in. */
  protected readonly loaded = signal(false);

  protected onSelect(): void {
    this.select.emit(this.image());
  }

  protected onLoaded(): void {
    this.loaded.set(true);
  }
}
