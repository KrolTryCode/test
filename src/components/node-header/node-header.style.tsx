import { styled, Box, Typography, TypographyProps, Stack } from '@mui/material';

const BACK_ARROW_GRID_AREA = 'back-arrow';
const HEADER_GRID_AREA = 'header';
const ACTIONS_GRID_AREA = 'actions';
const DESCR_GRID_AREA = 'descr';

export const StyledHeader = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateAreas: `"${BACK_ARROW_GRID_AREA} ${HEADER_GRID_AREA} ${ACTIONS_GRID_AREA}" "${BACK_ARROW_GRID_AREA} ${DESCR_GRID_AREA} ${DESCR_GRID_AREA}"`,
  '--back-arrow-size': '32px',
  gridTemplateColumns: 'var(--back-arrow-size) auto 1fr',
  gridAutoRows: 'min-content',
  columnGap: theme.spacing(2),
  rowGap: theme.spacing(1),
  overflow: 'hidden',

  '& > a': {
    marginTop: theme.spacing(-1),
    gridArea: BACK_ARROW_GRID_AREA,

    [theme.breakpoints.down('sm')]: {
      marginTop: theme.spacing(-1 / 6),
    },
  },

  [theme.breakpoints.down('sm')]: {
    borderTop: `1px solid ${theme.palette.divider}`,
    paddingTop: theme.spacing(1),
    gridTemplateAreas: `"${BACK_ARROW_GRID_AREA} ${ACTIONS_GRID_AREA}" "${HEADER_GRID_AREA} ${HEADER_GRID_AREA}" "${DESCR_GRID_AREA} ${DESCR_GRID_AREA}"`,
    gridTemplateColumns: 'var(--back-arrow-size) 1fr',
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
