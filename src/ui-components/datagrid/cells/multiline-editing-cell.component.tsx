// https://mui.com/x/react-data-grid/recipes-editing/#multiline-editing

import { Box, styled, InputBase, InputBaseProps } from '@mui/material';
import { GridRenderEditCellParams, useGridApiContext } from '@mui/x-data-grid-premium';
import { useState, useCallback } from 'react';

const StyledInput = styled(InputBase)<InputBaseProps>`
  padding: 0;
  textarea {
    line-height: 1.43;
    resize: 'block;
  }
`;

export function EditTextarea({ id, field, value }: GridRenderEditCellParams<any, string>) {
  const [valueState, setValueState] = useState(value);
  const apiRef = useGridApiContext();

  const handleChange = useCallback<NonNullable<InputBaseProps['onChange']>>(
    async event => {
      const newValue = event.target.value;
      setValueState(newValue);
      await apiRef.current.setEditCellValue({ id, field, value: newValue, debounceMs: 200 }, event);
    },
    [apiRef, field, id],
  );

  const handleBlur = useCallback<NonNullable<InputBaseProps['onBlur']>>(
    async event => {
      const newValue = event.target.value.trim();
      setValueState(newValue);
      await apiRef.current.setEditCellValue({ id, field, value: newValue }, event);
    },
    [apiRef, field, id],
  );

  return (
    <Box paddingBlock={1} paddingInline={2} width={'100%'}>
      <StyledInput
        multiline
        value={valueState}
        onChange={handleChange}
        onBlur={handleBlur}
        fullWidth
      />
    </Box>
  );
}
