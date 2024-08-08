import { Typography } from '@mui/material';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { string as yString } from 'yup';

import { getDateFromString } from '~/utils/date/get-date-from-string';

import { StyledTable } from './summary-table.style';
import { SummaryTableProps } from './summary-table.type';

const emptySchema = yString().required();

export const SummaryTable: FC<SummaryTableProps> = ({ data, heading, hideEmpty = false }) => {
  const { i18n } = useTranslation();

  const getLocaleDateString = (dateStr?: string) =>
    getDateFromString(dateStr)?.toLocaleDateString(i18n.language);

  return (
    <StyledTable>
      {heading && (
        <Typography component={'caption'} variant={'subtitle1'} textAlign={'left'}>
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
            <td>{type === 'date' ? getLocaleDateString(String(value)) : value}</td>
          </Typography>
        ))}
      </tbody>
    </StyledTable>
  );
};
