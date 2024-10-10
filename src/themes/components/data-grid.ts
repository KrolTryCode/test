import { Components, Theme } from '@mui/material/styles';

export const MuiTablePagination: Components<Omit<Theme, 'components'>>['MuiTablePagination'] = {
  styleOverrides: {
    actions: {
      '.Mui-selected': {
        background: '#d4d4d4',
        color: '#333333',
        borderRadius: '5px',
        pointerEvents: 'none',
      },
    },
  },
};
export const MuiDataGrid: Components<Omit<Theme, 'components'>>['MuiDataGrid'] = {
  defaultProps: {
    showColumnVerticalBorder: true,
    showCellVerticalBorder: true,
    autoHeight: false,
    rowSelection: false,
    disableVirtualization: true,
    pagination: true,
    pageSizeOptions: [10, 20, 40, 100],
    autosizeOnMount: false,
    getRowHeight: () => 'auto',
    columnHeaderHeight: 40,
  },
  styleOverrides: {
    root: ({ theme }) => ({
      fontSize: theme.typography.body1.fontSize,
      letterSpacing: '-0.015em',
      lineHeight: 1.25,
      backgroundColor: theme.palette.background.default,
      '& .MuiDataGrid-overlayWrapperInner': {
        position: 'absolute',
      },
    }),
    'row--editing': ({ theme }) => ({
      '.non-editable-cell': {
        backgroundColor: theme.palette.grey[300],
      },
    }),

    row: ({ theme }) => ({
      '&.error': {
        color: theme.palette.error.main,
      },
      '&.font-bold': {
        fontWeight: 500,
      },
      '&.bg-grey:not(:hover)': {
        backgroundColor: theme.palette.grey[50],
      },
    }),
    cell: ({ theme }) => ({
      padding: '7px',
      display: 'flex',
      alignItems: 'center',
      // wordBreak: 'break-all',

      '&.grouping-row-cell': {
        color: theme.palette.text.primary,
        border: 'none',

        '&, & ~ .MuiDataGrid-cellEmpty': {
          backgroundColor: theme.palette.grey[300],
          borderBottom: '1px solid #d4d4d4',
        },
      },

      '& .MuiDataGrid-actionsCell': {
        flexWrap: 'wrap',

        '& > .MuiButtonBase-root': {
          borderRadius: theme.shape.borderRadius,
          '&:hover': {
            backgroundColor: '#ffffff',
          },
        },
      },

      '& .MuiDataGrid-booleanCell': {
        color: `${theme.palette.text.primary}80`,
      },

      '&.multiline': {
        whiteSpace: 'break-spaces',
      },

      '&.primary': {
        backgroundColor: theme.palette.primary.light,
      },
      '&.primary-light': {
        backgroundColor: `${theme.palette.primary.light}50`,
      },
      '&.success': {
        backgroundColor: theme.palette.success.light,
      },
      '&.acceptable': {
        backgroundColor: theme.palette.acceptable.main,
      },
      '&.info': {
        backgroundColor: theme.palette.info.light,
      },
      '&.warning': {
        backgroundColor: theme.palette.warning.light,
      },
      '&.error': {
        backgroundColor: theme.palette.error.light,
      },

      '& .MuiInputBase-root': {
        height: '100%',
        '& fieldset': { display: 'none' },
      },
    }),
    editInputCell: { '& input': { padding: '0 4px' } },
    detailPanel: ({ theme }) => ({
      padding: '1em',
      backgroundColor: theme.palette.grey[300],
    }),
    footerContainer: {
      minHeight: 'auto',
      paddingInline: '4px',
      letterSpacing: 0,
      '& .MuiToolbar-root': {
        minHeight: 'auto',
        height: 'min-content',
        paddingBlock: '4px',
      },
    },
    columnHeaderTitle: ({ theme }) => ({
      fontSize: theme.typography.body1.fontSize,
      fontWeight: 'bolder',
      letterSpacing: '-0.03em',
    }),
    columnHeader: {
      padding: '0 7px',

      '@supports (display: -webkit-box)': {
        '& .MuiDataGrid-columnHeaderTitleContainerContent': {
          height: '100%',
          paddingRight: '7px',

          '& .MuiDataGrid-columnHeaderTitle': {
            whiteSpace: 'break-spaces',
            lineHeight: 1.2,
            maxHeight: '100%',
            display: '-webkit-box',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: '2',
          },
        },
      },
      '&.MuiDataGrid-columnHeaderCheckbox': {
        paddingLeft: 4,
      },
    },
    filterForm: {
      alignItems: 'flex-end',
      '& .MuiFormLabel-root': {
        padding: 0,
        fontSize: '14px',
        transform: 'none',
      },
      '& .MuiInput-root': {
        minHeight: '36px',
      },
      '& .MuiAutocomplete-root .MuiAutocomplete-inputRoot .MuiAutocomplete-input': {
        padding: '4px 0 5px',
      },
    },
  },
};
