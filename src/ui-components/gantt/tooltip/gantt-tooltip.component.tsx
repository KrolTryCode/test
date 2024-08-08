import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import styles from './gantt-tooltip.module.scss';
import { GanttTooltipProps } from './gantt-tooltip.types';

const GanttTooltip: FC<GanttTooltipProps> = ({ e }) => {
  const { t, i18n } = useTranslation();

  const locale = i18n.language;

  return (
    <div className={styles.ganttTooltip}>
      <span className={styles.ganttTooltip_item}>
        <span className={styles.ganttTooltip_item__name}>{e.title}</span>
      </span>
      {e.start && (
        <span className={styles.ganttTooltip_item}>
          <span>{t('SHIP.START_DATE')}:</span> {e.start.toLocaleDateString(locale)}
        </span>
      )}
      {e.end && (
        <span className={styles.ganttTooltip_item}>
          <span>{t('SHIP.DELIVERY_DATE')}:</span> {e.end.toLocaleDateString(locale)}
        </span>
      )}
      {e.progress !== undefined && (
        <span className={styles.ganttTooltip_item}>
          <span>{t('COMMON.READINESS')}:</span> {e.progress}
        </span>
      )}
    </div>
  );
};

export { GanttTooltip };
