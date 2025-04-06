// src/pages/_main/projects/project.$projectId/diagrams/$diagramId.tsx
import { ArrowBack, Edit, DeleteOutline, Save } from '@mui/icons-material';
import { Box, Stack, Typography, Button } from '@mui/material';
import { confirmDeletionModal, modal, notifySuccess, Preloader } from '@pspod/ui-components';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import ReactFlow, {
  Background, Controls, MiniMap,
  useNodesState, useEdgesState,
  Node, XYPosition,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { useCallback, useState, useRef, useEffect, useMemo } from 'react';

import { useDeleteDiagramMutation } from '~/api/queries/diagrams/delete-diagram.mutation';
import { getDiagramQueryOptions } from '~/api/queries/diagrams/get-diagram.query';
import { useUpdateDiagramMutation } from '~/api/queries/diagrams/update-diagram.mutation';
import { DiagramRequest, Element, ElementType, ElementProperties } from '~/api/utils/api-requests';
import { ButtonLink } from '~/components/implicit-links';
import { DiagramForm } from '~/components/forms/diagram/diagram-form';
import { showErrorMessage } from '~/utils/show-error-message';
import { DiagramSidebar } from '~/components/diagrams/diagram-sidebar';
import {
  RectangleNode, CircleNode, TextNode, ImageNode
} from '~/components/diagrams/nodes/basic-nodes';

// Импортируем мутации для работы с элементами
import { useCreateElementMutation } from '~/api/queries/diagrams/elements/create-element.mutation';
import { useUpdateElementMutation } from '~/api/queries/diagrams/elements/update-element.mutation';
import { useDeleteElementMutation } from '~/api/queries/diagrams/elements/delete-element.mutation';
import { getElementsQueryOptions } from '~/api/queries/diagrams/elements/get-elements.query';

export const Route = createFileRoute('/_main/projects/project/$projectId/diagrams/$diagramId')({
  component: DiagramEditor,
  loader: async ({ context, params: { diagramId } }) => {
    try {
      const diagram = await context.queryClient.fetchQuery(getDiagramQueryOptions(diagramId));
      context.title = diagram.name;

      // Предзагрузка элементов диаграммы
      try {
        await context.queryClient.fetchQuery(getElementsQueryOptions(diagramId));
      } catch (error) {
        console.warn('Failed to fetch diagram elements:', error);
      }
    } catch (error) {
      console.error('Error loading diagram:', error);
      context.title = 'Diagram Editor';
    }
  },
});

// Определяем nodeTypes глобально, вне компонента
const nodeTypes = {
  rectangle: RectangleNode,
  circle: CircleNode,
  text: TextNode,
  image: ImageNode,
};

// Определяем edgeTypes глобально, вне компонента
const edgeTypes = {};

function DiagramEditor() {
  const { projectId, diagramId } = Route.useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  // Используем хуки React Flow для управления узлами и соединениями
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  // Запрос на получение диаграммы
  const { data: diagram, isLoading: isDiagramLoading } = useQuery({
    ...getDiagramQueryOptions(diagramId),
    refetchOnWindowFocus: true,
  });

  // Запрос на получение элементов диаграммы
  const { data: elements = [], isLoading: isElementsLoading } = useQuery({
    queryKey: ['diagram', 'elements', diagramId],
    queryFn: async () => {
      try {
        return await queryClient.fetchQuery(getElementsQueryOptions(diagramId));
      } catch (error) {
        console.error('Failed to fetch elements:', error);
        return [];
      }
    },
    refetchOnWindowFocus: true,
  });

  // Мутации для CRUD операций с диаграммой
  const { mutate: updateDiagram, isPending: isUpdating } = useUpdateDiagramMutation(diagramId, {
    onSuccess: () => {
      notifySuccess(t('MESSAGE.UPDATE_SUCCESS'));
    },
    onError: (e) => showErrorMessage(e, 'ERROR.UPDATE_FAILED'),
  });

  const { mutate: deleteDiagram } = useDeleteDiagramMutation({
    onSuccess: () => {
      notifySuccess(t('MESSAGE.DELETION_SUCCESS'));
      queryClient.invalidateQueries({ queryKey: ['diagram', 'byProjectId', projectId] });
      void navigate({
        to: '/projects/project/$projectId/diagrams',
        params: { projectId },
      });
    },
    onError: (e) => showErrorMessage(e, 'ERROR.DELETION_FAILED'),
  });

  // Мутации для CRUD операций с элементами
  const { mutate: createElement } = useCreateElementMutation(diagramId, {
    onSuccess: () => {
      notifySuccess(t('MESSAGE.ELEMENT_CREATED', 'Элемент создан'));
      queryClient.invalidateQueries({ queryKey: ['diagram', 'elements', diagramId] });
    },
    onError: (e) => showErrorMessage(e, 'ERROR.ELEMENT_CREATION_FAILED', 'Ошибка при создании элемента'),
  });

  const { mutate: updateElement } = useUpdateElementMutation(diagramId, '', {
    onSuccess: () => {
      notifySuccess(t('MESSAGE.ELEMENT_UPDATED', 'Элемент обновлен'));
      queryClient.invalidateQueries({ queryKey: ['diagram', 'elements', diagramId] });
    },
    onError: (e) => showErrorMessage(e, 'ERROR.ELEMENT_UPDATE_FAILED', 'Ошибка при обновлении элемента'),
  });

  const { mutate: deleteElement } = useDeleteElementMutation(diagramId, {
    onSuccess: () => {
      notifySuccess(t('MESSAGE.ELEMENT_DELETED', 'Элемент удален'));
      queryClient.invalidateQueries({ queryKey: ['diagram', 'elements', diagramId] });
    },
    onError: (e) => showErrorMessage(e, 'ERROR.ELEMENT_DELETION_FAILED', 'Ошибка при удалении элемента'),
  });

  // Преобразование API-элементов в узлы React Flow
  useEffect(() => {
    if (elements && elements.length > 0) {
      try {
        const flowNodes = elements.map(element => {
          const { id, properties } = element;
          const { x, y, type, name, scale = 1 } = properties;

          // Определяем тип узла ReactFlow на основе типа элемента
          let nodeType;
          switch (type) {
            case ElementType.RECTANGLE:
              nodeType = 'rectangle';
              break;
            case ElementType.CIRCLE:
              nodeType = 'circle';
              break;
            case ElementType.TEXT:
              nodeType = 'text';
              break;
            case ElementType.IMAGE:
              nodeType = 'image';
              break;
            default:
              nodeType = 'default';
          }

          return {
            id,
            type: nodeType,
            position: { x, y },
            data: { label: name, scale },
          };
        });

        setNodes(flowNodes);
      } catch (error) {
        console.error('Error converting elements to nodes:', error);
      }
    }
  }, [elements, setNodes]);

  // Функция для загрузки изображения
  const handleImageUpload = useCallback(async (file: File): Promise<string> => {
    // Здесь должна быть логика загрузки изображения на сервер
    // В качестве временного решения, используем FileReader для создания data URL
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          resolve(reader.result);
        } else {
          reject(new Error('Failed to read file'));
        }
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }, []);

  // Обработчик инициализации React Flow
  const onInit = useCallback((instance) => {
    console.log('ReactFlow initialized');
    setReactFlowInstance(instance);
  }, []);

  // Обработчики для drag-and-drop
  const onDragStart = (event, nodeType, extraData = {}) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.setData('application/reactflow-data', JSON.stringify(extraData));
    event.dataTransfer.effectAllowed = 'move';
  };

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      if (!reactFlowInstance || !reactFlowWrapper.current) {
        console.warn('ReactFlow not initialized or wrapper not defined');
        return;
      }

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const type = event.dataTransfer.getData('application/reactflow');

      if (!type) {
        console.warn('No node type in drag data');
        return;
      }

      // Используем screenToFlowPosition вместо project
      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });

      // Получаем дополнительные данные
      let extraData = {};
      try {
        const dataStr = event.dataTransfer.getData('application/reactflow-data');
        if (dataStr) {
          extraData = JSON.parse(dataStr);
        }
      } catch (error) {
        console.error('Error parsing drag data:', error);
      }

      // Определяем тип элемента на основе типа узла
      let elementType;
      switch (type) {
        case 'rectangle':
          elementType = ElementType.RECTANGLE;
          break;
        case 'circle':
          elementType = ElementType.CIRCLE;
          break;
        case 'text':
          elementType = ElementType.TEXT;
          break;
        case 'image':
          elementType = ElementType.IMAGE;
          break;
        default:
          elementType = ElementType.RECTANGLE;
      }

      // Создаем элемент через API
      const elementProperties: ElementProperties = {
        name: `${type} ${Date.now()}`,
        type: elementType,
        x: position.x,
        y: position.y,
        scale: 1,
        tableDataBindings: [],
      };

      console.log('Creating element:', elementProperties);
      createElement(elementProperties);
    },
    [reactFlowInstance, createElement]
  );

  // Обработчик перемещения узла
  const onNodeDragStop = useCallback((event, node) => {
    console.log('Node dragged:', node);

    // Создаем свойства элемента для обновления
    const elementProperties: ElementProperties = {
      name: node.data.label || 'Unnamed Element',
      type: getElementTypeFromNodeType(node.type),
      x: node.position.x,
      y: node.position.y,
      scale: node.data.scale || 1,
      tableDataBindings: [],
    };

    console.log('Updating element:', node.id, elementProperties);
    updateElement({ elementId: node.id, elementProperties });
  }, [updateElement]);

  // Функция для определения типа элемента из типа узла
  const getElementTypeFromNodeType = (nodeType: string): ElementType => {
    switch (nodeType) {
      case 'rectangle':
        return ElementType.RECTANGLE;
      case 'circle':
        return ElementType.CIRCLE;
      case 'text':
        return ElementType.TEXT;
      case 'image':
        return ElementType.IMAGE;
      default:
        return ElementType.RECTANGLE;
    }
  };

  // Обработчик редактирования диаграммы
  const handleEditDiagram = () => {
    if (!diagram) return;

    modal({
      title: t('ACTION.EDIT', {
        type: t('ENTITY.DIAGRAM').toLowerCase(),
      }),
      onOk: (data: DiagramRequest) => updateDiagram({
        ...data,
        projectId: diagram.projectId
      }),
      renderContent: (modalInstance) => (
        <DiagramForm
          {...modalInstance}
          data={{
            name: diagram.name,
            description: diagram.description,
            projectId: diagram.projectId
          }}
          isPending={isUpdating}
        />
      ),
    });
  };

  // Сохранение диаграммы
  const handleSaveDiagram = () => {
    console.log('Saving diagram state:', { nodes, edges });
    notifySuccess(t('MESSAGE.SAVE_SUCCESS', 'Диаграмма успешно сохранена'));
  };

  // Обработчик удаления диаграммы
  const handleDeleteDiagram = () => {
    confirmDeletionModal({
      title: t('MESSAGE.CONFIRM_DELETE_ENTITY', {
        what: t('ENTITY.DIAGRAM').toLowerCase(),
      }),
      onOk: () => deleteDiagram(diagramId),
    });
  };

  // Обработчик удаления узла
  const onNodesDelete = useCallback((deletedNodes) => {
    console.log('Deleting nodes:', deletedNodes);

    deletedNodes.forEach(node => {
      deleteElement(node.id);
    });
  }, [deleteElement]);

  const isLoading = isDiagramLoading || isElementsLoading;

  if (isLoading || !diagram) {
    return <Preloader />;
  }

  return (
    <Stack spacing={2} height="100%" padding={1}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Stack direction="row" alignItems="center" spacing={1}>
          <ButtonLink
            variant="text"
            to="/projects/project/$projectId/diagrams"
            params={{ projectId }}
            icon={<ArrowBack />}
          />
          <Typography variant="h3" component="h2">
            {diagram.name}
          </Typography>
          <Button
            size="small"
            variant="text"
            color="primary"
            onClick={handleEditDiagram}
            startIcon={<Edit />}
            disabled={isUpdating}
          >
            {t('ACTION.EDIT')}
          </Button>
        </Stack>
        <Stack direction="row" spacing={1}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<Save />}
            onClick={handleSaveDiagram}
          >
            {t('ACTION.SAVE')}
          </Button>
          <Button
            color="error"
            variant="outlined"
            startIcon={<DeleteOutline />}
            onClick={handleDeleteDiagram}
            disabled={isUpdating}
          >
            {t('ACTION.DELETE')}
          </Button>
        </Stack>
      </Stack>

      {diagram.description && (
        <Typography variant="body1" color="textSecondary">
          {diagram.description}
        </Typography>
      )}

      {/* Контейнер для редактора с панелью инструментов */}
      <Box
        display="flex"
        flex={1}
        height="calc(100% - 120px)"
        minHeight="500px"
      >
        {/* Панель инструментов с возможностью загрузки изображений */}
        <DiagramSidebar
          onDragStart={onDragStart}
          onImageUpload={handleImageUpload}
        />

        {/* Холст ReactFlow */}
        <Box
          ref={reactFlowWrapper}
          flex={1}
          border="1px solid"
          borderColor="divider"
          borderRadius={1}
          sx={{ height: '100%' }}
        >
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onInit={onInit}
            onDrop={onDrop}
            onDragOver={onDragOver}
            onNodeDragStop={onNodeDragStop}
            onNodesDelete={onNodesDelete}
            nodeTypes={nodeTypes}
            edgeTypes={edgeTypes}
            fitView
          >
            <Background />
            <Controls />
            <MiniMap />
          </ReactFlow>
        </Box>
      </Box>
    </Stack>
  );
}
