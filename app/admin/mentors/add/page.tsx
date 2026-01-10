"use client"
import AddStudentStaff from "@/app/ui/AddStudentStaff";
export default function AddStaffPage() {
  const staffSections = [
    {
      sectionTitle: "Employment Profile",
      fields: [
        { id: "staff-name", label: "Full Name", icon: "person", placeholder: "e.g. Dr. Sarah Smith" },
        { id: "staff-id", label: "Employee ID", icon: "badge", placeholder: "e.g. EMP-2024-05" },
        { id: "designation", label: "Designation", icon: "work", placeholder: "e.g. Assistant Professor" },
      ]
    },
    {
      sectionTitle: "Contact Info",
      fields: [
        { id: "email", label: "Work Email", icon: "mail", placeholder: "sarah@college.edu", type: "email" },
        { id: "phone", label: "Personal Mobile", icon: "call", placeholder: "+91 00000 00000", type: "tel" },
        { id: "notes", label: "Additional Notes", icon: "description", placeholder: "Description(optional)...", isTextArea: true },
      ]
    }
  ];

  return (
    <AddStudentStaff
      title="Add New Mentor"
      subtitle="Register a new faculty or administrative member."
      breadcrumbLabel="Mentor Directory"
      breadcrumbHref="/staff"
      sidebarIcon="badge"
      sidebarTitle="Mentor Onboarding"
      sidebarDesc="Provide the professional and contact details of the new Mentor member."
      sections={staffSections}
      submitLabel="Register Mentor"
      onSubmit={(e) => console.log("Mentor Data Submitted")}
    />
  );
}