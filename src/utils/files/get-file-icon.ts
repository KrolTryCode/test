import {
  Image as ImageIcon,
  BackupTable as TableIcon,
  Archive as ArchiveIcon,
} from '@mui/icons-material';

import { FileType } from '~/utils/files/validate-files';

export function getFileIcon(fileType: FileType) {
  switch (fileType) {
    case 'image': {
      return ImageIcon;
    }
    case 'excel': {
      return TableIcon;
    }
    case 'zip': {
      return ArchiveIcon;
    }
  }
}
