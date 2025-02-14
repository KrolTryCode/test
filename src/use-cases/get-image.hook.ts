import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

import { getImageQueryOptions } from '~/api/queries/files/get-image.query';

export const useGetImage = (id?: string) => {
  const { data: imageFile, isLoading: isImageLoading } = useQuery(
    getImageQueryOptions(id!, { enabled: !!id }),
  );

  const image = useMemo(() => {
    if (imageFile) {
      const img = new Image();
      img.src = URL.createObjectURL(new Blob([imageFile as string]));
      return img;
    }
  }, [imageFile]);

  return { image, isImageLoading };
};
