export interface SummaryTableProps {
  data: SummaryEntry[];
  heading?: string;
  hideEmpty?: boolean;
}

export interface SummaryEntry {
  title: string;
  type?: 'string' | 'number' | 'date';
  value: string | number | null | undefined;
}
