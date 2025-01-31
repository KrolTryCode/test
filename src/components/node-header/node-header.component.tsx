import { ArrowBack } from '@mui/icons-material';
import { Stack } from '@mui/material';
import { FC, ReactNode } from 'react';

import { ProjectNode } from '~/api/utils/api-requests';
import { ButtonLink } from '~/components/implicit-links';
import { EditableNodeLogo } from '~/components/node-logo/editable-node-logo.component';

import { ProjectNodeBreadcrumbs } from '../breadcrumbs/breadcrumbs.component';

import {
  StyledActionsWrapper,
  StyledDescription,
  StyledHeader,
  StyledHeading,
} from './node-header.style';

interface NodeHeaderProps extends ProjectNode {
  children: string;
  backPath?: string;
  actions?: ReactNode;
}

export const NodeHeader: FC<NodeHeaderProps> = ({
  backPath,
  children,
  actions,
  description,
  id: nodeId,
  name: nodeName,
  type: nodeType,
}) => {
  return (
    <Stack
      paddingBlock={1}
      gap={[1, 4]}
      direction={['column-reverse', 'row']}
      justifyContent={'space-between'}
      borderBottom={({ palette }) => `1px solid ${palette.divider}`}
    >
      <StyledHeader flex={['auto', 1]}>
        <ButtonLink hidden={!backPath} variant={'text'} to={backPath} icon={<ArrowBack />} />
        <EditableNodeLogo nodeId={nodeId} nodeName={nodeName} nodeType={nodeType} />
        <StyledHeading>{children}</StyledHeading>
        <StyledActionsWrapper hidden={!actions} direction={'row'} alignItems={'center'}>
          {actions}
        </StyledActionsWrapper>
        <StyledDescription gutterBottom={false} paddingRight={+Boolean(description)}>
          {description}
        </StyledDescription>
      </StyledHeader>
      <Stack
        flex={['auto', 'unset']}
        width={'fit-content'}
        maxHeight={['unset', '30vh']}
        maxWidth={['100%', '25%']}
      >
        <ProjectNodeBreadcrumbs projectNodeId={nodeId} />
      </Stack>
    </Stack>
  );
};
