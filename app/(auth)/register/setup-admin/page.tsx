import React, { Suspense } from "react";
import SetupAdminForm from "./setup-admin-form";

export default function SetupAdminPage() {
  return (
    <Suspense fallback={<div className="bg-background text-foreground font-sans min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8">Loading...</div>}>
      <SetupAdminForm />
    </Suspense>
  );
}
