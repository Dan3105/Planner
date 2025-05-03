import { useQuery } from '@tanstack/react-query';
import api from '../../index';
import { WorkspaceWithPagesDto } from '../../dtos/workspace_dto';

export const useGetWorkspaceById = (workspaceId: string) => {
  return useQuery<WorkspaceWithPagesDto, Error>({
    queryKey: ['workspaces', workspaceId],
    queryFn: async () => {
      const { data } = await api.get(`/workspaces/${workspaceId}`);
      return data;
    },
    enabled: !!workspaceId,
  });
};
