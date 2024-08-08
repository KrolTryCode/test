import { startOfQuarter } from 'date-fns';
import { ContentReadyEvent, TaskEditDialogShowingEvent } from 'devextreme/ui/gantt';
import TreeList from 'devextreme/ui/tree_list';
import DxGantt, { FilterRow, StripLine, Tasks } from 'devextreme-react/gantt';
import { FC, useLayoutEffect, useRef, useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { Preloader } from '~/ui-components/preloader/preloader.component';

import { GanttItem, GanttProps } from './gantt.types';
import { GanttTooltip } from './tooltip/gantt-tooltip.component';

import 'devexpress-gantt/dist/dx-gantt.css';

export const Gantt: FC<GanttProps> = ({
  data,
  columns,
  shouldRepaint,
  selectedId,
  startDate,
  hideDetailPopup = true,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const { t } = useTranslation();
  const ref = useRef<DxGantt>(null);

  useLayoutEffect(() => {
    if (shouldRepaint && isLoaded) {
      ref.current?.instance.repaint();
    }
  }, [shouldRepaint, isLoaded]);

  const onContentReady = useCallback(
    (e: ContentReadyEvent) => {
      const element = e.element.querySelector('.dx-treelist.dx-widget');
      const instance = TreeList.getInstance(element!);
      instance.option('focusedRowEnabled', true);
      instance.option('autoNavigateToFocusedRow', true);
      instance.option('focusedRowKey', `${selectedId}`);
      setIsLoaded(true);
      if (startDate) {
        setTimeout(() => ref.current?.instance.scrollToDate(startOfQuarter(startDate)), 100);
      }
    },
    [selectedId, startDate],
  );

  const onTaskEditDialogShowing = useCallback(
    (event: TaskEditDialogShowingEvent) => {
      event.cancel = hideDetailPopup;
    },
    [hideDetailPopup],
  );

  return (
    <>
      <DxGantt
        taskListWidth={500}
        height={'100%'}
        taskTitlePosition={'none'}
        ref={ref}
        scaleType={'quarters'}
        onContentReady={onContentReady}
        onTaskEditDialogShowing={onTaskEditDialogShowing}
        contextMenu={{ enabled: !hideDetailPopup }}
        taskTooltipContentRender={renderTooltip}
        style={ganttStyles}
      >
        <StripLine
          start={new Date()}
          title={t('COMMON.CURRENT', { what: t('COMMON.DATE').toLowerCase() })}
        />
        <FilterRow visible />
        <Tasks dataSource={data} />
        {columns}
      </DxGantt>
      {!isLoaded && <Preloader />}
    </>
  );
};

const ganttStyles = { zIndex: 0 };

function renderTooltip(params: GanttItem) {
  return <GanttTooltip e={params} />;
}
