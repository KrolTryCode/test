// src/components/diagrams/diagram-sidebar.tsx
import React, { useState, useRef, useCallback } from 'react';
import {
  Box, Typography, Divider, List, ListItem,
  ListItemIcon, ListItemText, Paper, Button,
  Dialog, DialogActions, DialogContent, DialogTitle
} from '@mui/material';
import {
  Square, Circle, TextFields,
  Add as AddIcon
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { notifySuccess } from '@pspod/ui-components';
import { useCreateElementMutation } from '~/api/queries/diagrams/elements/create-element.mutation';
import { useUploadElementFile } from '~/use-cases/upload-element-file.hook';
import { ElementType, ElementProperties } from '~/api/utils/api-requests';
import { ApiClientSecured } from '~/api/utils/api-client';
import { queryClient } from '~/routing/router';
import { showErrorMessage } from '~/utils/show-error-message';

interface DiagramSidebarProps {
  diagramId: string;
  onDragStart: (event: React.DragEvent<HTMLDivElement>, nodeType: string, data?: any) => void;
  onImageAdded?: () => void;
}

interface ToolItem {
  type: string;
  icon: React.ReactNode;
  label: string;
}

export const DiagramSidebar: React.FC<DiagramSidebarProps> = ({ diagramId, onDragStart, onImageAdded }) => {
  const { t } = useTranslation();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { uploadFile, isUploading } = useUploadElementFile(diagramId);

  // Create element mutation
  const { mutateAsync: createElement } = useCreateElementMutation(diagramId, {
    onSuccess: () => {
      notifySuccess(t('MESSAGE.ELEMENT_CREATED', 'Element created'));
    },
    onError: (e) => {
      console.error('Error creating element:', e);
    },
  });

  // Basic tools
  const basicTools: ToolItem[] = [
    { type: 'rectangle', icon: <Square />, label: t('DIAGRAM.TOOLS.RECTANGLE', 'Rectangle') },
    { type: 'circle', icon: <Circle />, label: t('DIAGRAM.TOOLS.CIRCLE', 'Circle') },
    { type: 'text', icon: <TextFields />, label: t('DIAGRAM.TOOLS.TEXT', 'Text') },
  ];

  // File selection handler
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setSelectedFile(files[0]);
      setUploadedFileName(files[0].name);
      setIsUploadDialogOpen(true);
    }
  };

  // Image upload handler
  const handleImageUpload = useCallback(async () => {
    if (!selectedFile) return;

    try {
      // Создаем элемент типа IMAGE
      const elementProperties: ElementProperties = {
        name: uploadedFileName,
        type: ElementType.IMAGE,
        x: 100, // Позиция по умолчанию
        y: 100,
        scale: 1,
        tableDataBindings: [],
      };

      // Создаем элемент
      const element = await createElement(elementProperties);

      // Создаем FormData для отправки файла
      const formData = new FormData();
      formData.append('file', selectedFile);

      // Загружаем файл и связываем с элементом
      await ApiClientSecured.diagramsV1Controller.createElementFile(
        diagramId,
        element.id,
        { file: selectedFile }
      );

      notifySuccess(t('MESSAGE.IMAGE_UPLOADED', 'Image uploaded successfully'));
      setIsUploadDialogOpen(false);
      setSelectedFile(null);
      setUploadedFileName('');

      // Обновляем список элементов и файлов
      queryClient.invalidateQueries({ queryKey: ['diagram', 'elements', diagramId] });
      queryClient.invalidateQueries({ queryKey: ['diagram', 'elementFiles', diagramId] });

    } catch (error) {
      console.error('Error uploading image:', error);
      showErrorMessage(error, 'ERROR.UPLOAD_FAILED');
    }
  }, [createElement, diagramId, queryClient, selectedFile, t, uploadedFileName]);

  return (
    <Paper elevation={2} sx={{ width: '220px', height: '100%', overflow: 'auto' }}>
      <Typography variant="h6" sx={{ padding: 2, textAlign: 'center' }}>
        {t('DIAGRAM.TOOLS', 'Tools')}
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
          {t('DIAGRAM.CUSTOM_IMAGES', 'Custom Images')}
        </Typography>

        <Button
          variant="outlined"
          fullWidth
          startIcon={<AddIcon />}
          onClick={() => fileInputRef.current?.click()}
          sx={{ mb: 2 }}
          disabled={isUploading}
        >
          {t('DIAGRAM.UPLOAD_IMAGE', 'Upload Image')}
        </Button>

        <input
          type="file"
          hidden
          ref={fileInputRef}
          accept="image/*"
          onChange={handleFileSelect}
        />
      </Box>

      {/* Upload confirmation dialog */}
      <Dialog open={isUploadDialogOpen} onClose={() => setIsUploadDialogOpen(false)}>
        <DialogTitle>{t('DIAGRAM.UPLOAD_IMAGE', 'Upload Image')}</DialogTitle>
        <DialogContent>
          <Typography>
            {t('DIAGRAM.UPLOAD_CONFIRM', 'Upload image')}: {uploadedFileName}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsUploadDialogOpen(false)}>
            {t('ACTION.CANCEL', 'Cancel')}
          </Button>
          <Button
            onClick={handleImageUpload}
            color="primary"
            disabled={isUploading}
          >
            {t('ACTION.UPLOAD', 'Upload')}
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};
