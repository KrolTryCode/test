import { styled, Box, Typography, TypographyProps, Stack } from '@mui/material';

const BACK_ARROW_GRID_AREA = 'back-arrow';
const LOGO_GRID_AREA = 'logo';
const HEADER_GRID_AREA = 'header';
const ACTIONS_GRID_AREA = 'actions';
const DESCR_GRID_AREA = 'description';

export const StyledHeader = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateAreas: `
    "${BACK_ARROW_GRID_AREA} ${LOGO_GRID_AREA} ${HEADER_GRID_AREA} ${ACTIONS_GRID_AREA}"
    "${BACK_ARROW_GRID_AREA} ${LOGO_GRID_AREA} ${DESCR_GRID_AREA} ${DESCR_GRID_AREA}"
  `,
  gridTemplateColumns: 'min-content auto auto 1fr',
  gridAutoRows: 'auto',
  columnGap: theme.spacing(1),
  rowGap: theme.spacing(1),
  overflow: 'hidden',

  '& > a': {
    gridArea: BACK_ARROW_GRID_AREA,
  },

  '& > .project-logo': {
    gridArea: LOGO_GRID_AREA,
    marginRight: theme.spacing(1),
  },

  [theme.breakpoints.down('sm')]: {
    borderTop: `1px solid ${theme.palette.divider}`,
    paddingTop: theme.spacing(1),
    gridTemplateAreas: `
      "${BACK_ARROW_GRID_AREA} ${ACTIONS_GRID_AREA} ${ACTIONS_GRID_AREA}"
      "${LOGO_GRID_AREA} ${LOGO_GRID_AREA} ${HEADER_GRID_AREA}"
      "${LOGO_GRID_AREA} ${LOGO_GRID_AREA} ${DESCR_GRID_AREA}"
    `,
    gridTemplateColumns: 'min-content min-content 1fr',

    '& > a': {
      height: 'min-content',
    },
  },
}));

export const StyledHeading = styled(
  (props: Omit<TypographyProps, 'children'> & { children?: string }) => (
    <Typography variant={'h2'} gutterBottom={false} title={props.children} {...props} />
  ),
)(() => ({
  gridArea: HEADER_GRID_AREA,
  display: '-webkit-box',
  textOverflow: 'ellipsis',
  overflow: 'hidden',
  WebkitBoxOrient: 'vertical',
  WebkitLineClamp: '3',
  hyphens: 'auto',
}));

export const StyledActionsWrapper = styled(Stack)({
  gridArea: ACTIONS_GRID_AREA,
  height: 'fit-content',
});

export const StyledDescription = styled(Typography)(({ theme }) => ({
  gridArea: DESCR_GRID_AREA,
  paddingRight: theme.spacing(1),
  width: 'fit-content',
  maxWidth: '100%',
  maxHeight: '4.5em',
  whiteSpace: 'break-spaces',
  overflowWrap: 'break-word',
  overflow: 'hidden auto',
  scrollbarWidth: 'thin',
}));
