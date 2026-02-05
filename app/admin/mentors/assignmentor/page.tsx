"use client";

import React, { useState, useEffect } from "react";

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
      const response = await fetch("/api/mentorship");
      const data = await response.json();
      if (data.activemappings) setActiveMappings(data.activemappings);
      if (data.unassignedStudents) setUnassignedStudents(data.unassignedStudents);
      if (data.mentors) setMentors(data.mentors);
    } catch (error) {
      console.error("Failed to fetch mentorship data", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleInputChange = (studentId: number, field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [studentId]: { ...prev[studentId], [field]: value },
    }));
  };

  const handleAssign = async (studentId: number, collegeId: number) => {
    const data = formData[studentId];

    if (!data?.mentorId || !data?.fromDate || !data?.toDate) {
      alert("Please select a Mentor, Start Date, and End Date.");
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
          toDate: data.toDate,
          description: data.description || "",
        }),
      });

      if (response.ok) {
        alert("Mentor assigned successfully!");
        fetchData();
      } else {
        alert("Failed to assign mentor.");
      }
    } catch (error) {
      console.error("Error during assignment:", error);
    }
  };

  console.log(activeMappings)

  if (loading) {
    return <div className="p-10 text-center font-bold text-[#135bec]">Loading mentorship data...</div>;
  }

  return (
    <div className="bg-[#f6f6f8] min-h-screen text-[#111318] font-sans">
      <link
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
        rel="stylesheet"
      />

      <main className="max-w-7xl mx-auto w-full px-6 md:px-10 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-8">
          <div className="flex flex-col gap-1">
            <h1 className="text-4xl font-black tracking-tight text-[#111318]">
              {activeTab === "active" ? "Manage Mentorship Mappings" : "Assign Mentors to Students"}
            </h1>
            <p className="text-gray-500 text-base">
              {activeTab === "active"
                ? "Update or end existing student-mentor pairings."
                : "Select available mentors to pair with students needing guidance."}
            </p>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex p-1 bg-gray-200/50 rounded-xl w-fit mb-6">
          <button
            onClick={() => setActiveTab("active")}
            className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${
              activeTab === "active" ? "bg-white text-[#135bec] shadow-sm" : "text-gray-500 hover:text-[#135bec]"
            }`}
          >
            Active Mappings
          </button>
          <button
            onClick={() => setActiveTab("assign")}
            className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${
              activeTab === "assign" ? "bg-white text-[#135bec] shadow-sm" : "text-gray-500 hover:text-[#135bec]"
            }`}
          >
            Assign New
          </button>
        </div>

        {/* Table Container */}
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Student Details</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
                    {activeTab === "active" ? "Assigned Mentor" : "Mentor & Description"}
                  </th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
                    {activeTab === "active" ? "Status & Date" : "Mentorship Period"}
                  </th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {/* ACTIVE TAB */}
                {activeTab === "active" &&
                  activeMappings.map((row, idx) => (
                    <tr key={idx} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full flex items-center justify-center font-bold text-sm bg-blue-50 text-[#135bec]">
                            {row.student?.StudentName?.charAt(0).toUpperCase() || "S"}
                          </div>
                          <div>
                            <p className="font-bold text-sm text-gray-900">{row.student?.StudentName}</p>
                            <p className="text-xs text-gray-500">ID: {row.student?.EnrollmentNo}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm font-semibold text-gray-800">{row.mentor?.MentorName}</p>
                        <p className="text-xs text-gray-500">{row.Description || "No Description"}</p>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Active
                        </span>
                        <p className="text-[10px] text-gray-400 mt-1">
                          Ends: {new Date(row.ToDate).toLocaleDateString()}
                        </p>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="bg-red-50 text-red-600 px-4 py-1.5 rounded-lg text-sm font-bold hover:bg-red-100 transition-colors">
                          End Early
                        </button>
                      </td>
                    </tr>
                  ))}

                {/* ASSIGN TAB */}
                {activeTab === "assign" &&
                  unassignedStudents.map((student) => (
                    <tr key={student.StudentID} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <p className="font-bold text-sm text-gray-900">{student.StudentName}</p>
                        <p className="text-xs text-gray-500">Dept: {student.Department || "General"}</p>
                      </td>
                      <td className="px-6 py-4 min-w-[200px]">
                        <div className="flex flex-col gap-2">
                          <select
                            className="w-full bg-gray-50 border border-gray-200 rounded-lg text-sm py-2 px-3 outline-none focus:ring-1 focus:ring-[#135bec]"
                            onChange={(e) => handleInputChange(student.StudentID, "mentorId", e.target.value)}
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
                            className="w-full bg-gray-50 border border-gray-200 rounded-lg text-xs py-2 px-3 outline-none"
                            onChange={(e) => handleInputChange(student.StudentID, "description", e.target.value)}
                          />
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col gap-2">
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-bold text-gray-400 w-8">FROM</span>
                            <input
                              type="date"
                              className="text-xs border rounded p-1 outline-none"
                              onChange={(e) => handleInputChange(student.StudentID, "fromDate", e.target.value)}
                            />
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-bold text-gray-400 w-8">TO</span>
                            <input
                              type="date"
                              className="text-xs border rounded p-1 outline-none"
                              onChange={(e) => handleInputChange(student.StudentID, "toDate", e.target.value)}
                            />
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => handleAssign(student.StudentID, student.CollegeID)}
                          className="bg-[#135bec] text-white px-5 py-2 rounded-lg text-sm font-bold hover:bg-blue-700 shadow-sm transition-all"
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