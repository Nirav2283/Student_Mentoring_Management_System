import React, { Suspense } from "react";
import ResetPasswordForm from "./reset-password-form";

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div className="font-sans bg-background min-h-screen flex flex-col items-center justify-center p-6">Loading...</div>}>
      <ResetPasswordForm />
    </Suspense>
  );
}
