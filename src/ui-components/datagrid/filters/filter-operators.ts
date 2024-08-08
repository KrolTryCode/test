import {
  getGridDateOperators,
  getGridNumericOperators,
  getGridStringOperators,
} from '@mui/x-data-grid-premium';

import { EnhancedColDef } from '~/ui-components/datagrid/datagrid.types';

import { GridCustomDateTimeFilter } from './components/date-time-filter-input.component';

export enum GridFilterOperatorValue {
  Contains = 'contains',
  StartsWith = 'startsWith',
  EndsWith = 'endsWith',
  Equals = 'equals',
  IsAnyOf = 'isAnyOf',
  EqualSign = '=',
  NotEqualSign = '!=',
  GTESign = '>=',
  LTESign = '<=',
  Is = 'is',
  Not = 'not',
  OnOrAfter = 'onOrAfter',
  OnOrBefore = 'onOrBefore',
}

export function getGridCommonStringOperators() {
  return getGridStringOperators().filter(({ value }) =>
    (
      [
        GridFilterOperatorValue.Contains,
        GridFilterOperatorValue.StartsWith,
        GridFilterOperatorValue.EndsWith,
        GridFilterOperatorValue.Equals,
        GridFilterOperatorValue.IsAnyOf,
      ] as string[]
    ).includes(value),
  );
}

export function getGridCommonNumericOperators() {
  return getGridNumericOperators().filter(({ value }) =>
    (
      [
        GridFilterOperatorValue.EqualSign,
        GridFilterOperatorValue.NotEqualSign,
        GridFilterOperatorValue.GTESign,
        GridFilterOperatorValue.LTESign,
        GridFilterOperatorValue.IsAnyOf,
      ] as string[]
    ).includes(value),
  );
}

export function getGridCommonDateOperators({ type = 'dateTime' }: EnhancedColDef) {
  return getGridDateOperators(type === 'dateTime')
    .filter(({ value }) =>
      (
        [
          GridFilterOperatorValue.Is,
          GridFilterOperatorValue.Not,
          GridFilterOperatorValue.OnOrAfter,
          GridFilterOperatorValue.OnOrBefore,
        ] as string[]
      ).includes(value),
    )
    .map(operator => ({
      ...operator,
      InputComponent: GridCustomDateTimeFilter,
      InputComponentProps: {
        pickerType: type,
      },
    }));
}
