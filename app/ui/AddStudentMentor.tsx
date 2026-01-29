"use client";
import React from "react";
import Link from "next/link";

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
  isLoading?: boolean; // Defined in interface
}

const InputField = ({ label, id, icon, placeholder, type = "text", isTextArea, isError }: Field & { isError: boolean }) => (
  <div className="space-y-1.5">
    <label className={`block text-sm font-medium ${isError ? "text-red-600" : "text-gray-700"}`} htmlFor={id}>
      {label}
    </label>
    <div className="relative">
      <span className={`absolute ${isTextArea ? "top-3" : "inset-y-0"} left-0 pl-3 flex items-center pointer-events-none ${isError ? "text-red-400" : "text-gray-400"}`}>
        <span className="material-symbols-outlined text-[20px]">{icon}</span>
      </span>
      {isTextArea ? (
        <textarea
          id={id}
          name={id}
          rows={3}
          className={`block w-full pl-10 rounded-lg border focus:ring-1 sm:text-sm py-2.5 transition-colors resize-none 
            ${isError ? "border-red-500 focus:border-red-500 focus:ring-red-500 bg-red-50" : "border-gray-300 focus:border-[#135bec] focus:ring-[#135bec] bg-white text-gray-900"}`}
          placeholder={placeholder}
        />
      ) : (
        <input
          id={id}
          name={id}
          placeholder={placeholder}
          type={type}
          className={`block w-full pl-10 rounded-lg border shadow-sm focus:ring-1 sm:text-sm h-11 transition-colors 
            ${isError ? "border-red-500 focus:border-red-500 focus:ring-red-500 bg-red-50" : "border-gray-300 focus:border-[#135bec] focus:ring-[#135bec] bg-white text-gray-900"}`}
        />
      )}
    </div>
  </div>
);

export default function AddStudentMentor({
  title,
  subtitle,
  breadcrumbLabel,
  breadcrumbHref,
  sidebarIcon,
  sidebarTitle,
  sidebarDesc,
  sections,
  submitLabel,
  onSubmit,
  errors = [],
  isLoading = false, // Destructured here
}: UniversalFormProps) {
  return (
    <div className="bg-[#f6f6f8] text-[#111318] font-sans min-h-screen flex flex-col">
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght@100..700&display=block"
      />

      <main className="flex-grow flex flex-col items-center justify-center p-4 py-8 sm:py-12 relative">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
          <div className="absolute -top-[20%] -right-[10%] w-[600px] h-[600px] rounded-full bg-[#135bec]/5 blur-3xl"></div>
          <div className="absolute top-[40%] -left-[10%] w-[500px] h-[500px] rounded-full bg-blue-400/5 blur-3xl"></div>
        </div>

        <div className="w-full max-w-[1000px] relative z-10 flex flex-col md:flex-row bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
          <div className="hidden md:flex flex-col w-1/3 bg-gray-50 border-r border-gray-100 p-8 justify-between relative">
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: "radial-gradient(#135bec 1px, transparent 1px)",
                backgroundSize: "20px 20px",
              }}
            ></div>
            <div className="relative z-10">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[#135bec] text-white mb-6 shadow-lg shadow-[#135bec]/30">
                <span className="material-symbols-outlined">{sidebarIcon}</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">{sidebarTitle}</h2>
              <p className="text-gray-600 text-sm leading-relaxed mb-8">{sidebarDesc}</p>
            </div>
          </div>

          <div className="flex-1 p-6 sm:p-10">
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-2">
                <Link href={breadcrumbHref} className="text-xs font-bold text-[#135bec] uppercase tracking-widest hover:underline">
                  {breadcrumbLabel}
                </Link>
                <span className="text-gray-300 text-xs">/</span>
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">New Entry</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">{title}</h1>
              <p className="text-gray-500">{subtitle}</p>
            </div>

            <form
              className="space-y-6"
              onSubmit={(e) => {
                e.preventDefault();
                if (isLoading) return; // Prevent extra submissions
                const form = e.currentTarget;
                const formData = new FormData(form);
                const data = Object.fromEntries(formData.entries());
                onSubmit(data);
              }}
            >
              {sections.map((section, idx) => (
                <div key={idx} className="space-y-4">
                  <h3 className="text-xs font-bold text-[#135bec] uppercase tracking-widest flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#135bec]"></span>
                    {section.sectionTitle}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {section.fields.map((field) => (
                      <div key={field.id} className={field.isTextArea ? "md:col-span-2" : ""}>
                        <InputField 
                          {...field} 
                          isError={errors.includes(field.id)} 
                        />
                      </div>
                    ))}
                  </div>
                  {idx !== sections.length - 1 && <hr className="border-gray-100" />}
                </div>
              ))}

              <div className="pt-4 flex gap-3">
                <button
                  className="flex-1 py-3 px-4 border border-gray-200 rounded-lg text-sm font-bold text-gray-600 bg-gray-50 hover:bg-gray-100 transition-all"
                  type="button"
                  disabled={isLoading}
                >
                  Cancel
                </button>
                <button
                  className={`flex-[2] flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-lg text-sm font-bold text-white transition-all transform 
                    ${isLoading 
                      ? "bg-blue-400 cursor-not-allowed" 
                      : "bg-[#135bec] hover:bg-blue-700 hover:scale-[1.01]"
                    }`}
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <span className="animate-spin mr-2">
                        <span className="material-symbols-outlined text-[20px]">sync</span>
                      </span>
                      Confirming...
                    </>
                  ) : (
                    <>
                      {submitLabel}
                      <span className="material-symbols-outlined text-[20px] ml-2">check_circle</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}