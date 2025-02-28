import { Typography } from '@mui/material';
import { Link } from '@tanstack/react-router';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { string as yString } from 'yup';

import { getDateFromString } from '~/utils/date/get-date-from-string';

import { StyledTable } from './summary-table.style';
import { SummaryEntry, SummaryTableProps } from './summary-table.type';

const emptySchema = yString().required();

const SummaryTable: FC<SummaryTableProps> = ({
  data,
  heading,
  hideEmpty = false,
  alignTitle = 'right',
  ...props
}) => {
  const { i18n, t } = useTranslation();

  const getLocaleDateString = (dateStr?: string) =>
    getDateFromString(dateStr)?.toLocaleDateString(i18n.language);

  const getLocaleDateTimeString = (dateStr?: string) =>
    getDateFromString(dateStr)?.toLocaleString(i18n.language);

  const getValueBasedOnType = ({ value, type, ...rest }: SummaryEntry) => {
    if (value === null || value === undefined || value === '') {
      return <span style={{ opacity: 0.25 }}>—</span>;
    }

    switch (type) {
      case 'dateTime': {
        return getLocaleDateTimeString(String(value));
      }
      case 'date': {
        return getLocaleDateString(String(value));
      }
      case 'boolean': {
        return value ? t('COMMON.YES') : t('COMMON.NO');
      }
      case 'link': {
        if (value) {
          // @ts-expect-error type
          return <Link {...rest.to}>{value}</Link>;
        }
        return value;
      }
      case 'custom':
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
        {data.map(entry => (
          <Typography
            component={'tr'}
            key={entry.title}
            hidden={hideEmpty && !emptySchema.isValidSync(entry.value)}
          >
            <Typography component={'th'} variant={'subtitle2'} textAlign={alignTitle}>
              {entry.title}
            </Typography>
            <Typography component={'td'} variant={'subtitle2'} fontWeight={'normal !important'}>
              {getValueBasedOnType(entry)}
            </Typography>
          </Typography>
        ))}
      </tbody>
    </StyledTable>
  );
};

export type { SummaryEntry };
export { SummaryTable };
