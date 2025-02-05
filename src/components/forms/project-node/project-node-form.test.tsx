import { describe, expect, it } from 'vitest';

import { CreateProjectNodeRequest, ProjectNodeType } from '~/api/utils/api-requests';

import { schema } from './project-node-form.schema';

const correctFormData: CreateProjectNodeRequest = {
  name: 'Название проекта',
  type: ProjectNodeType.Project,
  description: 'Описание проекта',
  parentId: '5ef97281-0fa0-4669-b1a9-bbc53191ba5c',
};

describe('Project node form', () => {
  it('should pass with correct data', async () => {
    expect(await schema.isValid(correctFormData)).toBeTruthy();
    expect(await schema.isValid({ ...correctFormData, parentId: '' })).toBeTruthy();
    expect(await schema.isValid({ ...correctFormData, description: '' })).toBeTruthy();
  });

  it('should fail with empty data', async () => {
    expect(await schema.isValid({})).toBeFalsy();
    expect(await schema.isValid({ ...correctFormData, name: '' })).toBeFalsy();
    expect(await schema.isValid({ ...correctFormData, type: '' })).toBeFalsy();
  });
});
