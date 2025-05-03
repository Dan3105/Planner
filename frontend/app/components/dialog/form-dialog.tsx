import { useState, useEffect } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
  DialogClose,
} from "~/components/ui/dialog";

import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";

interface FormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: "add" | "edit";
  title: string;
  description?: string;
  fieldLabel?: string;
  fieldPlaceholder?: string;
  initialValue?: string;
  submitLabel?: string;
  cancelLabel?: string;
  isPending?: boolean;
  onSubmit: (value: string) => void;
}

export function FormDialog({
  open,
  onOpenChange,
  mode,
  title,
  description,
  fieldLabel = "Title",
  fieldPlaceholder = "Enter title...",
  initialValue = "",
  submitLabel,
  cancelLabel = "Cancel",
  isPending = false,
  onSubmit
}: FormDialogProps) {
  const [value, setValue] = useState(initialValue);
  
  // Reset value when dialog opens/closes or initialValue changes
  useEffect(() => {
    setValue(initialValue);
  }, [initialValue, open]);

  const handleSubmit = () => {
    if (!value.trim()) return;
    onSubmit(value.trim());
  };

  // Default submit label based on mode if not provided
  const defaultSubmitLabel = mode === "add" ? "Create" : "Save";
  const actualSubmitLabel = submitLabel || defaultSubmitLabel;
  const pendingText = mode === "add" ? "Creating..." : "Saving...";
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="form-field" className="text-right">
              {fieldLabel}
            </Label>
            <Input
              id="form-field"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="col-span-3"
              placeholder={fieldPlaceholder}
              autoFocus
            />
          </div>
        </div>
        
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">{cancelLabel}</Button>
          </DialogClose>
          <Button 
            onClick={handleSubmit}
            disabled={isPending || !value.trim()}
          >
            {isPending ? pendingText : actualSubmitLabel}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
