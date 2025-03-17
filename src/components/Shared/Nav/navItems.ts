import { ComponentType } from 'react';
import { Home, Book, Paid, Email } from '@mui/icons-material';
import { SvgIconTypeMap } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';

type IconType = OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
  muiName: string;
};

export type NavItemType = {
  label: string;
  path: string;
  icon: IconType;
};

export const NAV_ITEMS: NavItemType[] = [
  { label: 'Home', path: '/', icon: Home },
  { label: 'Solutions', path: '/solutions', icon: Paid },
  { label: 'Resources', path: '/resources', icon: Book },
  { label: 'Pricing', path: '/pricing', icon: Book },
  { label: 'Contact', path: '/contact', icon: Email }

];


