import { BackupTable, Folder } from '@mui/icons-material';
import { CircularProgress } from '@mui/material';
import { AvatarProps } from '@pspod/ui-components';
import { FC, ReactNode, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { useGetImageQuery } from '~/api/queries/files/get-image.query';
import { useGetProjectLogoQuery } from '~/api/queries/projects/get-project-logo.query';
import { ProjectNodeType } from '~/api/utils/api-requests';

import { StyledAvatar } from './node-logo.style';

interface NodeLogoProps extends AvatarProps {
  nodeId: string;
  nodeName?: string;
  nodeType?: ProjectNodeType;
  isLoading?: boolean;
}

const nodeIcon: Record<ProjectNodeType, ReactNode> = {
  [ProjectNodeType.Group]: <Folder />,
  [ProjectNodeType.Project]: <BackupTable />,
};

export const NodeLogo: FC<NodeLogoProps> = ({
  nodeId,
  nodeName,
  nodeType,
  isLoading = false,
  size = 'medium',
}) => {
  const { t } = useTranslation();
  const { data: logoId = '', isLoading: isLogoIdLoading } = useGetProjectLogoQuery(nodeId, {
    enabled: !!nodeId,
  });
  const { data: logo, isLoading: isLogoLoading } = useGetImageQuery(logoId, {
    enabled: !!logoId,
  });

  const img = useMemo(() => {
    const img = new Image();
    img.src = URL.createObjectURL(new Blob([logo as string]));
    return img;
  }, [logo]);

  return (
    <StyledAvatar
      size={size}
      withIcon={!logo && !!nodeType}
      color={'secondary'}
      variant={'square'}
      src={logo ? img?.src : undefined}
      alt={nodeName ?? t('ENTITY.LOGO')}
    >
      {isLogoIdLoading || isLogoLoading || isLoading ? (
        <CircularProgress color={'secondary'} />
      ) : nodeType ? (
        nodeIcon[nodeType]
      ) : (
        nodeName?.charAt(0).toUpperCase()
      )}
    </StyledAvatar>
  );
};
