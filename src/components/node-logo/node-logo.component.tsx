import { BackupTable, Folder } from '@mui/icons-material';
import { Badge } from '@mui/material';
import { AvatarProps, Avatar } from '@pspod/ui-components';
import { useQuery } from '@tanstack/react-query';
import { ReactNode, FC, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { getProjectLogoQueryOptions } from '~/api/queries/projects/get-project-logo.query';
import { ProjectNodeType } from '~/api/utils/api-requests';
import { useGetImage } from '~/use-cases/get-image.hook';

interface NodeLogoProps extends AvatarProps {
  nodeId: string;
  nodeName?: string;
  nodeType?: ProjectNodeType;
  showTypeBadge?: boolean;
}

export const NodeLogo: FC<NodeLogoProps> = ({
  nodeId,
  nodeName,
  nodeType,
  size = 'medium',
  isLoading,
  showTypeBadge = false,
}) => {
  const { t } = useTranslation();
  const { data: logoId = '', isLoading: isLogoIdLoading } = useQuery(
    getProjectLogoQueryOptions(nodeId, {
      enabled: !!nodeId,
    }),
  );
  const { image: logo, isImageLoading: isLogoLoading } = useGetImage(logoId);

  const badgeContent = useMemo(() => {
    if (!showTypeBadge || !logo) {
      return null;
    }
    return nodeType ? nodeIcon[nodeType] : null;
  }, [logo, nodeType, showTypeBadge]);

  return (
    <Badge badgeContent={badgeContent} anchorOrigin={{ horizontal: 'left' }}>
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
    </Badge>
  );
};

const nodeIcon: Record<ProjectNodeType, ReactNode> = {
  [ProjectNodeType.Group]: <Folder />,
  [ProjectNodeType.Project]: <BackupTable />,
};
