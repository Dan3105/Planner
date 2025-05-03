import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../../index';
import { WorkspaceDto } from '../../dtos/workspace_dto';

export const useDeleteWorkspace = () => {
  const queryClient = useQueryClient();
  
  return useMutation<WorkspaceDto, Error, string>({
    mutationFn: async (id) => {
      const { data } = await api.delete(`/workspaces/${id}`);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workspaces'] });
    },
  });
};
