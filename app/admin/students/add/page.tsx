"use client"
import AddStudentMentor from "@/app/ui/AddStudentMentor";

export default function AddStudentPage() {
  const studentSections = [
    {
      sectionTitle: "Academic Profile",
      fields: [
        { id: "student-name", label: "Full Name", icon: "person", placeholder: "e.g. John Doe" },
        { id: "enrollment", label: "Enrollment Number", icon: "id_card", placeholder: "e.g. BT2024001" },
        { id: "department", label: "Department", icon: "account_tree", placeholder: "e.g. Computer Science" },
        { id: "year", label: "Current Year/Sem", icon: "event_note", placeholder: "e.g. 3rd Year / 5th Sem" },
      ]
    },
    {
      sectionTitle: "Communication",
      fields: [
        { id: "email", label: "Student Email", icon: "mail", placeholder: "john.doe@college.edu", type: "email" },
        { id: "phone", label: "Mobile Number", icon: "call", placeholder: "+91 00000 00000", type: "tel" },
        { id: "notes", label: "Additional Notes", icon: "description", placeholder: "Description(optional)...", isTextArea: true },
      ]
    },
  ];

  return (
    <AddStudentMentor
      title="Add New Student"
      subtitle="Please fill in the personal and academic details below."
      breadcrumbLabel="Student Directory"
      breadcrumbHref="/students"
      sidebarIcon="person_add"
      sidebarTitle="Onboard Student"
      sidebarDesc="Add a new student to your database to begin their journey."
      sections={studentSections}
      submitLabel="Confirm Registration"
      onSubmit={(e) => console.log("Student Data Submitted")}
    />
  );
}