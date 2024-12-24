import { ContentCopy } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';
import { Button, modal } from '@pspod/ui-components';

interface ShowTokenValueProps {
  title: string;
  buttonText: string;
  modalText: string;
  value: string;
  onHandleCopy: () => void;
}

export const showTokenModal = ({
  title,
  value,
  onHandleCopy,
  buttonText,
  modalText,
}: ShowTokenValueProps) =>
  modal({
    title,
    renderContent: () => {
      const handleCopy = () => navigator.clipboard.writeText(value).then(onHandleCopy);
      return (
        <Box>
          <Typography>{modalText}</Typography>
          <Typography
            variant={'body1'}
            sx={theme => ({
              padding: 1,
              wordBreak: 'break-all',
              border: `1px dashed ${theme.palette.primary.main}`,
              borderRadius: 1,
            })}
          >
            {value}
          </Typography>
          <Button icon={<ContentCopy />} onClick={handleCopy}>
            {buttonText}
          </Button>
        </Box>
      );
    },
  });
