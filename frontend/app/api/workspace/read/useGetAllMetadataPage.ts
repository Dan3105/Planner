import { useQuery } from '@tanstack/react-query';
import api from '../../index';
import { PageDto } from '../../dtos/page_dto';

// Get all pages for a workspace
export const useGetWorkspacePages = (workspaceId: string) => {
  return useQuery<PageDto[], Error>({
    queryKey: ['workspaces', workspaceId, 'pages'],
    queryFn: async () => {
      const { data } = await api.get(`/workspaces/${workspaceId}/pages`);
      return data;
    },
    enabled: !!workspaceId,
  });
};
