import { Stack, Typography } from '@mui/material';
import {
  GridEventListener,
  GridRenderCellParams,
  GridRowEditStopReasons,
  useGridApiRef,
} from '@mui/x-data-grid-premium';
import {
  Accordion,
  AddEntity,
  DataGrid,
  EnhancedColDef,
  StringEditingCell,
} from '@pspod/ui-components';
import { FC, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { useGetEditRowActions } from '~/components/datagrid/use-get-edit-row-actions.hook';
import { externalLinkFormModal } from '~/components/forms/external-link/external-link-form';
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

function ExternalLinksTable() {
  const { t } = useTranslation();
  const apiRef = useGridApiRef();
  const declinatedTranslations = useDeclinatedTranslationsContext();

  const { links, isLoading, changeLinkOrder, createLink, updateLink, deleteLink, validateEmpty } =
    useExternalLinks();

  const { getActions, onRowModesModelChange, rowModesModel } =
    useGetEditRowActions<ExternalLinkWithId>({
      apiRef,
      entityAccusative: declinatedTranslations.LINK.ACCUSATIVE.toLowerCase(),
    });

  const handleAddClick = useCallback(() => {
    externalLinkFormModal({
      title: t('ACTION.ADD', { type: declinatedTranslations.LINK.ACCUSATIVE.toLowerCase() }),
      onOk: data => createLink({ ...data, order: links.length + 1, id: '' }),
    });
  }, [createLink, declinatedTranslations.LINK.ACCUSATIVE, links.length, t]);

  const handleUpdate = useCallback(
    async (newRow: ExternalLinkWithId, oldRow: ExternalLinkWithId) => {
      try {
        await updateLink(newRow);
        return newRow;
      } catch (_e) {
        return oldRow;
      }
    },
    [updateLink],
  );

  const handleOrderChange = useCallback<GridEventListener<'rowOrderChange'>>(
    props => void changeLinkOrder(props),
    [changeLinkOrder],
  );

  const handleDelete = useCallback(
    (id: string) => {
      void deleteLink(id);
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
      items={links}
      totalCount={links.length}
      loading={isLoading}
      editMode={'row'}
      rowModesModel={rowModesModel}
      onRowModesModelChange={onRowModesModelChange}
      rowReordering
      onRowOrderChange={handleOrderChange}
      processRowUpdate={handleUpdate}
      onRowEditStop={onRowEditStop}
      customToolbarContent={<AddEntity onClick={handleAddClick} />}
    />
  );
}

function renderLinkCell(
  params: GridRenderCellParams<ExternalLinkWithId, ExternalLinkWithId['url']>,
) {
  if (params.value) {
    return (
      <Typography component={'a'} href={params.value} target={'_blank'} rel={'noopener noreferrer'}>
        {params.value}
      </Typography>
    );
  }
}
