import { create } from 'zustand';

interface GridState {
  fullsreenedGridId: string | null;
}

export const useGridStore = create<GridState>()(() => ({
  fullsreenedGridId: null,
}));

export const setFullsreenedGridId = (id: string | null) =>
  useGridStore.setState({ fullsreenedGridId: id });

export const closeFullscreen = () => useGridStore.setState({ fullsreenedGridId: null });
