import { BoxProps } from '@mui/material';
import { ToOptions } from '@tanstack/react-router';
import { ReactNode } from 'react';

export interface SummaryTableProps extends BoxProps {
  data: SummaryEntry[];
  heading?: string;
  hideEmpty?: boolean;
  alignTitle?: 'left' | 'right';
}

interface SummaryEntryLink {
  type: 'link';
  to: ToOptions;
  title: string;
  value: string | undefined;
}

interface CustomEntry {
  type: 'custom';
  value: ReactNode;
  title: string;
}

interface CommonSummaryEntry {
  title: string;
  type?: 'string' | 'number' | 'date' | 'dateTime' | 'boolean';
  value: string | number | null | boolean | undefined;
}

export type SummaryEntry = CommonSummaryEntry | SummaryEntryLink | CustomEntry;
