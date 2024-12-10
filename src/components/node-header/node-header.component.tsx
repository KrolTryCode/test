import { ArrowBack } from '@mui/icons-material';
import { Stack } from '@mui/material';
import { Button } from '@pspod/ui-components';
import { FC, ReactNode } from 'react';
import { Link } from 'react-router-dom';

import { ProjectNodeBreadcrumbs } from '../breadcrumbs/breadcrumbs.component';

import {
  StyledActionsWrapper,
  StyledDescription,
  StyledHeader,
  StyledHeading,
} from './node-header.style';

interface NodeHeaderProps {
  children: string;
  backPath?: string;
  actions?: ReactNode;
  description?: string;
  nodeId: string;
}

export const NodeHeader: FC<NodeHeaderProps> = ({
  backPath,
  children,
  actions,
  description,
  nodeId,
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
        <Button
          hidden={!backPath}
          component={Link}
          variant={'text'}
          to={backPath}
          icon={<ArrowBack />}
        />
        <StyledHeading>{children}</StyledHeading>
        <StyledActionsWrapper hidden={!actions} direction={'row'} alignItems={'center'}>
          {actions}
        </StyledActionsWrapper>
        <StyledDescription gutterBottom={false}>{description}</StyledDescription>
      </StyledHeader>
      <Stack
        flex={['auto', 'unset']}
        width={'fit-content'}
        maxHeight={['unset', '30vh']}
        maxWidth={['100%', description ? '25%' : '50%']}
      >
        <ProjectNodeBreadcrumbs projectNodeId={nodeId} />
      </Stack>
    </Stack>
  );
};
