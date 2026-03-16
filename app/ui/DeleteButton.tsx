"use client";

import { useRef, useState } from "react";
import { Button } from "@/app/components/ui/button";
import { Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/app/components/ui/alert-dialog";

export default function DeleteButton() {
  const [open, setOpen] = useState(false);
  const submitBtnRef = useRef<HTMLButtonElement>(null);

  const handleConfirm = () => {
    if (submitBtnRef.current) {
      submitBtnRef.current.click();
    }
  };

  return (
    <>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="size-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
        title="Delete"
        onClick={() => setOpen(true)}
      >
        <Trash2 className="size-4" />
      </Button>

      {/* Hidden button actually handles the true form submission */}
      <button ref={submitBtnRef} type="submit" className="hidden" aria-hidden="true" />

      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Record?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this record? This action cannot be undone and will permanently remove the data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirm}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
