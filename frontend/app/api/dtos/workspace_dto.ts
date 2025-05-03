import { PageDto } from "./page_dto";

export interface WorkspaceDto {
    id: string;
    title: string;
    createdAt: Date;
}

export interface WorkspaceWithPagesDto {
    id: string;
    title: string;
    createdAt: Date;
    pages: PageDto[]
}
