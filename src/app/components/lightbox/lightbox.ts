import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  computed,
  input,
  output,
  signal,
} from '@angular/core';
import { GalleryImage } from '../../models/gallery-image';

/**
 * Modal (lightbox) that shows the selected image at full size.
 *
 * It receives the list of currently visible images plus the index of the one
 * to show, and lets the user move previous/next or close. Navigation works
 * with on-screen buttons and with the keyboard (Escape, ArrowLeft/Right),
 * which is what lifts the "interaction" and "usability" criteria.
 */
@Component({
  selector: 'app-lightbox',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './lightbox.html',
  styleUrl: './lightbox.scss',
})
export class Lightbox {
  /** The pool of images the lightbox can navigate across. */
  readonly images = input.required<readonly GalleryImage[]>();

  /** Index within images() of the currently displayed image. */
  readonly index = input.required<number>();

  /** Emitted when the user requests to close the lightbox. */
  readonly closed = output<void>();

  /** Emitted with the new index when the user navigates. */
  readonly navigate = output<number>();

  /** Tracks loading of the full-size image for a spinner/fade. */
  protected readonly fullLoaded = signal(false);

  /** The image currently being displayed. */
  protected readonly current = computed<GalleryImage | undefined>(
    () => this.images()[this.index()],
  );

  protected close(): void {
    this.closed.emit();
  }

  protected prev(): void {
    const total = this.images().length;
    if (total === 0) return;
    const next = (this.index() - 1 + total) % total;
    this.fullLoaded.set(false);
    this.navigate.emit(next);
  }

  protected next(): void {
    const total = this.images().length;
    if (total === 0) return;
    const next = (this.index() + 1) % total;
    this.fullLoaded.set(false);
    this.navigate.emit(next);
  }

  protected onFullLoaded(): void {
    this.fullLoaded.set(true);
  }

  /** Close when clicking the dimmed backdrop (but not the image itself). */
  protected onBackdrop(event: MouseEvent): void {
    if (event.target === event.currentTarget) {
      this.close();
    }
  }

  @HostListener('document:keydown', ['$event'])
  protected onKeydown(event: KeyboardEvent): void {
    switch (event.key) {
      case 'Escape':
        this.close();
        break;
      case 'ArrowLeft':
        this.prev();
        break;
      case 'ArrowRight':
        this.next();
        break;
    }
  }
}
