import { Tab } from '@mui/material';
import { GridActionsCellItem } from '@mui/x-data-grid-premium';
import { Button } from '@pspod/ui-components';
import { createLink } from '@tanstack/react-router';

export const TabLink = createLink(Tab);
export const ButtonLink = createLink(Button);
export const GridActionsCellItemLink = createLink(GridActionsCellItem);
