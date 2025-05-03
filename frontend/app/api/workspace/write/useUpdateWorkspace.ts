import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../../index';
import { WorkspaceDto } from '../../dtos/workspace_dto';

export const useUpdateWorkspace = () => {
    const queryClient = useQueryClient();
    
    return useMutation<WorkspaceDto, Error, { id: string; title: string }>({
        mutationFn: async ({ id, title }) => {
            const { data } = await api.put(`/workspaces/${id}`, { title });
            return data;
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['workspaces'] });
            queryClient.invalidateQueries({ queryKey: ['workspaces', data.id] });
        },
    });
};