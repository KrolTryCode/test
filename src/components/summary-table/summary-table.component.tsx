import { Typography } from '@mui/material';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { string as yString } from 'yup';

import { getDateFromString } from '~/utils/date/get-date-from-string';

import { StyledTable } from './summary-table.style';
import { SummaryEntry, SummaryTableProps } from './summary-table.type';

const emptySchema = yString().required();

export const SummaryTable: FC<SummaryTableProps> = ({
  data,
  heading,
  hideEmpty = false,
  ...props
}) => {
  const { i18n, t } = useTranslation();

  const getLocaleDateString = (dateStr?: string) =>
    getDateFromString(dateStr)?.toLocaleDateString(i18n.language);

  const getValueBasedOnType = (value: SummaryEntry['value'], type: SummaryEntry['type']) => {
    if (value === null || value === undefined) {
      return t('STATUS.UNDEFINED');
    }

    switch (type) {
      case 'date': {
        return getLocaleDateString(String(value));
      }
      case 'boolean': {
        return value ? t('COMMON.YES') : t('COMMON.NO');
      }
      case 'string':
      case 'number':
      case undefined:
      default: {
        return value;
      }
    }
  };

  return (
    <StyledTable {...props}>
      {heading && (
        <Typography component={'caption'} variant={'subtitle1'} textAlign={'left'} lineHeight={1.2}>
          {heading}
        </Typography>
      )}
      <tbody>
        {data.map(({ title, value, type = 'string' }) => (
          <Typography
            component={'tr'}
            key={title}
            hidden={hideEmpty && !emptySchema.isValidSync(value)}
          >
            <th>{title}</th>
            <td>{getValueBasedOnType(value, type)}</td>
          </Typography>
        ))}
      </tbody>
    </StyledTable>
  );
};
