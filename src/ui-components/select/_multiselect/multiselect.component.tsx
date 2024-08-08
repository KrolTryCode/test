import CheckedIcon from '@mui/icons-material/CheckBoxOutlineBlankOutlined';
import UncheckedIcon from '@mui/icons-material/CheckBoxOutlined';
import { styled, Stack, TextField, ChipProps } from '@mui/material';
import Autocomplete, {
  AutocompleteRenderInputParams,
  AutocompleteRenderOptionState,
} from '@mui/material/Autocomplete';
import { HTMLAttributes, SyntheticEvent, useMemo } from 'react';

import { AutocompleteValue, InternalSelectProps } from '../select.type';

import { CheckButton } from './check-button.component';

const chipProps: ChipProps = {
  variant: 'outlined' as const,
  size: 'small' as const,
};

const StyledTextField = styled(TextField)(({ inputProps }) => ({
  '& .MuiInputBase-root': {
    paddingLeft: inputProps?.['aria-expanded'] ? '36px !important' : undefined,
  },
}));

export function Multiselect<Value extends Record<string, any>>({
  items,
  value,
  onBlur,
  onChange,
  valueExpr,
  displayExpr,
  inputProps,
  ...props
}: InternalSelectProps<Value, true>) {
  const selectValue = useMemo(
    () => items.filter(item => value?.includes(item[valueExpr!] as string)),
    [items, valueExpr, value],
  );

  const onSelect = (
    _event: SyntheticEvent<Element, Event>,
    value: AutocompleteValue<Value, true>,
  ) => {
    const newValue = value.map(v => v[valueExpr!] as string);
    onChange?.(newValue);
  };

  const toggleCheckAll = (checked: boolean) =>
    onChange?.(checked ? ([] as string[]) : items.map(v => v[valueExpr!] as string));

  const renderInput = (params: AutocompleteRenderInputParams) => {
    const isExpanded = !!params.inputProps['aria-expanded'];
    return (
      <Stack position={'relative'} direction={'row'}>
        <CheckButton
          hidden={!isExpanded}
          allCount={items.length}
          selectedCount={selectValue?.length}
          onClick={toggleCheckAll}
        />
        <StyledTextField {...params} {...inputProps} />
      </Stack>
    );
  };

  const renderOption = (
    props: HTMLAttributes<HTMLLIElement>,
    option: Value,
    { selected }: AutocompleteRenderOptionState,
  ) => {
    const Icon = selected ? UncheckedIcon : CheckedIcon;
    return (
      <Stack direction={'row'} gap={1} component={'li'} {...props}>
        <Icon fontSize={'small'} />
        {option[displayExpr!]}
      </Stack>
    );
  };

  return (
    <Autocomplete
      {...props}
      multiple
      options={items}
      value={selectValue}
      renderInput={renderInput}
      renderOption={renderOption}
      onChange={onSelect}
      onBlur={onBlur}
      ChipProps={chipProps}
      disableCloseOnSelect
    />
  );
}
