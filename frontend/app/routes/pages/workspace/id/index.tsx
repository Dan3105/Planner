import { useParams, useNavigate } from "react-router";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { useDeletePage } from "~/api/workspace/write/useDeletePage";
import { toast } from "sonner";
import type { PageDto } from "~/api/dtos/page_dto";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
} from "~/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "~/components/ui/alert-dialog";
import { useGetWorkspaceById } from "~/api/workspace/read/useGetWorkspaceById";

export default function WorkspaceDetailPage() {
  const { workspaceId } = useParams();
  const navigate = useNavigate();
  
  // Fetch workspace data
  const { data: workspace, isLoading } = useGetWorkspaceById(workspaceId as string);
  
  // Delete confirmation state
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [pageToDelete, setPageToDelete] = useState<PageDto | null>(null);
  
  // Delete mutation
  const deletePageMutation = useDeletePage();

  if (isLoading) {
    return <div>Loading workspace content...</div>;
  }
  
  if (!workspace) {
    return <div>Workspace not found</div>;
  }

  // Open delete confirmation
  const handleDeletePage = (page: PageDto) => {
    setPageToDelete(page);
    setDeleteDialogOpen(true);
  };

  // Confirm and delete page
  const confirmDelete = async () => {
    if (!pageToDelete) return;
    
    try {
      await deletePageMutation.mutateAsync(pageToDelete.id);
      toast.success("Page deleted successfully!");
      setDeleteDialogOpen(false);
      setPageToDelete(null);
    } catch (error) {
      console.error("Failed to delete page:", error);
      toast.error("Failed to delete page");
    }
  };
  
  // Navigate to page details
  const handlePageClick = (pageId: string) => {
    navigate(`/pages/${pageId}`);
  };

  return (
    <div>
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold">{workspace.title}</h1>
      </div>

      {workspace.pages.length === 0 ? (
        <div className="text-center p-8 border border-dashed rounded-lg">
          <p className="text-muted-foreground">
            No pages yet. Create your first page by clicking the "Add Page" button in the sidebar.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {workspace.pages.map((page) => (
            <Card
              key={page.id}
              className="cursor-pointer hover:bg-accent/50 transition-colors"
              onClick={() => handlePageClick(page.id)}
            >
              <CardHeader>
                <CardTitle>{page.title}</CardTitle>
                <CardDescription>
                  Created: {new Date(page.createdAt).toLocaleDateString()}
                </CardDescription>
                <CardAction className="flex gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeletePage(page);
                    }}
                    className="p-2 hover:bg-destructive hover:text-destructive-foreground rounded-md"
                    aria-label="Delete page"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </CardAction>
              </CardHeader>
            </Card>
          ))}
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              page "{pageToDelete?.title}" and all its contents.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              disabled={deletePageMutation.isPending}
            >
              {deletePageMutation.isPending ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
