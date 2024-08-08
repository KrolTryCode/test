import { ReactElement } from 'react';

export interface GanttItem {
  id: string;
  title: string;
  parentId?: string;
  start?: Date;
  end?: Date;
  color?: string;
  progress?: number;
}

export interface GanttProps {
  data: GanttItem[];
  columns: ReactElement[];
  shouldRepaint?: boolean;
  selectedId?: string;
  startDate?: Date;
  hideDetailPopup?: boolean;
}
