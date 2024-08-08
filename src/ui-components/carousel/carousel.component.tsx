import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import { MobileStepper, Divider, SlideProps, Box, Paper, Typography } from '@mui/material';
import { FC, useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSwipeable } from 'react-swipeable';

import { Button } from '../button/button.component';
import { FullscreenButton } from '../fullscreen-button/fullscreen-button.component';

import { ButtonsWrapper, carouselStyles } from './carousel.styles';
import { Image, ImageProps } from './image/image.component';

export { CarouselWrapper } from './carousel.styles';

export interface CarouselImageProps extends Pick<ImageProps, 'alt' | 'src'> {
  id: string;
}

interface CarouselProps {
  images?: CarouselImageProps[];
  hasFullscreenButton?: boolean;
  isSwipeable?: boolean;
  onDelete?: (id: string) => void;
  loadImage?: (id: string) => Promise<string>;
}

export const Carousel: FC<CarouselProps> = ({
  images,
  hasFullscreenButton = true,
  isSwipeable = true,
  onDelete,
  loadImage,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const total = images?.length ?? 0;
  const [current, setCurrent] = useState(0);
  const [slideDirection, setSlideDirection] = useState<SlideProps['direction']>('left');
  const { t } = useTranslation();

  const handleNext = () => {
    setCurrent(prev => getNeighbours(prev, total).next);
    setSlideDirection('left');
  };
  const handleBack = () => {
    setCurrent(prev => getNeighbours(prev, total).prev);
    setSlideDirection('right');
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: handleNext,
    onSwipedRight: handleBack,
    trackMouse: isSwipeable,
    trackTouch: isSwipeable,
  });

  useEffect(() => {
    if (images && images?.length == current && current !== 0) {
      setCurrent(current - 1);
    }
  }, [current, images]);

  if (!images || images?.length === 0) {
    return (
      <Box display={'flex'} height={'100%'} alignItems={'center'} justifyContent={'center'}>
        <Typography>{t('MESSAGE.NO_IMAGES')}</Typography>
      </Box>
    );
  }

  return (
    <Paper ref={ref} sx={carouselStyles} elevation={2}>
      <Box height={total > 1 ? `calc(100% - 52px)` : '100%'} {...swipeHandlers}>
        {images.map((image, index) => {
          const { next, prev } = getNeighbours(current, total);
          const lazyLoad = ![current, next, prev].includes(index);
          return (
            <Box height={index === current ? '100%' : '0'} key={image.id}>
              <Image
                {...image}
                lazyLoad={lazyLoad}
                visible={index === current}
                slideDirection={slideDirection}
                loadImage={loadImage}
              />
            </Box>
          );
        })}
      </Box>

      <ButtonsWrapper direction={'row'}>
        {onDelete && (
          <Button
            variant={'text'}
            size={'small'}
            color={'error'}
            onClick={() => onDelete(images[current].id)}
          >
            <DeleteIcon />
          </Button>
        )}
        {hasFullscreenButton && <FullscreenButton element={ref.current} />}
      </ButtonsWrapper>

      <Divider />
      {total > 1 && (
        <MobileStepper
          steps={total}
          activeStep={current}
          position={'static'}
          nextButton={
            <Button variant={'text'} color={'primary'} onClick={handleNext}>
              <KeyboardArrowRight />
            </Button>
          }
          backButton={
            <Button variant={'text'} color={'primary'} onClick={handleBack}>
              <KeyboardArrowLeft />
            </Button>
          }
        />
      )}
    </Paper>
  );
};

function getNeighbours(val: number, total: number) {
  const last = total - 1;
  const prev = val === 0 ? last : val - 1;
  const next = val === last ? 0 : val + 1;

  return { prev, next };
}
