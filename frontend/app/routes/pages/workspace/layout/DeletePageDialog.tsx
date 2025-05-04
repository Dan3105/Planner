import { toast } from "sonner";
import type { PageDto } from "~/api/dtos/page_dto";
import { useDeletePage } from "~/api/workspace/write/useDeletePage";
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

interface DeletePageDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  page: PageDto | null;
}

export function DeletePageDialog({ isOpen, onOpenChange, page }: DeletePageDialogProps) {
  const deletePageMutation = useDeletePage();

  const confirmDelete = async () => {
    if (!page) return;
    
    try {
      await deletePageMutation.mutateAsync(page.id);
      toast.success("Page deleted successfully!");
      onOpenChange(false);
    } catch (error) {
      console.error("Failed to delete page:", error);
      toast.error("Failed to delete page");
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the
            page "{page?.title}" and all its contents.
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
  );
}