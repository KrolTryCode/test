// src/components/diagrams/nodes/basic-nodes.tsx
import React, { memo } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';

// Базовый прямоугольник
export const RectangleNode = memo(({ data, selected }: NodeProps) => {
  return (
    <>
      <Handle type="target" position={Position.Top} />
      <div
        style={{
          width: data.width || 100,
          height: data.height || 60,
          backgroundColor: data.color || '#fff',
          border: `1px solid ${selected ? '#ff0072' : '#1a192b'}`,
          borderRadius: 3,
          padding: 10,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {data.label}
      </div>
      <Handle type="source" position={Position.Bottom} />
    </>
  );
});

// Круг
export const CircleNode = memo(({ data, selected }: NodeProps) => {
  const size = data.size || 80;

  return (
    <>
      <Handle type="target" position={Position.Top} />
      <div
        style={{
          width: size,
          height: size,
          backgroundColor: data.color || '#fff',
          border: `1px solid ${selected ? '#ff0072' : '#1a192b'}`,
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {data.label}
      </div>
      <Handle type="source" position={Position.Bottom} />
    </>
  );
});

// Текстовая метка
export const TextNode = memo(({ data }: NodeProps) => {
  return (
    <div
      style={{
        padding: 5,
        fontSize: data.fontSize || 14,
        color: data.color || '#000',
        fontWeight: data.bold ? 'bold' : 'normal',
        backgroundColor: 'transparent',
      }}
    >
      {data.label || 'Текст'}
    </div>
  );
});
