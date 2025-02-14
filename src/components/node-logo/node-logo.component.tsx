import { BackupTable, Folder } from '@mui/icons-material';
import { AvatarProps, Avatar } from '@pspod/ui-components';
import { useQuery } from '@tanstack/react-query';
import { ReactNode } from '@tanstack/react-router';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { getProjectLogoQueryOptions } from '~/api/queries/projects/get-project-logo.query';
import { ProjectNodeType } from '~/api/utils/api-requests';
import { useGetImage } from '~/use-cases/get-image.hook';

interface NodeLogoProps extends AvatarProps {
  nodeId: string;
  nodeName?: string;
  nodeType?: ProjectNodeType;
}

export const NodeLogo: FC<NodeLogoProps> = ({
  nodeId,
  nodeName,
  nodeType,
  size = 'medium',
  isLoading,
}) => {
  const { t } = useTranslation();
  const { data: logoId = '', isLoading: isLogoIdLoading } = useQuery(
    getProjectLogoQueryOptions(nodeId, {
      enabled: !!nodeId,
    }),
  );
  const { image: logo, isImageLoading: isLogoLoading } = useGetImage(logoId);

  return (
    <Avatar
      size={size}
      src={logo?.src}
      color={'secondary'}
      variant={'rounded'}
      alt={`${t('ENTITY.LOGO')} ${nodeName}`}
      withBorder
      isLoading={isLogoIdLoading || isLogoLoading || isLoading}
    >
      {nodeType ? nodeIcon[nodeType] : nodeName?.charAt(0).toUpperCase()}
    </Avatar>
  );
};

const nodeIcon: Record<ProjectNodeType, ReactNode> = {
  [ProjectNodeType.Group]: <Folder />,
  [ProjectNodeType.Project]: <BackupTable />,
};
