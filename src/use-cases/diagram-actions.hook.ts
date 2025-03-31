// src/use-cases/diagram-actions.hook.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { queryOptions } from '@tanstack/react-query';
import axios from 'axios';


interface Diagram {
  id: string;
  name: string;
  description?: string;
  created?: string;
}

interface DiagramRequest {
  name: string;
  description?: string;
  projectId?: string;
}
const BASE_URL = 'api/api/app/v1/diagrams';

export const useDiagramActions = (projectId: string) => {
  const queryClient = useQueryClient();

  const getDiagrams = queryOptions({
    queryKey: ['diagrams', projectId],
    queryFn: async () => {
      try {
        console.log('Fetching all diagrams from:', `${BASE_URL}`);

        const response = await axios.get(`${BASE_URL}`);



        const diagrams = response.data;

        if (Array.isArray(diagrams)) {
          return diagrams.filter(diagram => !projectId || !diagram.projectId || diagram.projectId === projectId);
        }

        return diagrams;
      } catch (error) {
        console.error('Failed to fetch diagrams:', error);
        return [];
      }
    }
  });

  // Получение диаграммы по ID
  const getDiagram = (diagramId: string) => queryOptions({
    queryKey: ['diagrams', diagramId],
    queryFn: async () => {
      try {
        const response = await axios.get(`${BASE_URL}/${diagramId}`);
        return response.data;
      } catch (error) {
        console.error('Failed to fetch diagram details:', error);
        throw error;
      }
    },
  });

  // Создание диаграммы
  const { mutateAsync: createDiagram } = useMutation({
    mutationFn: async (data: DiagramRequest) => {
      const response = await axios.post(BASE_URL, {
        name: data.name,
        description: data.description,
        projectId
      });
      return response.data;
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['diagrams', projectId] });
    },
  });

  // Обновление диаграммы
  const { mutateAsync: updateDiagram } = useMutation({
    mutationFn: async ({ diagramId, ...data }: { diagramId: string } & DiagramRequest) => {
      const response = await axios.post(`${BASE_URL}/${diagramId}`, {
        name: data.name,
        description: data.description
      });
      return response.data;
    },
    onSuccess: (_, variables) => {
      void queryClient.invalidateQueries({ queryKey: ['diagrams', variables.diagramId] });
      void queryClient.invalidateQueries({ queryKey: ['diagrams', projectId] });
    },
  });

  // Удаление диаграммы
  const { mutateAsync: deleteDiagram } = useMutation({
    mutationFn: async (diagramId: string) => {
      const response = await axios.delete(`${BASE_URL}/${diagramId}`);
      return response.data;
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['diagrams', projectId] });
    },
  });

  return {
    getDiagrams,
    getDiagram,
    createDiagram,
    updateDiagram,
    deleteDiagram
  };
};

export type { Diagram, DiagramRequest };
