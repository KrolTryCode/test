import {
  GridFooterContainer,
  GridSlotProps,
  GridPagination,
  gridFilteredTopLevelRowCountSelector,
  useGridApiContext,
  useGridRootProps,
  useGridSelector,
} from '@mui/x-data-grid-premium';
import { forwardRef } from 'react';

import { FontSizeSettings } from '../_font-size-settings/font-size-settings.component';

import { CustomGridPagination } from './pagination.component';

export const GridFooter = forwardRef<HTMLDivElement, GridSlotProps['footer']>(function GridFooter(
  { gridId, hasFontSizeSettings, ...footerProps },
  ref,
) {
  const apiRef = useGridApiContext();
  const { paginationMode, rowCount } = useGridRootProps();

  const visibleTopLevelRowCount = useGridSelector(apiRef, gridFilteredTopLevelRowCountSelector);

  return (
    <GridFooterContainer {...footerProps} ref={ref}>
      {hasFontSizeSettings && <FontSizeSettings gridId={gridId} />}
      <GridPagination
        ActionsComponent={CustomGridPagination}
        count={paginationMode === 'server' ? rowCount : visibleTopLevelRowCount}
      />
    </GridFooterContainer>
  );
});
