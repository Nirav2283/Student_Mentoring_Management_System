"use client"
import AddStudentMentor from "@/app/ui/AddStudentMentor";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { trackedFetch } from "@/app/lib/trackedFetch";

export default function AddStudentPage() {
  const router = useRouter();
  const [errors, setErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

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

  const handleSubmit = async (formData: any) => {
    setLoading(true);
    setErrors([]);
    const newErrors: string[] = [];
    studentSections.forEach(section => {
      section.fields.forEach(field => {
        const value = formData[field.id];
        if (field.id !== "notes" && (!value || String(value).trim() === "")) {
          newErrors.push(field.id);
        }
      });
    });

    if (newErrors.length > 0) {
      setErrors(newErrors);
      setLoading(false);
      return;
    }

    try {
      const res = await trackedFetch("/api/students", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          StudentName: formData["student-name"],
          EnrollmentNo: formData["enrollment"],
          Department: formData["department"],
          CurrentSem: parseInt(formData["year"]),
          EmailAddress: formData["email"],
          MobileNo: formData["phone"],
          Description: formData["notes"],
        }),
      });

      const data = await res.json();

      if (data.success) {
        toast.success("Student added successfully!");
        router.refresh();
        router.push('/admin/students');
      } else {
        toast.error(data.message || "Failed to add student.");
        setLoading(false);
      }
    } catch (err) {
      console.error(err);
      toast.error("An unexpected error occurred. Please try again.");
      setLoading(false);
    }
  };

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
      onSubmit={handleSubmit}
      errors={errors}
      isLoading={loading} 
    />
  );
}