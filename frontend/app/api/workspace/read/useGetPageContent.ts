import { useQuery } from '@tanstack/react-query';
import api from '../../index';
import { PageDto } from '../../dtos/page_dto';

export const useGetPageContent = (pageId: string) => {
  return useQuery<PageDto, Error>({
    queryKey: ['pages', 'content', pageId],
    queryFn: async () => {
      const { data } = await api.get(`/pages/${pageId}/content`);
      return data;
    },
    enabled: !!pageId,
  });
};
