import { Outlet, useNavigate, useParams } from "react-router";
import { useState } from "react";
import { useGetWorkspaceById } from "~/api/workspace/read/useGetWorkspaceById";
import { useCreatePage } from "~/api/workspace/write/useCreatePage";
import { useUpdatePageMetadata } from "~/api/workspace/write/useUpdatePageMetadata";
import { toast } from "sonner";
import type { PageDto } from "~/api/dtos/page_dto";

import { SidebarProvider, SidebarInset, SidebarTrigger } from "~/components/ui/sidebar";
import { WorkspaceSidebar } from "./WorkspaceSidebar";
import { PageDialog } from "./PageDialog";
import { DeletePageDialog } from "./DeletePageDialog";

// Define a type for all possible page operations
type PageOperationMode = "add" | "edit" | "delete" | null;

export default function WorkspaceLayout() {
  // Get workspace ID from URL params
  const { workspaceId } = useParams();
  const navigate = useNavigate();

  // Fetch workspace data
  const { data: workspace, isLoading } = useGetWorkspaceById(workspaceId as string);

  // Unified page operation state
  const [operationMode, setOperationMode] = useState<PageOperationMode>(null);
  const [targetPage, setTargetPage] = useState<PageDto | null>(null);
  const [parentPage, setParentPage] = useState<PageDto | null>(null);

  // Mutations for CRUD operations
  const createPageMutation = useCreatePage();
  const updatePageMetadataMutation = useUpdatePageMetadata();

  // Dialog state getters
  const isEditDialogOpen = operationMode === "edit" || operationMode === "add";
  const isDeleteDialogOpen = operationMode === "delete";

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">Loading workspace...</div>;
  }

  if (!workspace) {
    return <div className="flex items-center justify-center h-screen">Workspace not found</div>;
  }

  // Navigate to page details
  const handlePageClick = (pageId: string) => {
    navigate(`/workspace/${workspaceId}/page/${pageId}`);
  };

  // Unified handlers for page operations
  const handleEditPage = (page: PageDto) => {
    setTargetPage(page);
    setOperationMode("edit");
  };

  const handleAddPage = (parentPage?: PageDto) => {
    setTargetPage(null);
    setParentPage(parentPage || null);
    setOperationMode("add");
  };

  const handleDeletePage = (page: PageDto) => {
    setTargetPage(page);
    setOperationMode("delete");
  };

  // Close any open dialog
  const handleCloseDialog = () => {
    setOperationMode(null);
    setTargetPage(null);
    setParentPage(null);
  };

  // Handle edit/create dialog submission
  const handleSubmitPage = async (title: string) => {
    try {
      if (operationMode === "add") {
        await createPageMutation.mutateAsync({
          title,
          workspaceId: workspace.id,
          parentId: parentPage?.id as string,
        });
        toast.success("Page created successfully!");
      } else if (operationMode === "edit" && targetPage) {
        await updatePageMetadataMutation.mutateAsync({
          id: targetPage.id,
          updateDto: { title },
        });
        toast.success("Page updated successfully!");
      }
      handleCloseDialog();
    } catch (error) {
      console.error(`Failed to ${operationMode} page:`, error);
      toast.error(`Failed to ${operationMode} page`);
    }
  };

  return (
    <SidebarProvider defaultOpen={true}>
      <WorkspaceSidebar 
        workspace={workspace}
        onPageClick={handlePageClick}
        onAddPage={handleAddPage}
        onDeletePage={handleDeletePage}
        onEditPage={handleEditPage}
        navigate={navigate}
      />

      <SidebarInset className="p-4 md:p-6">
        <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm py-2 mb-4">
          <div className="flex justify-between items-center">
            <div className="flex gap-2 items-center">
              {/* SidebarTrigger moved to SidebarHeader component */}
              <SidebarTrigger/>
            </div>
          </div>
        </div>

        <main className="max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </SidebarInset>

      {/* Unified dialog rendering */}
      <PageDialog
        open={isEditDialogOpen}
        onOpenChange={(open) => !open && handleCloseDialog()}
        mode={operationMode === "add" ? "add" : "edit"}
        initialValue={targetPage?.title || ""}
        isPending={createPageMutation.isPending || updatePageMetadataMutation.isPending}
        onSubmit={handleSubmitPage}
      />

      <DeletePageDialog 
        isOpen={isDeleteDialogOpen}
        onOpenChange={(open) => !open && handleCloseDialog()}
        page={targetPage}
      />
    </SidebarProvider>
  );
}