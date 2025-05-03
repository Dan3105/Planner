import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../../index';
import { WorkspaceDto } from '../../dtos/workspace_dto';

export const useCreateWorkspace = () => {
  const queryClient = useQueryClient();
  
  return useMutation<WorkspaceDto, Error, { title: string }>({
    mutationFn: async ({ title }) => {
      const { data } = await api.post('/workspaces', { title });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workspaces'] });
    },
  });
};
