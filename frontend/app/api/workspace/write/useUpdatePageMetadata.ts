import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../../index';
import { PageDto, UpdatePageDto } from '../../dtos/page_dto';

export const useUpdatePageMetadata = () => {
  const queryClient = useQueryClient();
  
  return useMutation<PageDto, Error, { id: string; updateDto: UpdatePageDto }>({
    mutationFn: async ({ id, updateDto }) => {
      const { data } = await api.put(`/pages/${id}/metadata`, updateDto);
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['pages'] });
      queryClient.invalidateQueries({ queryKey: ['workspaces', data.workspaceId] });
    },
  });
};
