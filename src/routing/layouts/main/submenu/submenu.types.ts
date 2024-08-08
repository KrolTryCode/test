import { SvgIconTypeMap } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import { FC, SVGProps } from 'react';

type MuiIcon = OverridableComponent<SvgIconTypeMap<object, 'svg'>> & {
  muiName: string;
};

export type MenuIcon = MuiIcon | FC<SVGProps<SVGSVGElement> & { title?: string | undefined }>;

export interface SidebarLink {
  path: string;
  Icon: MenuIcon;
  label: string;
}
