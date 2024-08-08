import { Box } from '@mui/material';
import { GridRenderEditCellParams, useGridApiContext } from '@mui/x-data-grid-premium';
import { FC, useCallback, useState } from 'react';

import { InputNumeric } from '~/ui-components/input-numeric/input-numeric.component';
import { InputNumericProps } from '~/ui-components/input-numeric/input-numeric.type';
import { Tooltip } from '~/ui-components/tooltip/tooltip.component';

export const NumericEditingCell: FC<
  GridRenderEditCellParams<any, number | null> & { error?: string }
> = ({ id, field, value, formattedValue, error }) => {
  const [valueState, setValueState] = useState(value);
  const apiRef = useGridApiContext();

  const handleChange = useCallback<NonNullable<InputNumericProps['onChange']>>(
    async (value, event) => {
      const newValue = value && !Number.isNaN(value) ? +value : null;
      setValueState(newValue);
      await apiRef.current.setEditCellValue({ id, field, value: newValue, debounceMs: 200 }, event);
    },
    [apiRef, field, id],
  );
  const handleBlur = useCallback<NonNullable<InputNumericProps['onBlur']>>(
    async event => {
      const value = error ? formattedValue : valueState;
      if (!error) {
        setValueState(value && !Number.isNaN(value) ? +value : null);
        await apiRef.current.setEditCellValue({ id, field, value }, event);
        apiRef.current.stopCellEditMode({ id, field });
      }
    },
    [apiRef, error, field, formattedValue, id, valueState],
  );

  return (
    <Tooltip content={error} hasOffset={false} variant={'error'} placement={'bottom-start'}>
      <Box sx={boxStyles}>
        <InputNumeric
          invalid={!!error}
          variant={'filled'}
          value={valueState && !Number.isNaN(valueState) ? valueState.toString() : ''}
          onChange={handleChange}
          onBlur={handleBlur}
          fullWidth
        />
      </Box>
    </Tooltip>
  );
};

const boxStyles = {
  height: 'calc(100% + 4px)',
  margin: '-2px',
  '& .MuiFormControl-root': { height: '100%' },
  '& .MuiInputBase-root': { minHeight: 0 },
  input: { padding: '0 4px' },
};
