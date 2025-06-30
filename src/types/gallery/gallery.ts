import type { Gallery } from '@/types';

export type ArtIntroResponse = Pick<Gallery, 'title' | 'startDate' | 'endDate'>;
