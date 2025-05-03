import { AccordionItem, AccordionTrigger, AccordionContent } from "@radix-ui/react-accordion";
import { Pencil } from "lucide-react";
import { JSX } from "react";
import { PageDto } from "~/api/dtos/page_dto";
import { SidebarMenuAction, SidebarMenuButton, SidebarMenuItem } from "~/components/ui/sidebar";
import { cn } from "~/lib/utils";

// Reusable component for rendering a single page item
export const PageTreeItem = ({
  page,
  level,
  onPageClick,
  onEditPage,
  renderChildren,
}: {
  page: PageDto;
  level: number;
  onPageClick: (pageId: string) => void;
  onEditPage: (page: PageDto) => void;
  renderChildren?: () => JSX.Element;
}) => {
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
        <SidebarMenuItem className="w-full">
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
      <AccordionContent className="pt-1 pb-0">{renderChildren && renderChildren()}</AccordionContent>
    </AccordionItem>
  );
};
