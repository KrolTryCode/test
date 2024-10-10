import { BoxProps } from '@mui/material';

export interface SummaryTableProps extends BoxProps {
  data: SummaryEntry[];
  heading?: string;
  hideEmpty?: boolean;
}

export interface SummaryEntry {
  title: string;
  type?: 'string' | 'number' | 'date' | 'boolean';
  value: string | number | null | boolean | undefined;
}
