import { UploadImage } from '@pspod/ui-components';
import { useQueryClient } from '@tanstack/react-query';
import { FC, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { useCreateProjectFileMutation } from '~/api/queries/projects/create-project-file.mutation';
import { projectQueries } from '~/api/queries/projects/queries';
import { ProjectNodeType } from '~/api/utils/api-requests';
import { NodeLogo } from '~/components/node-logo/node-logo.component';
import { useUploadFile } from '~/components/upload-file/use-upload-file.hook';
import { fileTypeExtensions, validateSelectedFiles } from '~/utils/files/validate-files';

interface EditableNodeLogoProps {
  nodeId: string;
  nodeName?: string;
  nodeType?: ProjectNodeType;
}

const extensions = fileTypeExtensions['image'];

export const EditableNodeLogo: FC<EditableNodeLogoProps> = ({ nodeId, nodeName, nodeType }) => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  const { mutateAsync: createLogo, isPending: isCreatingFile } =
    useCreateProjectFileMutation(nodeId);

  const { handleUpload, isUploading } = useUploadFile();

  const getFileId = useCallback(
    (originalName: string) => async () => {
      const { fileId } = await createLogo({ type: 'logo', data: {}, originalName });
      return fileId;
    },
    [createLogo],
  );

  const handleUploadFile = useCallback(
    async (file: File) => {
      const isValid = !!validateSelectedFiles([file], 'image').length;
      if (isValid) {
        await handleUpload(getFileId(file.name), file);
        await queryClient.invalidateQueries({ queryKey: projectQueries.logo(nodeId).queryKey });
      }
    },
    [getFileId, handleUpload, nodeId, queryClient],
  );

  return (
    <UploadImage
      className={'project-logo'}
      alt={`${t('ENTITY.LOGO')} ${nodeName}`}
      accept={extensions.join(', ')}
      onSelect={handleUploadFile}
      isLoading={isCreatingFile || isUploading}
      variant={'rounded'}
      CustomAvatar={<NodeLogo nodeId={nodeId} nodeName={nodeName} nodeType={nodeType} />}
    />
  );
};
