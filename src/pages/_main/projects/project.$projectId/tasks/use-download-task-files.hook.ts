import { useEffect, useState } from 'react';

import { useGetFileQuery } from '~/api/queries/files/download-file.query';
import { ApiClientSecured } from '~/api/utils/api-client';
import { FullTaskFileInfo } from '~/api/utils/api-requests';
import { downloadBlobFile } from '~/utils/files';

export const useDownloadTaskFiles = () => {
  const [currentSolverFile, setCurrentSolverFile] = useState<FullTaskFileInfo | null>();
  const { data: currentFile } = useGetFileQuery(currentSolverFile?.fileId ?? '', {
    enabled: !!currentSolverFile?.fileId,
    params: { format: 'blob' },
  });

  const handleDownloadFile = async (taskId: string) => {
    setCurrentSolverFile(null);
    await ApiClientSecured.tasksV1Controller.getTaskFiles(taskId).then(res => {
      const solverFile = res.find(it => it.type === 'solver');
      setCurrentSolverFile(solverFile);
    });
  };

  useEffect(() => {
    if (currentFile) {
      downloadBlobFile(currentFile, currentSolverFile?.fileName ?? '');
      setCurrentSolverFile(null);
    }
  }, [currentFile, currentSolverFile?.fileName]);

  return { handleDownloadFile };
};
