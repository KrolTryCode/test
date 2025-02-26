import { FileCardProps } from '@pspod/ui-components';
import { useQuery } from '@tanstack/react-query';
import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { getFileQueryOptions } from '~/api/queries/files/download-file.query';
import { getSolverFileQueryOptions } from '~/api/queries/solvers/get-solver-file.query';
import { calcFileSize, downloadBlobFile, getFileIcon } from '~/utils/files';

export const useGetSolverFile = (solverId?: string) => {
  const { t } = useTranslation();

  const {
    data: solverFile,
    isFetching: isFetchingSolverFile,
    isFetched: isFetchedSolverFile,
  } = useQuery(
    getSolverFileQueryOptions(solverId!, {
      enabled: !!solverId,
    }),
  );

  const {
    data: file,
    isFetching,
    isFetched,
  } = useQuery(
    getFileQueryOptions(solverFile?.fileId ?? '', {
      enabled: !!solverFile?.fileId,
      params: { format: 'blob' },
      select: data => ({ file: data as Blob, ...solverFile }),
    }),
  );

  const onDownloadFile = useCallback(() => {
    if (file) {
      downloadBlobFile(file.file, file.fileName ?? '');
    }
  }, [file]);

  const fileCardProps = useMemo<FileCardProps | undefined>(() => {
    if (file?.fileId) {
      return {
        name: file.fileName!,
        id: file.fileId,
        onDownload: onDownloadFile,
        description: `${t('COMMON.SIZE')}: ${calcFileSize(file.file.size)}`,
        CustomIcon: getFileIcon('zip'),
      };
    }
  }, [file, onDownloadFile, t]);

  return {
    fileCardProps,
    file,
    onDownloadFile,
    isFetching: isFetchingSolverFile || isFetching,
    isFetched: isFetchedSolverFile || isFetched,
  };
};
