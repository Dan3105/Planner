import { Label } from "@radix-ui/react-label";
import type { PageDto } from "~/api/dtos/page_dto";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
} from "~/components/ui/sidebar";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
import { PageItem } from "./PageItem";

interface PagesListProps {
  pages: PageDto[];
  onPageClick: (pageId: string) => void;
  onEditPage: (page: PageDto) => void;
  onDeletePage: (page: PageDto) => void;
  onAddPage: (page: PageDto) => void;
}

export function PagesList({
  pages,
  onPageClick,
  onEditPage,
  onDeletePage,
  onAddPage,
}: PagesListProps) {
  // Get root pages directly
  const rootPages = pages.filter((page) => !page.parentId);

  // Recursive component to render page hierarchy
  const renderPageTree = (page: PageDto, level = 0) => {
    const hasChildren = page.childs && page.childs.length > 0;
    if (!hasChildren) {
      return (
        <PageItem
          page={page}
          level={level}
          onPageClick={onPageClick}
          onEditPage={onEditPage}
          onDeletePage={onDeletePage}
          onAddPage={onAddPage}
          key={page.id}
        />
      );
    }

    return (
      <AccordionItem value={page.id} key={page.id} className="border-0">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <PageItem
              page={page}
              level={level}
              onPageClick={onPageClick}
              onEditPage={onEditPage}
              onDeletePage={onDeletePage}
              onAddPage={onAddPage}
              key={page.id}
            />
          </div>
          {hasChildren && (
            <AccordionTrigger className="p-0 hover:no-underline flex-shrink-0">
              {/* ChevronDown icon is rendered automatically by the AccordionTrigger */}
            </AccordionTrigger>
          )}
        </div>
        <AccordionContent className="pt-1 pb-0">
          <SidebarMenu className="pl-4 space-y-1">
            {page.childs.map((childPage) =>
              renderPageTree(childPage, level + 1)
            )}
          </SidebarMenu>
        </AccordionContent>
      </AccordionItem>
    );
  };

  return (
    <SidebarGroup>
      <SidebarGroupLabel>
        <Label className="text-lg font-semibold text-gray-700">Pages</Label>
      </SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu className="space-y-1">
          <Accordion type="multiple" className="w-full">
            {rootPages.map((page) => renderPageTree(page))}
          </Accordion>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
