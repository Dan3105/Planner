import { FormDialog } from "~/components/dialog/form-dialog";

interface PageDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: "add" | "edit";
  initialValue: string;
  isPending: boolean;
  onSubmit: (title: string) => Promise<void>;
}

export function PageDialog({
  open,
  onOpenChange,
  mode,
  initialValue,
  isPending,
  onSubmit,
}: PageDialogProps) {
  return (
    <FormDialog
      open={open}
      onOpenChange={onOpenChange}
      mode={mode}
      title={mode === "add" ? "Create Page" : "Edit Page"}
      description={
        mode === "add"
          ? "Add a new page to this workspace."
          : "Edit the page details."
      }
      fieldLabel="Title"
      fieldPlaceholder="Enter page title"
      initialValue={initialValue}
      isPending={isPending}
      onSubmit={onSubmit}
    />
  );
}
