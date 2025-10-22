import { ReactNode } from 'react';

export interface NavigationItem {
  label: string;
  href: string;
  icon: ReactNode;
}