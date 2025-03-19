import EventRoundedIcon from '@mui/icons-material/EventRounded';
import FiberManualRecordRoundedIcon from '@mui/icons-material/FiberManualRecordRounded';
import GpsFixedRoundedIcon from '@mui/icons-material/GpsFixedRounded';
import LineAxisRoundedIcon from '@mui/icons-material/LineAxisRounded';
import NumbersRoundedIcon from '@mui/icons-material/NumbersRounded';
import QueryBuilderRoundedIcon from '@mui/icons-material/QueryBuilderRounded';
import RuleRoundedIcon from '@mui/icons-material/RuleRounded';
import TextFieldsRoundedIcon from '@mui/icons-material/TextFieldsRounded';
import { createSvgIcon } from '@mui/material';

import { DataType } from '~/api/utils/api-requests';

const FloatIcon = createSvgIcon(
  <svg xmlns={'http://www.w3.org/2000/svg'} viewBox={'0 0 7 5'}>
    <path
      d={
        'M1.54 4.78c-.55 0-.96-.2-1.22-.59C.11 3.88 0 3.47 0 2.96 0 2.01.4 1.19 1.21.49c.1-.1.2-.19.3-.29.15-.13.27-.2.36-.2a.41.41 0 0 1 .41.38c0 .1-.11.25-.33.47-.16.15-.32.3-.48.44-.18.18-.31.35-.39.52.11-.04.2-.07.29-.09s.17-.03.25-.03c.49 0 .87.13 1.13.38s.4.61.4 1.06-.14.86-.42 1.16c-.3.32-.7.47-1.19.47Zm0-2.29c-.14 0-.27.02-.39.07-.06.03-.17.09-.33.18 0 .08-.01.15-.01.22 0 .37.06.65.19.83s.31.28.56.28.45-.09.59-.26c.13-.16.2-.39.2-.67 0-.22-.07-.38-.2-.49s-.34-.16-.61-.16ZM3.95 4.93c-.1.19-.17.34-.23.45-.07.13-.17.19-.32.19-.1 0-.19-.03-.26-.1s-.11-.14-.11-.23c0-.05.06-.2.19-.45.11-.22.2-.38.25-.47a.32.32 0 0 1 .3-.17c.1 0 .19.03.26.1s.11.14.11.23c0 .04-.07.19-.2.45ZM6.41 4.57H5.25c-.37 0-.55-.12-.55-.35 0-.26.21-.39.62-.39h.13v-2.6c-.17.12-.28.18-.33.18-.11 0-.2-.04-.29-.12s-.12-.17-.12-.27.07-.22.2-.33l.33-.24.36-.29c.15-.11.29-.16.42-.16.18 0 .26.11.26.32 0 .23 0 .56-.03.98s-.03 1.02-.03 1.81v.71h.19c.11 0 .21.04.29.11s.12.16.12.27-.04.2-.12.27-.17.11-.29.11Z'
      }
    />
  </svg>,
  'Float',
);

const IntIcon = createSvgIcon(
  <svg xmlns={'http://www.w3.org/2000/svg'} viewBox={'0 0 7 5'}>
    <path
      d={
        'M1.54 4.77c-.55 0-.96-.2-1.22-.59C.11 3.87 0 3.46 0 2.95 0 2 .4 1.18 1.21.48c.1-.1.2-.19.3-.29.14-.13.26-.19.35-.19a.41.41 0 0 1 .41.38c0 .1-.11.25-.33.47-.16.15-.32.3-.48.44-.18.18-.31.35-.39.52.11-.04.2-.07.29-.09s.17-.03.25-.03c.49 0 .87.13 1.13.38s.4.61.4 1.06-.14.86-.42 1.16c-.3.32-.7.47-1.19.47Zm0-2.29c-.14 0-.27.02-.39.07-.06.03-.17.09-.33.18 0 .08-.01.15-.01.22 0 .37.06.65.19.83s.31.28.56.28.45-.09.59-.26c.13-.16.2-.39.2-.67 0-.22-.07-.38-.2-.49s-.34-.16-.61-.16ZM5.19 4.67c-.65 0-1.12-.28-1.41-.84-.21-.41-.32-.95-.32-1.6 0-.56.14-1.05.42-1.47.34-.5.81-.76 1.4-.76.56 0 .99.23 1.3.68.26.38.39.84.39 1.38 0 .87-.15 1.52-.45 1.96s-.74.65-1.34.65ZM5.28.76c-.32 0-.57.16-.76.47-.17.27-.25.59-.25.95 0 .48.04.84.13 1.1.14.42.41.62.79.62.32 0 .56-.15.72-.44s.24-.73.24-1.31c0-.47-.07-.82-.22-1.05S5.57.75 5.28.75Z'
      }
    />
  </svg>,
  'Int',
);

export const dataTypeIcons: Record<DataType, typeof TextFieldsRoundedIcon> = {
  [DataType.Boolean]: RuleRoundedIcon,
  [DataType.Date]: EventRoundedIcon,
  [DataType.Float]: FloatIcon,
  [DataType.Int]: IntIcon,
  [DataType.LineString]: LineAxisRoundedIcon,
  [DataType.Point]: FiberManualRecordRoundedIcon,
  [DataType.Polygon]: GpsFixedRoundedIcon,
  [DataType.String]: TextFieldsRoundedIcon,
  [DataType.Timestamp]: QueryBuilderRoundedIcon,
  [DataType.Uuid]: NumbersRoundedIcon,
};
