import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../../index';
import { CreatePageDto, PageDto } from '../../dtos/page_dto';

export const useCreatePage = () => {
  const queryClient = useQueryClient();
  
  return useMutation<PageDto, Error, CreatePageDto>({
    mutationFn: async (pageDto) => {
      const { data } = await api.post('/pages', pageDto);
      return data;
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['pages'] });
      queryClient.invalidateQueries({ queryKey: ['pages', 'metadata'] });
      queryClient.invalidateQueries({ queryKey: ['workspaces', variables.workspaceId] });
    },
  });
};
