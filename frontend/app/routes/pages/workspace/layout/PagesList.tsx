import { Pencil } from "lucide-react";
import { Label } from "@radix-ui/react-label";
import { cn } from "~/lib/utils";
import type { PageDto } from "~/api/dtos/page_dto";
import { 
  SidebarGroup, 
  SidebarGroupLabel, 
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuAction
} from "~/components/ui/sidebar";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";

interface PagesListProps {
  pages: PageDto[];
  onPageClick: (pageId: string) => void;
  onEditPage: (page: PageDto) => void;
}

export function PagesList({ pages, onPageClick, onEditPage }: PagesListProps) {
  // Get root pages directly
  const rootPages = pages.filter(page => !page.parentId);
  
  // Recursive component to render page hierarchy
  const renderPageTree = (page: PageDto, level = 0) => {
    const hasChildren = page.childs && page.childs.length > 0;
    if (!hasChildren) {
      return (
        <SidebarMenuItem key={page.id}>
          <SidebarMenuButton
            onClick={() => onPageClick(page.id)}
            tooltip={page.title}
            isActive={false}
            className={cn("pl-[calc(1rem*" + level + ")] hover:bg-gray-100")}
          >
            <span className="truncate text-sm font-medium text-gray-700">{page.title}</span>
          </SidebarMenuButton>
          <SidebarMenuAction
            showOnHover
            onClick={(e) => {
              e.stopPropagation();
              onEditPage(page);
            }}
          >
            <Pencil className="h-4 w-4 text-gray-500 hover:text-gray-700" />
          </SidebarMenuAction>
        </SidebarMenuItem>
      );
    }
    
    return (
      <AccordionItem value={page.id} key={page.id} className="border-0">
        <AccordionTrigger className="p-0 hover:no-underline">
          <SidebarMenuItem >
            <SidebarMenuButton
              onClick={(e) => {
                e.stopPropagation(); // Prevent accordion from toggling
                onPageClick(page.id);
              }}
              tooltip={page.title}
              isActive={false}
              className={cn("pl-[calc(1rem*" + level + ")] flex-1 hover:bg-gray-100")}
            >
              <span className="truncate text-sm font-medium text-gray-700">{page.title}</span>
            </SidebarMenuButton>
            <SidebarMenuAction
              showOnHover
              onClick={(e) => {
                e.stopPropagation();
                onEditPage(page);
              }}
            >
              <Pencil className="h-4 w-4 text-gray-500 hover:text-gray-700" />
            </SidebarMenuAction>
          </SidebarMenuItem>
        </AccordionTrigger>
        <AccordionContent className="pt-1 pb-0">
          <SidebarMenu className="pl-4 space-y-1">
            {page.childs.map(childPage => 
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
            {rootPages.map(page => renderPageTree(page))}
          </Accordion>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
