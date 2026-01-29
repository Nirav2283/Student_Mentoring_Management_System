"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import AddStudentMentor from "@/app/ui/AddStudentMentor";
export default function AddMentorPage() {
  const router = useRouter();
  const [errors, setErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const mentorSections = [
    {
      sectionTitle: "Employment Profile",
      fields: [
        {
          id: "mentor-name",
          label: "Full Name",
          icon: "person",
          placeholder: "e.g. Dr. Sarah Smith",
        },
        {
          id: "mentor-id",
          label: "Department",
          icon: "badge",
          placeholder: "e.g. CSE,Mechanical",
        },
        {
          id: "designation",
          label: "Education",
          icon: "work",
          placeholder: "e.g. B.tech , M.tech",
        },
      ],
    },
    {
      sectionTitle: "Contact Info",
      fields: [
        {
          id: "email",
          label: "Work Email",
          icon: "mail",
          placeholder: "sarah@college.edu",
          type: "email",
        },
        {
          id: "phone",
          label: "Personal Mobile",
          icon: "call",
          placeholder: "+91 00000 00000",
          type: "tel",
        },
        {
          id: "notes",
          label: "Additional Notes",
          icon: "description",
          placeholder: "Description(optional)...",
          isTextArea: true,
        },
      ],
    },
  ];

  const handleSubmit = async (formData: any) => {
    try {
      setLoading(true);
      setErrors([]);

      const newErrors: string[] = [];
      mentorSections.forEach((section) => {
        section.fields.forEach((field) => {
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

      const res = await fetch("/api/mentors", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          MentorName: formData["mentor-name"],
          Department: formData["mentor-id"],
          Education: formData["designation"],
          EmailAddress: formData["email"],
          MobileNo: formData["phone"],
          Description: formData["notes"],
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrors([data.message || "Failed to add mentor"]);
        return;
      }

      router.push("/admin/mentors");
    } catch (err) {
      setErrors(["Something went wrong"]);
    } finally {
      setLoading(false);
    }
  };

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
      onSubmit={handleSubmit}
      isLoading={loading}
      errors={errors}
    />
  );
}
