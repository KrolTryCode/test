import { styled, Tabs, TabsProps } from '@mui/material';

const scrollButtonWidth = 8;
const height = '46px';

export const StyledTabs = styled(Tabs)<TabsProps>(({ theme }) => ({
  padding: `0 ${scrollButtonWidth}px`,
  height,
  backgroundColor: `${theme.palette.primary.main}30`,
  boxShadow: 'inset 0 -2px 8px rgba(0,0,0,0.12)',

  '& .MuiTabs-scroller.MuiTabs-scrollableX': {
    scrollbarColor: `white transparent`,
  },

  '& .MuiTabScrollButton-root': {
    width: `${scrollButtonWidth * 3}px`,
    '&:first-of-type': { marginLeft: `-${scrollButtonWidth}px` },
    '&:last-of-type': { marginRight: `-${scrollButtonWidth}px` },
  },

  '& .MuiTab-root': {
    alignItems: 'flex-start',
    height: '100%',
    padding: '0 8px',
    '&.active': {
      backgroundColor: '#fff',
      boxShadow: '0 -2px 8px rgba(0, 0, 0, 0.12)',
    },

    '& .MuiTypography-root': {
      lineHeight: height,
    },
  },

  '& .MuiTabs-indicator': {
    display: 'none',
  },
}));
