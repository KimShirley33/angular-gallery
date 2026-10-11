/**
 * Domain model for a single gallery image.
 *
 * Images are described by data, never hard-coded into templates. The gallery
 * iterates over a typed collection of these objects and binds each one into a
 * presentational card component.
 */
export interface GalleryImage {
  /** Stable unique identifier, used for @for tracking. */
  readonly id: number;
  /** Full-resolution image URL shown in the lightbox. */
  readonly url: string;
  /** Smaller URL used for the grid thumbnail (performance). */
  readonly thumbnail: string;
  /** Human-readable title shown on hover and in the lightbox. */
  readonly title: string;
  /** Category used by the filter feature. */
  readonly category: ImageCategory;
  /** Author/credit for the photograph. */
  readonly author: string;
  /** Accessible description for screen readers (alt text). */
  readonly alt: string;
}

/** Categories available for filtering the gallery. */
export type ImageCategory = 'nature' | 'architecture' | 'people' | 'abstract';
