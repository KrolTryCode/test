import { Search } from '@mui/icons-material';
import { GridPanelHeader } from '@mui/x-data-grid-premium';
import { InputText } from '@pspod/ui-components';
import { FC, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

export const SearchColumns: FC<{ searchText: string; onChange: (searchValue: string) => void }> = ({
  searchText,
  onChange,
}) => {
  const { t } = useTranslation();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <GridPanelHeader style={{ padding: '20px' }}>
      <InputText
        inputRef={inputRef}
        value={searchText}
        onChange={onChange}
        placeholder={t('COMMON.SEARCH_COLUMNS')}
        variant={'outlined'}
        startIcon={<Search />}
      />
    </GridPanelHeader>
  );
};
