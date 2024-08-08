import { Stack, Skeleton, Slide, SlideProps } from '@mui/material';
import { FC, ImgHTMLAttributes, useEffect, useMemo, useState } from 'react';

export interface ImageProps
  extends Required<Pick<ImgHTMLAttributes<HTMLImageElement>, 'alt' | 'src'>> {
  lazyLoad?: boolean;
  visible?: boolean;
  slideDirection?: SlideProps['direction'];
  id?: string;
  loadImage?: (id: string) => Promise<string>;
}

const imageWrapperStyles = {
  userSelect: 'none',
  pointerEvents: 'none',
};

const imageStyles = {
  objectFit: 'contain',
  objectPosition: 'center',
  maxWidth: '100%',
  maxHeight: '100%',
  border: 0,
  ...imageWrapperStyles,
};

const Img: FC<ImageProps> = ({
  src,
  alt,
  slideDirection,
  id = '',
  lazyLoad = false,
  visible = true,
  loadImage,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [imageData, setImageData] = useState('');

  useEffect(() => {
    async function load() {
      try {
        setImageData((await loadImage?.(id)) ?? '');
      } catch (e) {
        setImageData('');
      }
    }
    void load();
  }, [id, loadImage]);

  const img = useMemo(() => {
    const img = new Image();
    img.src = imageData ? URL.createObjectURL(new Blob([imageData])) : src;
    img.alt = alt;
    img.loading = lazyLoad ? 'lazy' : 'eager';
    return img;
  }, [alt, imageData, lazyLoad, src]);

  const onLoad = () => {
    setIsLoaded(true);
  };

  return (
    <Slide
      direction={slideDirection}
      in={visible}
      appear={false}
      timeout={350}
      mountOnEnter
      unmountOnExit
    >
      <Stack
        display={visible ? 'flex' : 'none'}
        width={'100%'}
        height={'100%'}
        alignItems={'center'}
        justifyContent={'center'}
        sx={imageWrapperStyles}
      >
        <Stack
          component={'img'}
          display={isLoaded ? 'block' : 'none'}
          src={img.src}
          alt={img.alt}
          loading={img.loading}
          sx={imageStyles}
          onLoad={onLoad}
        />
        {!isLoaded && <Skeleton width={'inherit'} height={'inherit'} />}
      </Stack>
    </Slide>
  );
};

export { Img as Image };
