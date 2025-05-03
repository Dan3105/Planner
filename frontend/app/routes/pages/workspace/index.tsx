import { Link, useNavigate } from "react-router";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import { useGetAllWorkspaces } from "~/api/workspace/read/useGetAllWorkspaces";
import { useCreateWorkspace } from "~/api/workspace/write/useCreateWorkspace";
import { useUpdateWorkspace } from "~/api/workspace/write/useUpdateWorkspace";
import { useDeleteWorkspace } from "~/api/workspace/write/useDeleteWorkspace";
import { toast } from "sonner";
import type { WorkspaceDto } from "~/api/dtos/workspace_dto";
import { FormDialog } from "~/components/dialog/form-dialog";
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardAction,
} from "~/components/ui/card";
import { Button } from "~/components/ui/button";
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

export default function WorkspacePage() {
    const navigate = useNavigate();
    const { data: workspaces, isLoading } = useGetAllWorkspaces();
    
    // Dialog state management
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [dialogMode, setDialogMode] = useState<"add" | "edit">("add");
    const [currentWorkspace, setCurrentWorkspace] = useState<WorkspaceDto | undefined>();
    
    // Delete confirmation state
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [workspaceToDelete, setWorkspaceToDelete] = useState<WorkspaceDto | null>(null);
    
    // Mutations
    const createWorkspaceMutation = useCreateWorkspace();
    const updateWorkspaceMutation = useUpdateWorkspace();
    const deleteWorkspaceMutation = useDeleteWorkspace();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    const handleCardClick = (workspaceId: string) => {
        navigate(`/workspace/${workspaceId}`);
    };

    // Open edit dialog
    const handleEdit = (e: React.MouseEvent, workspace: WorkspaceDto) => {
        e.stopPropagation(); // Prevent card click event
        setCurrentWorkspace(workspace);
        setDialogMode("edit");
        setIsDialogOpen(true);
    };

    // Open delete confirmation
    const handleDelete = (e: React.MouseEvent, workspace: WorkspaceDto) => {
        e.stopPropagation(); // Prevent card click event
        setWorkspaceToDelete(workspace);
        setDeleteDialogOpen(true);
    };

    // Open create dialog
    const handleAddWorkspace = () => {
        setDialogMode("add");
        setCurrentWorkspace(undefined);
        setIsDialogOpen(true);
    };

    // Handle dialog submission (create or update)
    const handleSubmitWorkspace = async (title: string) => {
        try {
            if (dialogMode === "add") {
                await createWorkspaceMutation.mutateAsync({ title });
                toast.success("Workspace created successfully!");
            } else if (dialogMode === "edit" && currentWorkspace) {
                await updateWorkspaceMutation.mutateAsync({ id: currentWorkspace.id, title });
                toast.success("Workspace updated successfully!");
            }
            setIsDialogOpen(false);
        } catch (error) {
            console.error(`Failed to ${dialogMode} workspace:`, error);
            toast.error(`Failed to ${dialogMode} workspace`);
        }
    };

    // Confirm and delete workspace
    const confirmDelete = async () => {
        if (!workspaceToDelete) return;
        
        try {
            await deleteWorkspaceMutation.mutateAsync(workspaceToDelete.id);
            toast.success("Workspace deleted successfully!");
            setDeleteDialogOpen(false);
            setWorkspaceToDelete(null);
        } catch (error) {
            console.error("Failed to delete workspace:", error);
            toast.error("Failed to delete workspace");
        }
    };

    return (
        <div className="container mx-auto p-6">
            <div className="mb-6 flex justify-between items-center">
                <h1 className="text-2xl font-bold">Workspaces</h1>
                <Button onClick={handleAddWorkspace}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Workspace
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {workspaces?.map((workspace) => (
                    <Card
                        key={workspace.id}
                        className="cursor-pointer hover:bg-accent/50 transition-colors"
                        onClick={() => handleCardClick(workspace.id)}
                    >
                        <CardHeader>
                            <CardTitle>{workspace.title}</CardTitle>
                            <CardDescription>
                                Created: {new Date(workspace.createdAt).toLocaleDateString()}
                            </CardDescription>
                            <CardAction className="flex gap-2">
                                <button
                                    onClick={(e) => handleEdit(e, workspace)}
                                    className="p-2 hover:bg-accent rounded-md"
                                >
                                    <Pencil className="h-4 w-4" />
                                </button>
                                <button
                                    onClick={(e) => handleDelete(e, workspace)}
                                    className="p-2 hover:bg-destructive hover:text-destructive-foreground rounded-md"
                                >
                                    <Trash2 className="h-4 w-4" />
                                </button>
                            </CardAction>
                        </CardHeader>
                    </Card>
                ))}
            </div>

            {/* Use FormDialog instead of WorkspaceDialog */}
            <FormDialog 
                open={isDialogOpen}
                onOpenChange={setIsDialogOpen}
                mode={dialogMode}
                title={dialogMode === "add" ? "Create New Workspace" : "Edit Workspace"}
                description={dialogMode === "add" 
                    ? "Enter a name for your new workspace."
                    : "Update the name of your workspace."
                }
                fieldLabel="Title"
                fieldPlaceholder="Workspace name"
                initialValue={currentWorkspace?.title || ""}
                isPending={
                    dialogMode === "add" 
                        ? createWorkspaceMutation.isPending 
                        : updateWorkspaceMutation.isPending
                }
                onSubmit={handleSubmitWorkspace}
            />

            {/* Delete Confirmation Dialog */}
            <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete the
                            workspace "{workspaceToDelete?.title}" and all its contents.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={confirmDelete}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                            {deleteWorkspaceMutation.isPending ? "Deleting..." : "Delete"}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}