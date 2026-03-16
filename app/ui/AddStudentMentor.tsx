"use client";
import React from "react";
import Link from "next/link";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Textarea } from "@/app/components/ui/textarea";
import { Card, CardContent } from "@/app/components/ui/card";
import { Separator } from "@/app/components/ui/separator";
import { CheckCircle, Loader2 } from "lucide-react";

interface Field {
  id: string;
  label: string;
  icon: string;
  placeholder: string;
  type?: string;
  isTextArea?: boolean;
}

interface FormSection {
  sectionTitle: string;
  fields: Field[];
}

interface UniversalFormProps {
  title: string;
  subtitle: string;
  breadcrumbLabel: string;
  breadcrumbHref: string;
  sidebarIcon: string;
  sidebarTitle: string;
  sidebarDesc: string;
  sections: FormSection[];
  submitLabel: string;
  onSubmit: (data: any) => void;
  errors?: string[];
  isLoading?: boolean;
  initialData?: any;
}

const InputField = ({ label, id, placeholder, type = "text", isTextArea, isError, defaultValue }: Field & { isError: boolean; defaultValue?: string }) => (
  <div className="space-y-2">
    <Label htmlFor={id} className={isError ? "text-destructive" : ""}>
      {label}
    </Label>
    {isTextArea ? (
      <Textarea
        id={id}
        name={id}
        rows={3}
        defaultValue={defaultValue}
        className={isError ? "border-destructive focus-visible:ring-destructive bg-destructive/5" : ""}
        placeholder={placeholder}
      />
    ) : (
      <Input
        id={id}
        name={id}
        placeholder={placeholder}
        type={type}
        defaultValue={defaultValue}
        className={`h-11 ${isError ? "border-destructive focus-visible:ring-destructive bg-destructive/5" : ""}`}
      />
    )}
  </div>
);

export default function AddStudentMentor({
  title, subtitle, breadcrumbLabel, breadcrumbHref, sidebarIcon, sidebarTitle, sidebarDesc,
  sections, submitLabel, onSubmit, errors = [], isLoading = false, initialData = {},
}: UniversalFormProps) {
  return (
    <div className="bg-background text-foreground font-sans min-h-screen flex flex-col">
      <main className="flex-grow flex flex-col items-center justify-center p-4 py-8 sm:py-12 relative">
        {/* Background blobs */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
          <div className="absolute -top-[20%] -right-[10%] w-[600px] h-[600px] rounded-full bg-muted blur-3xl" />
          <div className="absolute top-[40%] -left-[10%] w-[500px] h-[500px] rounded-full bg-muted/50 blur-3xl" />
        </div>

        <div className="w-full max-w-[1000px] relative z-10 flex flex-col md:flex-row overflow-hidden">
          {/* Sidebar */}
          <Card className="hidden md:flex flex-col w-1/3 rounded-r-none border-r-0">
            <CardContent className="p-8 flex flex-col justify-between h-full">
              <div>
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary text-primary-foreground mb-6 shadow-sm">
                  <CheckCircle className="size-5" />
                </div>
                <h2 className="text-2xl font-bold text-foreground mb-3">{sidebarTitle}</h2>
                <p className="text-muted-foreground text-sm leading-relaxed">{sidebarDesc}</p>
              </div>
            </CardContent>
          </Card>

          {/* Form */}
          <Card className="flex-1 md:rounded-l-none md:border-l-0">
            <CardContent className="p-6 sm:p-10">
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-2">
                  <Link href={breadcrumbHref} className="text-xs font-bold text-muted-foreground uppercase tracking-widest hover:underline hover:text-foreground">
                    {breadcrumbLabel}
                  </Link>
                  <span className="text-muted-foreground/50 text-xs">/</span>
                  <span className="text-xs font-bold text-muted-foreground/50 uppercase tracking-widest">New Entry</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">{title}</h1>
                <p className="text-muted-foreground">{subtitle}</p>
              </div>

              <form
                className="space-y-6"
                onSubmit={(e) => {
                  e.preventDefault();
                  if (isLoading) return;
                  const form = e.currentTarget;
                  const formData = new FormData(form);
                  const data = Object.fromEntries(formData.entries());
                  onSubmit(data);
                }}
              >
                {sections.map((section, idx) => (
                  <div key={idx} className="space-y-4">
                    <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-primary" />
                      {section.sectionTitle}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {section.fields.map((field) => (
                        <div key={field.id} className={field.isTextArea ? "md:col-span-2" : ""}>
                          <InputField
                            {...field}
                            isError={errors.includes(field.id)}
                            defaultValue={initialData[field.id]}
                          />
                        </div>
                      ))}
                    </div>
                    {idx !== sections.length - 1 && <Separator />}
                  </div>
                ))}

                <div className="pt-4 flex gap-3">
                  <Button variant="outline" type="button" disabled={isLoading} className="flex-1">
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isLoading} className="flex-[2] gap-2">
                    {isLoading ? (
                      <>
                        <Loader2 className="size-4 animate-spin" />
                        Confirming...
                      </>
                    ) : (
                      <>
                        {submitLabel}
                        <CheckCircle className="size-4" />
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}