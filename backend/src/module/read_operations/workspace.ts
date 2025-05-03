import prisma from "../../prisma_client";
import { PageDto } from "../dtos/page_dto";
import { WorkspaceDto, WorkspaceWithPagesDto } from "../dtos/workspace_dto";

export async function getWorkspaceById(id: string): Promise<WorkspaceDto | null> {
    const workspace = await prisma.workspace.findUnique({
        where: { id },
        include: {
            pages: {
                select: {
                    id: true,
                    title: true,
                    parentId: true,
                    createdAt: true,
                    content: false
                }
            }
        }
    });

    if (!workspace) {
        return null;
    }

    const pagesMap: Record<string, PageDto> = {};
    workspace.pages.forEach(page => {
        pagesMap[page.id] = { ...page, childs: [], workspaceId: workspace.id } as PageDto;
    });

    const rootPages: PageDto[] = [];

    Object.values(pagesMap).forEach(page => {
        if (!page.parentId) {
            rootPages.push(page);
        } else if (pagesMap[page.parentId]) {
            pagesMap[page.parentId].childs.push(page);
        } else {
            console.warn(`Warning: Page ${page.id} references non-existent parent ${page.parentId}, treating as root page`);
            rootPages.push(page);
        }
    });

    return {
        id: workspace.id,
        title: workspace.title,
        createdAt: workspace.createdAt,
        pages: rootPages
    } as WorkspaceWithPagesDto;
}

export async function getAllWorkspaces(): Promise<WorkspaceDto[]> {
    const workspaces = await prisma.workspace.findMany({orderBy: {createdAt: 'desc'}});

    return workspaces.map(workspace => ({
        id: workspace.id,
        title: workspace.title,
        createdAt: workspace.createdAt,
    }));
}