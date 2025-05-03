import { Page } from "../../../generated/prisma";
import prisma from "../../prisma_client";
import { CreatePageDto, UpdatePageDto } from "../dtos/page_dto";

export async function createPage(dto: CreatePageDto): Promise<Page> {
    const page = await prisma.page.create({
        data: {
            title: dto.title,
            workspaceId: dto.workspaceId,
            parentId: dto.parentId,
            content: dto.content
        },
    });
    return page;
}

export async function deletePage(id: string): Promise<Page> {
    const page = await prisma.page.delete({
        where: { id },
    });
    return page;
}

export async function updateMetadataPage(id: string, dto: UpdatePageDto): Promise<Page> {
    const page = await prisma.page.update({
        where: { id },
        data: {
            title: dto.title,
            parentId: dto.parentId,
            updatedAt: new Date()
        },
    });
    return page;
}

export async function updatePage(id: string, content: any): Promise<Page> {
    const page = await prisma.page.update({
        where: { id },
        data: {
            content,
            updatedAt: new Date()
        },
    });
    return page;
}