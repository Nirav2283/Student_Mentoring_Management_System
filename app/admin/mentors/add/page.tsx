"use client"
import AddStudentMentor from "@/app/ui/AddStudentMentor";
export default function AddMentorPage() {
  const mentorSections = [
    {
      sectionTitle: "Employment Profile",
      fields: [
        { id: "mentor-name", label: "Full Name", icon: "person", placeholder: "e.g. Dr. Sarah Smith" },
        { id: "mentor-id", label: "Employee ID", icon: "badge", placeholder: "e.g. EMP-2024-05" },
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
    <AddStudentMentor
      title="Add New Mentor"
      subtitle="Register a new faculty or administrative member."
      breadcrumbLabel="Mentor Directory"
      breadcrumbHref="/admin/mentors"
      sidebarIcon="badge"
      sidebarTitle="Mentor Onboarding"
      sidebarDesc="Provide the professional and contact details of the new Mentor member."
      sections={mentorSections}
      submitLabel="Register Mentor"
      onSubmit={(e) => console.log("Mentor Data Submitted")}
    />
  );
}