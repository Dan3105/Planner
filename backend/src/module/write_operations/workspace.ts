import { Workspace } from "../../../generated/prisma";
import prisma from "../../prisma_client";

export async function createWorkspace(title:string): Promise<Workspace>{
    const workspace = await prisma.workspace.create({
        data: {
            'title': title
        }
    });
    return workspace
}

export async function updateWorkspace(id: string, title:string): Promise<Workspace>{
    const workspace = await prisma.workspace.update({
        where: {'id': id}, 
        data: {
            'title': title
        }
    })

    return workspace
}

export async function deleteWorkspace(id:string): Promise<Workspace> {
    const workspace = await prisma.workspace.delete({
        where: {id: id}
    });

    return workspace
}