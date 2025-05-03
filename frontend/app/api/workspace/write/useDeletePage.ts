import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../../index';
import { PageDto } from '../../dtos/page_dto';

export const useDeletePage = () => {
  const queryClient = useQueryClient();
  
  return useMutation<PageDto, Error, string>({
    mutationFn: async (id) => {
      const { data } = await api.delete(`/pages/${id}`);
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['pages'] });
      queryClient.invalidateQueries({ queryKey: ['pages', 'metadata'] });
      queryClient.invalidateQueries({ queryKey: ['workspaces', data.workspaceId] });
    },
  });
};
