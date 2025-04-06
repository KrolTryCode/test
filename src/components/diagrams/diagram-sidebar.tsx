// src/components/diagrams/diagram-sidebar.tsx
import React, { useState, useRef } from 'react';
import {
  Box, Typography, Divider, List, ListItem,
  ListItemIcon, ListItemText, Paper, Button,
  Dialog, DialogActions, DialogContent, DialogTitle
} from '@mui/material';
import {
  Square, Circle, TextFields, Image as ImageIcon,
  Add as AddIcon
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

interface DiagramSidebarProps {
  onDragStart: (event: React.DragEvent<HTMLDivElement>, nodeType: string, data?: any) => void;
  onImageUpload: (file: File) => Promise<string>;
}

interface ToolItem {
  type: string;
  icon: React.ReactNode;
  label: string;
}

export const DiagramSidebar: React.FC<DiagramSidebarProps> = ({ onDragStart, onImageUpload }) => {
  const { t } = useTranslation();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [userImages, setUserImages] = useState<Array<{id: string, src: string, name: string}>>([]);
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // Базовые инструменты
  const basicTools: ToolItem[] = [
    { type: 'rectangle', icon: <Square />, label: t('DIAGRAM.TOOLS.RECTANGLE', 'Прямоугольник') },
    { type: 'circle', icon: <Circle />, label: t('DIAGRAM.TOOLS.CIRCLE', 'Круг') },
    { type: 'text', icon: <TextFields />, label: t('DIAGRAM.TOOLS.TEXT', 'Текст') },
  ];

  // Обработчик выбора файла
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setSelectedFile(files[0]);
      setUploadedFileName(files[0].name);
      setIsUploadDialogOpen(true);
    }
  };

  // Обработчик загрузки изображения
  const handleImageUpload = async () => {
    if (!selectedFile) return;

    try {
      const imageSrc = await onImageUpload(selectedFile);
      const newImage = {
        id: `img-${Date.now()}`,
        src: imageSrc,
        name: uploadedFileName
      };

      setUserImages(prevImages => [...prevImages, newImage]);
      setIsUploadDialogOpen(false);
      setSelectedFile(null);
      setUploadedFileName('');
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  return (
    <Paper elevation={2} sx={{ width: '220px', height: '100%', overflow: 'auto' }}>
      <Typography variant="h6" sx={{ padding: 2, textAlign: 'center' }}>
        {t('DIAGRAM.TOOLS', 'Инструменты')}
      </Typography>

      <Divider />

      <List>
        {basicTools.map((item) => (
          <ListItem
            key={item.type}
            button
            onDragStart={(event) => onDragStart(event, item.type)}
            draggable
            sx={{
              cursor: 'grab',
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.04)',
              },
            }}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItem>
        ))}
      </List>

      <Divider />

      <Box sx={{ p: 2 }}>
        <Typography variant="subtitle1" gutterBottom>
          {t('DIAGRAM.CUSTOM_IMAGES', 'Пользовательские изображения')}
        </Typography>

        <Button
          variant="outlined"
          fullWidth
          startIcon={<AddIcon />}
          onClick={() => fileInputRef.current?.click()}
          sx={{ mb: 2 }}
        >
          {t('DIAGRAM.UPLOAD_IMAGE', 'Загрузить изображение')}
        </Button>

        <input
          type="file"
          hidden
          ref={fileInputRef}
          accept="image/*"
          onChange={handleFileSelect}
        />

        <List>
          {userImages.map((image) => (
            <ListItem
              key={image.id}
              button
              onDragStart={(event) => onDragStart(event, 'image', { src: image.src })}
              draggable
              sx={{
                cursor: 'grab',
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.04)',
                },
              }}
            >
              <ListItemIcon><ImageIcon /></ListItemIcon>
              <ListItemText
                primary={image.name}
                primaryTypographyProps={{
                  noWrap: true,
                  title: image.name
                }}
              />
            </ListItem>
          ))}
        </List>
      </Box>

      {/* Диалог подтверждения загрузки изображения */}
      <Dialog open={isUploadDialogOpen} onClose={() => setIsUploadDialogOpen(false)}>
        <DialogTitle>{t('DIAGRAM.UPLOAD_IMAGE', 'Загрузить изображение')}</DialogTitle>
        <DialogContent>
          <Typography>
            {t('DIAGRAM.UPLOAD_CONFIRM', 'Загрузить изображение')}: {uploadedFileName}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsUploadDialogOpen(false)}>
            {t('ACTION.CANCEL', 'Отмена')}
          </Button>
          <Button onClick={handleImageUpload} color="primary">
            {t('ACTION.UPLOAD', 'Загрузить')}
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};
