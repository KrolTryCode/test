import {
  getGridDateOperators,
  getGridNumericOperators,
  getGridStringOperators,
  GridFeatureMode,
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
  isEmpty = 'isEmpty',
}

export function getGridCommonStringOperators(pagingMode?: GridFeatureMode) {
  return getGridStringOperators().filter(({ value }) =>
    (
      [
        GridFilterOperatorValue.Contains,
        GridFilterOperatorValue.StartsWith,
        GridFilterOperatorValue.EndsWith,
        GridFilterOperatorValue.Equals,
        GridFilterOperatorValue.IsAnyOf,
        ...(pagingMode === 'client' ? [GridFilterOperatorValue.isEmpty] : []),
      ] as string[]
    ).includes(value),
  );
}

export function getGridCommonNumericOperators(pagingMode?: GridFeatureMode) {
  return getGridNumericOperators().filter(({ value }) =>
    (
      [
        GridFilterOperatorValue.EqualSign,
        GridFilterOperatorValue.NotEqualSign,
        GridFilterOperatorValue.GTESign,
        GridFilterOperatorValue.LTESign,
        GridFilterOperatorValue.IsAnyOf,
        ...(pagingMode === 'client' ? [GridFilterOperatorValue.isEmpty] : []),
      ] as string[]
    ).includes(value),
  );
}

export function getGridCommonDateOperators(
  { type = 'dateTime' }: EnhancedColDef,
  pagingMode?: GridFeatureMode,
) {
  return getGridDateOperators(type === 'dateTime')
    .filter(({ value }) =>
      (
        [
          GridFilterOperatorValue.Is,
          GridFilterOperatorValue.Not,
          GridFilterOperatorValue.OnOrAfter,
          GridFilterOperatorValue.OnOrBefore,
          ...(pagingMode === 'client' ? [GridFilterOperatorValue.isEmpty] : []),
        ] as string[]
      ).includes(value),
    )
    .map(operator => {
      if (operator.value === (GridFilterOperatorValue.isEmpty as string)) {
        return operator;
      }
      return {
        ...operator,
        InputComponent: GridCustomDateTimeFilter,
        InputComponentProps: {
          pickerType: type,
        },
      };
    });
}
