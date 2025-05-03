import { NavigateFunction } from "react-router";
import { Home, LucideMenuSquare, Plus } from "lucide-react";
import { Label } from "@radix-ui/react-label";
import { Button } from "~/components/ui/button";
import { 
  SidebarGroup, 
  SidebarGroupLabel, 
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton
} from "~/components/ui/sidebar";

interface WorkspaceMenuProps {
  workspace: { id: string };
  navigate: NavigateFunction;
  onAddPage: () => void;
}

export function WorkspaceMenu({ workspace, navigate, onAddPage }: WorkspaceMenuProps) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Home className="h-4 w-4 text-muted-foreground" />
          <Label className="font-medium">Workspace Menu</Label>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={onAddPage}
          className="h-6 w-6 hover:bg-accent rounded-md"
          title="Add new page"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={() => navigate(`/workspace/${workspace.id}`)}
              tooltip="Workspace Overview"
              className="w-full flex items-center gap-2 px-2 py-1.5"
            >
              <LucideMenuSquare className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">Overview</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
