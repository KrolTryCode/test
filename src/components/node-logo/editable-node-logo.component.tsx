import { PhotoCamera as CameraIcon } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { notifySuccess } from '@pspod/ui-components';
import { useQueryClient } from '@tanstack/react-query';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { useUploadFileMutation } from '~/api/queries/files/upload-file.mutation';
import { useCreateProjectFileMutation } from '~/api/queries/projects/create-project-file.mutation';
import { projectQueries } from '~/api/queries/projects/queries';
import { ProjectNodeType } from '~/api/utils/api-requests';
import { uploadFiles } from '~/utils/files';
import { handleFileUploadingError, validateFileExtension } from '~/utils/files/validate-file';

import { NodeLogo } from './node-logo.component';
import { StyledAvatarContainer, StyledBackdrop } from './node-logo.style';

interface EditableNodeLogoProps {
  nodeId: string;
  nodeName?: string;
  nodeType?: ProjectNodeType;
}

export const EditableNodeLogo: FC<EditableNodeLogoProps> = ({ nodeId, nodeName, nodeType }) => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const { mutateAsync: createLogo, isPending: isCreatingFile } =
    useCreateProjectFileMutation(nodeId);

  const { mutateAsync: uploadFile, isPending: isUploadingFile } = useUploadFileMutation();

  const handleUploadFile = async () => {
    const fileList = await uploadFiles({ isMultiple: false, fileType: 'image' });
    const file = fileList[0];

    if (!validateFileExtension(file.name, 'image', t)) {
      return;
    }

    if (file) {
      try {
        const { fileId } = await createLogo({ type: 'logo', data: {}, originalName: file.name });
        await uploadFile({ file, fileId: fileId });
        await queryClient.invalidateQueries({ queryKey: projectQueries.logo(nodeId).queryKey });
        notifySuccess(t('FILES.UPLOAD_SUCCESS'));
      } catch (e) {
        handleFileUploadingError(e);
      }
    }
  };

  return (
    <StyledAvatarContainer className={'project-logo'}>
      <NodeLogo
        nodeId={nodeId}
        nodeName={nodeName}
        nodeType={nodeType}
        isLoading={isCreatingFile || isUploadingFile}
      />
      <StyledBackdrop>
        <IconButton
          color={'inherit'}
          title={t('ACTION.LOAD', { type: t('ENTITY.LOGO').toLowerCase() })}
          onClick={handleUploadFile}
        >
          <CameraIcon fontSize={'large'} />
        </IconButton>
      </StyledBackdrop>
    </StyledAvatarContainer>
  );
};
