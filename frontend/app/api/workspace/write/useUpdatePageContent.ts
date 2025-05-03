import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../../index';
import { PageDto } from '../../dtos/page_dto';

export const useUpdatePageContent = () => {
  const queryClient = useQueryClient();
  
  return useMutation<PageDto, Error, { id: string; content: string }>({
    mutationFn: async ({ id, content }) => {
      const { data } = await api.put(`/pages/${id}/content`, { content });
      return data;
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['pages', 'content', variables.id] });
    },
  });
};
