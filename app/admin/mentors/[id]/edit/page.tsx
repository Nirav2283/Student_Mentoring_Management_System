"use client";
import { useRouter, useParams } from "next/navigation";
import { useState, useEffect, use } from "react";
import AddStudentMentor from "@/app/ui/AddStudentMentor";
import { toast } from "sonner";
import { trackedFetch } from "@/app/lib/trackedFetch";

export default function EditMentorPage({ params }: { params: Promise<{ id: string }> }) {
    const router = useRouter();
    const { id } = use(params);
    const [errors, setErrors] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const [initialData, setInitialData] = useState<any>(null);
    const [fetching, setFetching] = useState(true);

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

    useEffect(() => {
        const fetchMentor = async () => {
            try {
                const response = await trackedFetch(`/api/mentors-details?id=${id}`);
                const data = await response.json();
                if (data.success) {
                    const m = data.mentor;
                    setInitialData({
                        "mentor-name": m.MentorName,
                        "mentor-id": m.Department,
                        "designation": m.Education,
                        "email": m.EmailAddress,
                        "phone": m.MobileNo,
                        "notes": m.Description,
                    });
                }
            } catch (err) {
                console.error(err);
                toast.error("Failed to load mentor data.");
            } finally {
                setFetching(false);
            }
        };
        fetchMentor();
    }, [id]);

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

            const res = await trackedFetch(`/api/mentors/${id}`, {
                method: "PATCH",
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
                toast.error(data.message || "Failed to update mentor.");
                setErrors([data.message || "Failed to update mentor"]);
                return;
            }

            toast.success("Mentor updated successfully!");
            router.refresh();
            router.push(`/admin/mentors/${id}`);
        } catch (err) {
            console.error(err);
            toast.error("Something went wrong. Please try again.");
            setErrors(["Something went wrong"]);
        } finally {
            setLoading(false);
        }
    };

    if (fetching) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

    return (
        <AddStudentMentor
            title="Edit Mentor"
            subtitle="Update faculty or administrative member details."
            breadcrumbLabel="Mentor Directory"
            breadcrumbHref="/admin/mentors"
            sidebarIcon="edit"
            sidebarTitle="Mentor Update"
            sidebarDesc="Modify the professional and contact details of the Mentor member."
            sections={mentorSections}
            submitLabel="Update Mentor"
            onSubmit={handleSubmit}
            isLoading={loading}
            errors={errors}
            initialData={initialData}
        />
    );
}
