import { create } from 'zustand'
import type { BlockDto, SyncBlockDto } from '~/api/dtos/block_dto'


interface BlockState {
    blocks: SyncBlockDto[]
    initBlocks: (blocks: BlockDto[]) => void
    addBlock: (block: BlockDto) => void
    updateBlock: (blockId: string, updates: Partial<BlockDto>) => void
    deleteBlock: (blockId: string) => void
    setPendingChanges: (changes: SyncBlockDto[]) => void
    clearPendingChanges: () => void
}

export const useBlockStore = create<BlockState>((set) => ({
    blocks: [],
    
    initBlocks: (blocks) => set({ 
        blocks: blocks.length === 0 ? [] : blocks.map(b => ({...b, operation: 'unchange' })) 
    }),

    addBlock: (block) => set((state) => ({ 
        blocks: [...state.blocks, { ...block, operation: 'create' }] 
    })),
    
    updateBlock: (blockId, updates) => set((state) => ({
        blocks: state.blocks.map(block => 
            block.id === blockId ? 
            { ...block, ...updates, operation: block.operation === 'create' ?  'create' : 'update'} 
            : block
        )
    })),
    
    deleteBlock: (blockId) => set((state) => ({
        blocks: state.blocks.filter(block => block.id !== blockId)
    })),
    
    setPendingChanges: (changes) => set({ blocks: changes }),
    clearPendingChanges: () => set({ blocks: [] })
}))

// blocks: [],
//     pendingChanges: [],

//     addBlock: (block: BlockDto) => {
//         set((state) => ({
//             blocks: [...state.blocks, { ...block, operation: 'create' }],
//             pendingChanges: [...state.pendingChanges, { ...block, operation: 'create' }],
//         }))
//     },

//     updateBlock: (blockId: string, updates: Partial<BlockDto>) => {
//         set((state) => {
//             const blockToUpdate = state.blocks.find(b => b.id === blockId);
//             if (!blockToUpdate) return state;

//             return {
//                 blocks: state.blocks.map((block) =>
//                     block.id === blockId
//                         ? { ...block, ...updates, operation: 'update' }
//                         : block
//                 ),
//                 pendingChanges: [...state.pendingChanges, { 
//                     ...blockToUpdate,
//                     ...updates, 
//                     operation: 'update' 
//                 }],
//             };
//         })
//     },

//     deleteBlock: (blockId: string) => {
//         set((state) => ({
//             blocks: state.blocks.filter((block) => block.id !== blockId),
//             pendingChanges: [...state.pendingChanges, { 
//                 ...state.blocks.find(b => b.id === blockId)!, 
//                 operation: 'delete' 
//             }],
//         }))
//     },

//     setPendingChanges: (changes: SyncBlockDto[]) => {
//         set(() => ({ pendingChanges: changes }))
//     },

//     clearPendingChanges: () => {
//         set(() => ({ pendingChanges: [] }))
//     },
