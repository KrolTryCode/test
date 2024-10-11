import { Box } from '@mui/material';
import { GridRenderEditCellParams } from '@mui/x-data-grid-premium';
import { Tooltip, InputNumeric, InputNumericProps } from '@pspod/ui-components';
import { FC, useCallback, useLayoutEffect, useRef, useState } from 'react';

export const NumericEditingCell: FC<
  GridRenderEditCellParams<any, number | null> & { error?: string }
> = ({ id, field, value, formattedValue, error, hasFocus, api: apiRef }) => {
  const [valueState, setValueState] = useState(value);
  const ref = useRef<HTMLInputElement>(null);

  const handleChange = useCallback<NonNullable<InputNumericProps['onChange']>>(
    async (value, event) => {
      const newValue = value && !Number.isNaN(value) ? +value : null;
      setValueState(newValue);
      await apiRef.setEditCellValue({ id, field, value: newValue, debounceMs: 200 }, event);
    },
    [apiRef, field, id],
  );
  const handleBlur = useCallback<NonNullable<InputNumericProps['onBlur']>>(
    async event => {
      const value = error ? formattedValue : valueState;
      if (!error) {
        setValueState(value && !Number.isNaN(value) ? +value : null);

        await apiRef.setEditCellValue({ id, field, value }, event);
        apiRef.stopCellEditMode({ id, field });
      }
    },
    [apiRef, error, field, formattedValue, id, valueState],
  );

  useLayoutEffect(() => {
    if (hasFocus) {
      ref.current?.focus();
    }
  }, [hasFocus]);

  return (
    <Tooltip content={error} hasOffset={false} variant={'error'} placement={'bottom-start'}>
      <Box sx={boxStyles}>
        <InputNumeric
          invalid={!!error}
          variant={'filled'}
          value={valueState && !Number.isNaN(valueState) ? valueState.toString() : ''}
          onChange={handleChange}
          onBlur={handleBlur}
          inputRef={ref}
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
