export interface CreatePageDto {
    title: string;
    workspaceId: string;
    parentId?: string;
    content?: any; 
}

export interface UpdatePageDto {
    title?: string;
    parentId?: string;
}

export interface PageDto {
    id: string;
    title: string;
    content?: any; 
    createdAt: Date;
    updatedAt?: Date;
    workspaceId: string;

    parentId?: string;
    parent?: PageDto;

    childs: PageDto[];
}