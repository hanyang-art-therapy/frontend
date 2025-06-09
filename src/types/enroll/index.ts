import type { LucideIcon } from 'lucide-react';

export type ContactItem = {
  readonly icon: LucideIcon;
  readonly title: string;
  readonly link?: string;
  readonly linkText?: string;
  readonly content?: string;
  readonly bgColor: string;
};
