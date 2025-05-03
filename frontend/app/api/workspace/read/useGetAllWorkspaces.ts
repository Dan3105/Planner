import { useQuery } from '@tanstack/react-query';
import api from '../../index';
import { WorkspaceDto } from '../../dtos/workspace_dto';

export const useGetAllWorkspaces = () => {
  return useQuery<WorkspaceDto[]>({
    queryKey: ['workspaces'],
    queryFn: async () => {
      const { data } = await api.get('/workspaces');
      return data;
    },
  });
};
