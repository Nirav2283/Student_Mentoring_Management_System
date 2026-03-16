"use client";

import { useState, useTransition } from "react";
import { Button } from "@/app/components/ui/button";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import { deleteMentorAction } from "./actions";
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

export default function DeleteMentorButton({ mentorId }: { mentorId: number }) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleConfirm = () => {
    startTransition(async () => {
      const result = await deleteMentorAction(mentorId);
      if (result.success) {
        toast.success("Mentor deleted successfully");
        setOpen(false);
      } else {
        toast.error(result.error || "Failed to delete mentor");
      }
    });
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
        disabled={isPending}
      >
        <Trash2 className="size-4" />
      </Button>

      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Mentor?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this mentor? This action cannot be undone and will permanently remove the mentor record.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={(e) => {
                e.preventDefault(); // Prevent closing immediately to show loading state if needed
                handleConfirm();
              }}
              disabled={isPending}
            >
              {isPending ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
