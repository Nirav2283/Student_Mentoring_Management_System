"use client";

import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/app/components/ui/alert-dialog";

const MentorshipManager = () => {
  const [activeTab, setActiveTab] = useState("active");
  const [activeMappings, setActiveMappings] = useState<any[]>([]);
  const [unassignedStudents, setUnassignedStudents] = useState<any[]>([]);
  const [mentors, setMentors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState<{ [key: number]: any }>({});

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/mentorship", { cache: "no-store" });
      const data = await response.json();
      if (data.activemappings) setActiveMappings(data.activemappings);
      if (data.unassignedStudents)
        setUnassignedStudents(data.unassignedStudents);
      if (data.mentors) setMentors(data.mentors);
    } catch (error) {
      console.error("Failed to fetch mentorship data", error);
      toast.error("Failed to load mentorship data. Please refresh the page.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleInputChange = (
    studentId: number,
    field: string,
    value: string,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [studentId]: { ...prev[studentId], [field]: value },
    }));
  };

  const handleAssign = async (studentId: number, collegeId: number) => {
    const data = formData[studentId];

    if (!data?.mentorId || !data?.fromDate) {
      toast.warning("Please select a Mentor and Start Date.");
      return;
    }

    try {
      const response = await fetch("/api/mentorship", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          studentId,
          mentorId: data.mentorId,
          collegeId,
          fromDate: data.fromDate,
          toDate: data.toDate || null,
          description: data.description || "",
        }),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success("Mentor assigned successfully!");
        fetchData();
      } else {
        toast.error(result.message || "Failed to assign mentor.");
      }
    } catch (error) {
      console.error("Error during assignment:", error);
      toast.error("An unexpected error occurred. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="p-10 text-center font-bold text-primary">
        Loading mentorship data...
      </div>
    );
  }

  const handleUnassign = async (studentmentorid: number) => {
    try {
      const response = await fetch("/api/mentorship", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ studentMentorId: studentmentorid }),
      });

      if (response.ok) {
        toast.success("Mentorship ended successfully!");
        fetchData();
      } else {
        toast.error("Failed to end mentorship. Please try again.");
      }
    } catch (err) {
      console.error(err);
      toast.error("An unexpected error occurred.");
    }
  };

  return (
    <div className="bg-background min-h-screen text-foreground font-sans">
      <link
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
        rel="stylesheet"
      />

      <main className="max-w-7xl mx-auto w-full px-6 md:px-10 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-8">
          <div className="flex flex-col gap-1">
            <h1 className="text-4xl font-black tracking-tight text-foreground">
              {activeTab === "active"
                ? "Manage Mentorship Mappings"
                : "Assign Mentors to Students"}
            </h1>
            <p className="text-muted-foreground text-base">
              {activeTab === "active"
                ? "Update or end existing student-mentor pairings."
                : "Select available mentors to pair with students needing guidance."}
            </p>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex p-1 bg-muted rounded-xl w-fit mb-6">
          <button
            onClick={() => setActiveTab("active")}
            className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === "active"
              ? "bg-card text-primary shadow-sm"
              : "text-muted-foreground hover:text-primary"
              }`}
          >
            Active Mappings
          </button>
          <button
            onClick={() => setActiveTab("assign")}
            className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === "assign"
              ? "bg-card text-primary shadow-sm"
              : "text-muted-foreground hover:text-primary"
              }`}
          >
            Assign New
          </button>
        </div>

        {/* Table Container */}
        <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-muted border-b border-border">
                <tr>
                  <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">
                    Student Details
                  </th>
                  <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">
                    {activeTab === "active"
                      ? "Assigned Mentor"
                      : "Mentor & Description"}
                  </th>
                  <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">
                    {activeTab === "active"
                      ? "Status & Date"
                      : "Mentorship Period"}
                  </th>
                  <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider text-right">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {/* ACTIVE TAB */}
                {activeTab === "active" &&
                  activeMappings.map((row, idx) => (
                    <tr
                      key={idx}
                      className="hover:bg-muted transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full flex items-center justify-center font-bold text-sm bg-muted text-primary">
                            {row.student?.StudentName?.charAt(
                              0,
                            ).toUpperCase() || "S"}
                          </div>
                          <div>
                            <p className="font-bold text-sm text-foreground">
                              {row.student?.StudentName}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              ID: {row.student?.EnrollmentNo}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm font-semibold text-foreground">
                          {row.mentor?.MentorName}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {row.Description || "No Description"}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${new Date(row.FromDate) > new Date()
                              ? "bg-muted text-primary"
                              : "bg-green-100 text-green-800"
                            }`}
                        >
                          {new Date(row.FromDate) > new Date()
                            ? "Upcoming"
                            : "Active"}
                        </span>
                        <p className="text-[10px] text-muted-foreground mt-1">
                          {new Date(row.FromDate) > new Date()
                            ? `Starts: ${new Date(row.FromDate).toLocaleDateString()}`
                            : row.ToDate
                              ? `Ends: ${new Date(row.ToDate).toLocaleDateString()}`
                              : "Ongoing"}
                        </p>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <button className="bg-red-50 text-red-600 px-4 py-1.5 rounded-lg text-sm font-bold hover:bg-red-100 transition-colors">
                              End Early
                            </button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>End Mentorship?</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to end this mentorship between{" "}
                                <strong>{row.student?.StudentName}</strong> and{" "}
                                <strong>{row.mentor?.MentorName}</strong>? This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleUnassign(row.StudentMentorID)}
                              >
                                End Mentorship
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </td>
                    </tr>
                  ))}

                {/* ASSIGN TAB */}
                {activeTab === "assign" &&
                  unassignedStudents.map((student) => (
                    <tr
                      key={student.StudentID}
                      className="hover:bg-muted transition-colors"
                    >
                      <td className="px-6 py-4">
                        <p className="font-bold text-sm text-foreground">
                          {student.StudentName}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Dept: {student.Department || "General"}
                        </p>
                      </td>
                      <td className="px-6 py-4 min-w-[200px]">
                        <div className="flex flex-col gap-2">
                          <select
                            className="w-full bg-muted border border-border rounded-lg text-sm py-2 px-3 outline-none focus:ring-1 focus:ring-primary"
                            onChange={(e) =>
                              handleInputChange(
                                student.StudentID,
                                "mentorId",
                                e.target.value,
                              )
                            }
                            value={formData[student.StudentID]?.mentorId || ""}
                          >
                            <option value="">Select Mentor...</option>
                            {mentors.map((m) => (
                              <option key={m.MentorID} value={m.MentorID}>
                                {m.MentorName}
                              </option>
                            ))}
                          </select>
                          <input
                            type="text"
                            placeholder="Mentorship description..."
                            className="w-full bg-muted border border-border rounded-lg text-xs py-2 px-3 outline-none"
                            onChange={(e) =>
                              handleInputChange(
                                student.StudentID,
                                "description",
                                e.target.value,
                              )
                            }
                          />
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col gap-2">
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-bold text-muted-foreground w-8">
                              FROM
                            </span>
                            <input
                              type="date"
                              className="text-xs border rounded p-1 outline-none"
                              onChange={(e) =>
                                handleInputChange(
                                  student.StudentID,
                                  "fromDate",
                                  e.target.value,
                                )
                              }
                            />
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-bold text-muted-foreground w-8">
                              TO
                            </span>
                            <input
                              type="date"
                              className="text-xs border rounded p-1 outline-none"
                              onChange={(e) =>
                                handleInputChange(
                                  student.StudentID,
                                  "toDate",
                                  e.target.value,
                                )
                              }
                            />
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() =>
                            handleAssign(student.StudentID, student.CollegeID)
                          }
                          className="bg-primary text-white px-5 py-2 rounded-lg text-sm font-bold hover:bg-primary/90 shadow-sm transition-all"
                        >
                          Assign
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MentorshipManager;
