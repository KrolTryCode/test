export interface Solver {
  id: string;
  name: string;
  description: string;
  author?: string;
  created?: string;
  fileId: string;
}

export interface SolverFormInput {
  name: string;
  description: string;
  fileId: string;
}
