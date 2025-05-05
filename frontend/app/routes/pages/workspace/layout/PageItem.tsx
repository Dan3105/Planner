import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@radix-ui/react-popover";
import { MoreVertical, Pencil, Plus, Trash2 } from "lucide-react";
import { useParams } from "react-router";
import { PageDto } from "~/api/dtos/page_dto";
import { SidebarMenuItem, SidebarMenuButton } from "~/components/ui/sidebar";
import { cn } from "~/lib/utils";

interface PageProps {
  page: PageDto;
  level: number;
  onPageClick: (pageId: string) => void;
  onEditPage: (page: PageDto) => void;
  onDeletePage: (page: PageDto) => void;
  onAddPage: (page: PageDto) => void;
}

export function PageItem({
  page,
  level,
  onPageClick,
  onEditPage,
  onDeletePage,
  onAddPage,
}: PageProps) {
  const {pageId} = useParams();
  const isActive = pageId === page.id;
  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        onClick={() => onPageClick(page.id)}
        tooltip={page.title}
        isActive={isActive}
        className={cn(
          "pl-[calc(1rem*" +
            level +
            ")] hover:bg-gray-100 group flex justify-between",
          isActive && "!bg-gray-200 text-primary"
        )}
      >
        <span className="truncate text-sm font-medium text-gray-700">
          {page.title}
        </span>
        <Popover>
          <PopoverTrigger asChild>
            <div
              role="button"
              onClick={(e) => e.stopPropagation()}
              className="opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <MoreVertical className="h-4 w-4 text-gray-500 hover:text-gray-700" />
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-48 p-2 z-10 bg-popover border shadow-md rounded-md">
            <div className="flex flex-col gap-1">
              <div
                role="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onEditPage(page);
                }}
                className="flex items-center gap-2 px-2 py-1.5 text-sm text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors w-full"
              >
                <Pencil className="h-4 w-4" />
                Edit Page
              </div>
              <div
                role="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onAddPage(page);
                }}
                className="flex items-center gap-2 px-2 py-1.5 text-sm text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors w-full"
              >
                <Plus className="h-4 w-4" />
                Add Subpage
              </div>
              <div
                role="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onDeletePage(page);
                }}
                className="flex items-center gap-2 px-2 py-1.5 text-sm text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-md transition-colors w-full"
              >
                <Trash2 className="h-4 w-4" />
                Delete Page
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}
