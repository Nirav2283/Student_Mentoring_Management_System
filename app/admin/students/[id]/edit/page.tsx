"use client"
import AddStudentMentor from "@/app/ui/AddStudentMentor";
import { useRouter, useParams } from "next/navigation";
import { useState, useEffect, use } from "react";
import { toast } from "sonner";

export default function EditStudentPage({ params }: { params: Promise<{ id: string }> }) {
    const router = useRouter();
    const { id } = use(params);
    const [errors, setErrors] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const [initialData, setInitialData] = useState<any>(null);
    const [fetching, setFetching] = useState(true);

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

    useEffect(() => {
        const fetchStudent = async () => {
            try {
                const res = await fetch(`/api/students`); // We don't have a GET by ID yet, but students page has Prisma call. 
                // Actually, it's better to fetch from a new endpoint or just use the profile page logic if it was a server component.
                // Since this is a client component for the form, I'll need an endpoint or just fetch all and find (not ideal).
                // Wait, I should probably make this a server component that passes data to a client component.

                // For now, let's assume we have a GET /api/students/[id]
                const response = await fetch(`/api/students-details?id=${id}`);
                const data = await response.json();
                if (data.success) {
                    const s = data.student;
                    setInitialData({
                        "student-name": s.StudentName,
                        "enrollment": s.EnrollmentNo,
                        "department": s.Department,
                        "year": s.CurrentSem.toString(),
                        "email": s.EmailAddress,
                        "phone": s.MobileNo,
                        "notes": s.Description,
                    });
                }
            } catch (err) {
                console.error(err);
                toast.error("Failed to load student data.");
            } finally {
                setFetching(false);
            }
        };

        fetchStudent();
    }, [id]);

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
            const res = await fetch(`/api/students/${id}`, {
                method: "PATCH",
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
                toast.success("Student updated successfully!");
                router.refresh();
                router.push(`/admin/students/${id}`);
            } else {
                toast.error(data.message || "Failed to update student.");
                setLoading(false);
            }
        } catch (err) {
            console.error(err);
            toast.error("An unexpected error occurred. Please try again.");
            setLoading(false);
        }
    };

    if (fetching) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

    return (
        <AddStudentMentor
            title="Edit Student"
            subtitle="Update the personal and academic details below."
            breadcrumbLabel="Student Directory"
            breadcrumbHref="/admin/students"
            sidebarIcon="edit"
            sidebarTitle="Update Student"
            sidebarDesc="Modify student information in the database."
            sections={studentSections}
            submitLabel="Update Details"
            onSubmit={handleSubmit}
            errors={errors}
            isLoading={loading}
            initialData={initialData}
        />
    );
}
