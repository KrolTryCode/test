import { Stack, Typography } from '@mui/material';
import {
  GridEventListener,
  GridRenderCellParams,
  GridRowEditStopReasons,
  GridRowModes,
  useGridApiRef,
} from '@mui/x-data-grid-premium';
import {
  Accordion,
  AddEntity,
  DataGrid,
  EnhancedColDef,
  StringEditingCell,
} from '@pspod/ui-components';
import { FC, useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useGetEditRowActions } from '~/components/datagrid/use-get-edit-row-actions.hook';
import { useDeclinatedTranslationsContext } from '~/utils/configuration/translations/declinated-translations-provider';

import { useExternalLinks, ExternalLinkWithId } from './external-links.hook';

export const ExternalLinks: FC = () => {
  const { t } = useTranslation();

  return (
    <Accordion
      text={t('ENTITY.EXTERNAL_SERVICES')}
      content={
        <Stack minHeight={'200px'}>
          <ExternalLinksTable />
        </Stack>
      }
    />
  );
};

const NEW_ID = 'new';

function ExternalLinksTable() {
  const { t } = useTranslation();
  const apiRef = useGridApiRef();
  const declinatedTranslations = useDeclinatedTranslationsContext();
  const [showNew, setShowNew] = useState(false);

  const { links, isLoading, changeLinkOrder, createLink, updateLink, deleteLink, validateEmpty } =
    useExternalLinks();

  const onCancelUpdate = useCallback((id: string) => {
    if (id === NEW_ID) {
      setShowNew(false);
    }
  }, []);

  const { getActions, onRowModesModelChange, rowModesModel } =
    useGetEditRowActions<ExternalLinkWithId>({
      apiRef,
      onCancelUpdate,
      entityAccusative: declinatedTranslations.LINK.ACCUSATIVE.toLowerCase(),
    });

  const handleAddClick = useCallback(() => {
    setShowNew(true);
    onRowModesModelChange(oldModel => ({
      ...oldModel,
      [NEW_ID]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
    }));
  }, [onRowModesModelChange]);

  const handleUpdate = useCallback(
    async (newRow: ExternalLinkWithId, oldRow: ExternalLinkWithId) => {
      const isInvalid = !newRow.name || !newRow.url;
      const isAdding = newRow.id === NEW_ID;

      if (isInvalid && isAdding) {
        // т.к. в случае отмены добавления нового столбца вернуть нечего, а функция такое не предусматривает,
        // кидаем ошибку, которая обрабатывается в handleUpdateError
        throw Error('new is invalid', { cause: 1 });
      }

      try {
        const mutate = isAdding ? createLink : updateLink;
        await mutate(newRow);
        setShowNew(false);
        return newRow;
      } catch (_e) {
        return oldRow;
      }
    },
    [createLink, updateLink],
  );

  const handleUpdateError = useCallback((error: Error) => {
    switch (error.cause) {
      case 1: {
        setShowNew(false);
        break;
      }
      default: {
        console.error(error.message);
      }
    }
  }, []);

  const handleOrderChange = useCallback<GridEventListener<'rowOrderChange'>>(
    props => void changeLinkOrder(props),
    [changeLinkOrder],
  );

  const handleDelete = useCallback(
    (id: string) => {
      void deleteLink(id);
      setShowNew(false);
    },
    [deleteLink],
  );

  const columns = useMemo<EnhancedColDef<ExternalLinkWithId>[]>(() => {
    return [
      {
        field: 'name',
        headerName: t('COMMON.TEXT'),
        flex: 1,
        editable: true,
        sortable: false,
        preProcessEditCellProps: validateEmpty,
        renderEditCell: params => <StringEditingCell {...params} />,
      },
      {
        field: 'url',
        headerName: 'URL',
        flex: 2,
        editable: true,
        sortable: false,
        preProcessEditCellProps: validateEmpty,
        renderCell: renderLinkCell,
        renderEditCell: params => <StringEditingCell {...params} />,
      },
      {
        field: 'actions',
        type: 'actions',
        width: 84,
        getActions: getActions(handleDelete),
      },
    ];
  }, [getActions, handleDelete, t, validateEmpty]);

  const onRowEditStop: GridEventListener<'rowEditStop'> = (params, event) => {
    if (params.reason === GridRowEditStopReasons.enterKeyDown) {
      event.defaultMuiPrevented = true;
    }
  };

  return (
    <DataGrid<ExternalLinkWithId>
      ref={apiRef}
      columns={columns}
      items={links.concat(
        showNew ? [{ name: '', url: '', order: links.length + 1, id: NEW_ID }] : [],
      )}
      totalCount={links.length}
      loading={isLoading}
      editMode={'row'}
      rowModesModel={rowModesModel}
      onRowModesModelChange={onRowModesModelChange}
      rowReordering
      onRowOrderChange={handleOrderChange}
      processRowUpdate={handleUpdate}
      onProcessRowUpdateError={handleUpdateError}
      onRowEditStop={onRowEditStop}
      customToolbarContent={<AddEntity onClick={handleAddClick} />}
    />
  );
}

function renderLinkCell(
  params: GridRenderCellParams<ExternalLinkWithId, ExternalLinkWithId['url']>,
) {
  if (params.rowNode.type === 'group') {
    return params.formattedValue;
  }

  if (params.value) {
    return (
      <Typography component={'a'} href={params.value} target={'_blank'} rel={'noopener noreferrer'}>
        {params.value}
      </Typography>
    );
  }
}
