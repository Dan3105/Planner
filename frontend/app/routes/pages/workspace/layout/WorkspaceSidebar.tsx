import { NavigateFunction } from "react-router";
import type { PageDto } from "~/api/dtos/page_dto";
import { Sidebar, SidebarContent, SidebarFooter, SidebarSeparator } from "~/components/ui/sidebar";
import { Button } from "~/components/ui/button";
import { Plus } from "lucide-react";
import { SidebarHeader } from "./SidebarHeader";
import { WorkspaceMenu } from "./WorkspaceMenu";
import { PagesList } from "./PagesList";

interface WorkspaceSidebarProps {
  workspace: {
    id: string;
    pages: PageDto[];
  };
  onPageClick: (pageId: string) => void;
  onAddPage: (page?: PageDto) => void;
  onEditPage: (page: PageDto) => void;
  onDeletePage: (page: PageDto) => void;
  navigate: NavigateFunction;
}

export function WorkspaceSidebar({
  workspace,
  onPageClick,
  onAddPage,
  onEditPage,
  onDeletePage,
  navigate,
}: WorkspaceSidebarProps) {
  return (
    <Sidebar>
      <SidebarHeader navigate={navigate} />
      <SidebarSeparator />
      
      <SidebarContent>
        <WorkspaceMenu workspace={workspace} navigate={navigate} onAddPage={onAddPage} />
        <PagesList 
          pages={workspace.pages} 
          onPageClick={onPageClick}
          onEditPage={onEditPage}
          onAddPage={onAddPage}
          onDeletePage={onDeletePage}
        />
      </SidebarContent>
      
      <SidebarFooter className="p-2">
        <Button
          onClick={() => onAddPage(undefined)}
          className="w-full"
          variant="outline"
          size="sm"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Page
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
