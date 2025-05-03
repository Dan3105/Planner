import { Outlet, useNavigate, useParams } from "react-router";
import { useState } from "react";
import { useGetWorkspaceById } from "~/api/workspace/read/useGetWorkspaceById";
import { useCreatePage } from "~/api/workspace/write/useCreatePage";
import { useUpdatePageMetadata } from "~/api/workspace/write/useUpdatePageMetadata";
import { toast } from "sonner";
import type { PageDto } from "~/api/dtos/page_dto";

import { SidebarProvider, SidebarInset } from "~/components/ui/sidebar";
import { WorkspaceSidebar } from "./WorkspaceSidebar";
import { PageDialog } from "./PageDialog";

export default function WorkspaceLayout() {
  // Get workspace ID from URL params
  const { workspaceId } = useParams();
  const navigate = useNavigate();

  // Fetch workspace data
  const { data: workspace, isLoading } = useGetWorkspaceById(workspaceId as string);

  // Dialog state management
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState<"add" | "edit">("add");
  const [currentPage, setCurrentPage] = useState<PageDto | undefined>();

  // Mutations for CRUD operations
  const createPageMutation = useCreatePage();
  const updatePageMetadataMutation = useUpdatePageMetadata();

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">Loading workspace...</div>;
  }

  if (!workspace) {
    return <div className="flex items-center justify-center h-screen">Workspace not found</div>;
  }

  // Navigate to page details
  const handlePageClick = (pageId: string) => {
    navigate(`page/${pageId}`, { replace: true });
  };

  // Open edit dialog
  const handleEditPage = (page: PageDto) => {
    setCurrentPage(page);
    setDialogMode("edit");
    setIsDialogOpen(true);
  };

  // Open create dialog
  const handleAddPage = () => {
    setDialogMode("add");
    setCurrentPage(undefined);
    setIsDialogOpen(true);
  };

  // Handle dialog submission (create or update)
  const handleSubmitPage = async (title: string) => {
    try {
      if (dialogMode === "add") {
        await createPageMutation.mutateAsync({
          title,
          workspaceId: workspace.id,
        });
        toast.success("Page created successfully!");
      } else if (dialogMode === "edit" && currentPage) {
        await updatePageMetadataMutation.mutateAsync({
          id: currentPage.id,
          updateDto: { title },
        });
        toast.success("Page updated successfully!");
      }
      setIsDialogOpen(false);
    } catch (error) {
      console.error(`Failed to ${dialogMode} page:`, error);
      toast.error(`Failed to ${dialogMode} page`);
    }
  };

  return (
    <SidebarProvider defaultOpen={true}>
      <WorkspaceSidebar 
        workspace={workspace}
        onPageClick={handlePageClick}
        onAddPage={handleAddPage}
        onEditPage={handleEditPage}
        navigate={navigate}
      />

      <SidebarInset className="p-4 md:p-6">
        <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm py-2 mb-4">
          <div className="flex justify-between items-center">
            <div className="flex gap-2 items-center">
              {/* SidebarTrigger moved to SidebarHeader component */}
            </div>
          </div>
        </div>

        <main className="max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </SidebarInset>

      <PageDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        mode={dialogMode}
        initialValue={currentPage?.title || ""}
        isPending={createPageMutation.isPending || updatePageMetadataMutation.isPending}
        onSubmit={handleSubmitPage}
      />
    </SidebarProvider>
  );
}
