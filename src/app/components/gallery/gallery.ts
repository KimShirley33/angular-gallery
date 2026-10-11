import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { GALLERY_IMAGES } from '../../data/gallery-images';
import { GalleryImage, ImageCategory } from '../../models/gallery-image';
import { ImageCard } from '../image-card/image-card';
import { Lightbox } from '../lightbox/lightbox';

type Filter = ImageCategory | 'all';

interface FilterOption {
  readonly value: Filter;
  readonly label: string;
}

/**
 * Container component for the whole gallery.
 *
 * Responsibilities:
 *  - owns the image dataset (loaded from a typed array, not from the HTML);
 *  - owns the active category filter and derives the visible images from it;
 *  - owns the lightbox state (open/closed + which image index is shown).
 *
 * The child components (ImageCard, Lightbox) are purely presentational: they
 * receive data through inputs and report user intent through outputs.
 */
@Component({
  selector: 'app-gallery',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ImageCard, Lightbox],
  templateUrl: './gallery.html',
  styleUrl: './gallery.scss',
})
export class Gallery {
  /** Full, immutable dataset. */
  private readonly allImages = signal<readonly GalleryImage[]>(GALLERY_IMAGES);

  /** Currently selected filter. */
  protected readonly activeFilter = signal<Filter>('all');

  /** Buttons shown in the filter bar. */
  protected readonly filters: readonly FilterOption[] = [
    { value: 'all', label: 'Todas' },
    { value: 'nature', label: 'Naturaleza' },
    { value: 'architecture', label: 'Arquitectura' },
    { value: 'people', label: 'Personas' },
    { value: 'abstract', label: 'Abstracto' },
  ];

  /** Images visible under the current filter (derived state). */
  protected readonly visibleImages = computed<readonly GalleryImage[]>(() => {
    const filter = this.activeFilter();
    const images = this.allImages();
    return filter === 'all'
      ? images
      : images.filter((image) => image.category === filter);
  });

  /** Index into visibleImages() of the open image, or null if closed. */
  protected readonly lightboxIndex = signal<number | null>(null);

  /** Whether the lightbox is currently open. */
  protected readonly isLightboxOpen = computed(() => this.lightboxIndex() !== null);

  protected setFilter(filter: Filter): void {
    this.activeFilter.set(filter);
  }

  protected openLightbox(image: GalleryImage): void {
    const index = this.visibleImages().findIndex((item) => item.id === image.id);
    if (index !== -1) {
      this.lightboxIndex.set(index);
    }
  }

  protected closeLightbox(): void {
    this.lightboxIndex.set(null);
  }

  protected onNavigate(index: number): void {
    this.lightboxIndex.set(index);
  }
}
