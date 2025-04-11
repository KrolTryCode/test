// src/components/diagrams/nodes/image-node.tsx
import React, { memo } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { CircularProgress } from '@mui/material';
import { useGetImage } from '~/use-cases/get-image.hook';

export const ImageNode = memo(({ data, selected }: NodeProps) => {
  const { image, isImageLoading } = useGetImage(data.fileId);

  return (
    <>
      <Handle type="target" position={Position.Top} />
      <div
        style={{
          border: selected ? '2px solid #ff0072' : '1px solid #ccc',
          borderRadius: 3,
          overflow: 'hidden',
          width: data.width || 150,
          height: data.height || 150,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          background: '#fff',
        }}
      >
        {isImageLoading ? (
          <CircularProgress size={24} />
        ) : image ? (
          <img
            src={image.src}
            alt={data.label || 'Image'}
            style={{
              width: '100%',
              height: '100%',
              objectFit: data.fit || 'contain'
            }}
          />
        ) : (
          <div style={{ padding: 8, textAlign: 'center' }}>
            {data.label || 'Image not available'}
          </div>
        )}
      </div>
      <Handle type="source" position={Position.Bottom} />
    </>
  );
});
