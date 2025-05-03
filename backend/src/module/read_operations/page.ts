import prisma from "../../prisma_client";
import { PageDto } from "../dtos/page_dto";

export async function getContentPage(pageId: string): Promise<PageDto> {
  const page = await prisma.page.findUnique({
    where: {
      id: pageId,
    },
  });

  return page as PageDto;
}
