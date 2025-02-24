import { useQuery } from '@tanstack/react-query';
import { useCallback } from 'react';

import { getFileQueryOptions } from '~/api/queries/files/download-file.query';
import { getSolverFileQueryOptions } from '~/api/queries/solvers/get-solver-file.query';
import { downloadBlobFile } from '~/utils/files';

export const useGetSolverFile = (solverId?: string) => {
  const { data: solverFile, isFetching: isFetchingSolverFile } = useQuery(
    getSolverFileQueryOptions(solverId!, {
      enabled: !!solverId,
    }),
  );

  const { data: file, isFetching: isFetchingFile } = useQuery(
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

  return {
    file,
    onDownloadFile,
    isFetching: isFetchingSolverFile || isFetchingFile,
  };
};
