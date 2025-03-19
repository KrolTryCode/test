import { GridEditCellProps, GridPreProcessEditCellProps } from '@mui/x-data-grid-premium';
import { notifySuccess } from '@pspod/ui-components';
import { useQuery } from '@tanstack/react-query';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { getExternalLinksQueryOptions } from '~/api/queries/settings/get-external-links.query';
import { useUpdateLinksConfigurationMutation } from '~/api/queries/settings/update-external-links.mutation';
import { ExternalLink } from '~/api/utils/api-requests';
import { showErrorMessage } from '~/utils/show-error-message';

interface EnhancedGridEditCellProps<V = any> extends GridEditCellProps<V> {
  error?: boolean | string;
}

export interface ExternalLinkWithId extends ExternalLink {
  id: string;
}

export const useExternalLinks = () => {
  const { t } = useTranslation();
  const { data: links = [], isLoading: isConfigLoading } = useQuery(
    getExternalLinksQueryOptions<ExternalLinkWithId[]>({
      select: data => data.links.map(v => ({ ...v, id: v.order.toString() })),
    }),
  );

  const { mutateAsync: updateLinks, isPending } = useUpdateLinksConfigurationMutation();

  const changeLinkOrder = useCallback(
    async ({ oldIndex, targetIndex }: { oldIndex: number; targetIndex: number }) => {
      try {
        const linksCopy = [...links];
        const movedLink = linksCopy.splice(oldIndex, 1)[0];
        linksCopy.splice(targetIndex, 0, movedLink);
        const updatedLinks = linksCopy.map(updateLinkOrderBasedOnIndex);

        await updateLinks({ links: updatedLinks });
        notifySuccess(t('MESSAGE.UPDATE_SUCCESS'));
      } catch (e) {
        showErrorMessage(e, 'ERROR.UPDATE_FAILED');
      }
    },
    [links, t, updateLinks],
  );

  const deleteLink = useCallback(
    async (linkId: string) => {
      try {
        const updatedLinks = links.filter(link => link.order.toString() !== linkId) ?? [];
        await updateLinks({ links: updatedLinks.map(updateLinkOrderBasedOnIndex) });
        notifySuccess(t('MESSAGE.DELETION_SUCCESS'));
      } catch (e) {
        showErrorMessage(e, 'ERROR.DELETION_FAILED');
      }
    },
    [links, t, updateLinks],
  );

  const createLink = useCallback(
    async (newLink: ExternalLinkWithId) => {
      try {
        await updateLinks({ links: [...links, newLink] });
        notifySuccess(t('MESSAGE.CREATION_SUCCESS'));
      } catch (e) {
        showErrorMessage(e, 'ERROR.CREATION_FAILED');
      }
    },
    [links, t, updateLinks],
  );

  const updateLink = useCallback(
    async (updatedLink: ExternalLinkWithId) => {
      try {
        const linksCopy = [...links];
        const linkIndex = linksCopy.findIndex(link => link.id === updatedLink.id);
        linksCopy[linkIndex] = updatedLink;

        await updateLinks({ links: linksCopy });
        notifySuccess(t('MESSAGE.UPDATE_SUCCESS'));
      } catch (e) {
        showErrorMessage(e, 'ERROR.UPDATE_FAILED');
      }
    },
    [links, t, updateLinks],
  );

  const validateEmpty = useCallback(
    (
      params: GridPreProcessEditCellProps<any, ExternalLinkWithId>,
    ): EnhancedGridEditCellProps<any> => {
      if (params.hasChanged && !params.props.value) {
        return { ...params.props, error: t('yup:mixed.required') };
      }

      return { ...params.props, error: false };
    },
    [t],
  );

  return {
    links,
    isLoading: isPending || isConfigLoading,
    changeLinkOrder,
    createLink,
    updateLink,
    deleteLink,
    validateEmpty,
  };
};

function updateLinkOrderBasedOnIndex(link: ExternalLinkWithId, index: number) {
  return { ...link, order: index + 1 };
}
