"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, CheckCircle2, AlertCircle, Smile, Meh, Frown, BadgeInfo, ClipboardList, User, Calendar, FileText, Upload, ChevronRight, Search, ChevronDown, BarChart4, UserCheck, MessageSquare, CalendarRange, Info, Save, ChevronsUpDown } from 'lucide-react';
import { toast } from 'sonner';

interface Student {
  StudentID: number;
  StudentName: string;
  Department: string;
  StudentMentorID: number;
}

const SessionRecordForm = () => {
  const router = useRouter();
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(false);
  const [fetchingStudents, setFetchingStudents] = useState(true);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const [formData, setFormData] = useState({
    StudentMentorID: '',
    DateOfMentoring: new Date().toISOString().split('T')[0],
    ScheduledMeetingDate: '',
    MentoringMeetingAgenda: '',
    IssuesDiscussed: '',
    AttendanceStatus: 'PRESENT',
    AbsentRemarks: '',
    IsParentPresent: false,
    ParentName: '',
    ParentMobileNo: '',
    ParentsOpinion: '',
    LearnerType: 'AVERAGE',
    Description: '',
    StaffOpinion: '',
    StressLevel: 'MEDIUM',
    NextMentoringDate: '',
  });

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await fetch('/api/mentor/students');
        const data = await res.json();
        if (data.success) {
          setStudents(data.students);
        } else {
          setMessage({ type: 'error', text: data.message || 'Failed to fetch students' });
          toast.error(data.message || 'Failed to fetch students');
        }
      } catch (error) {
        setMessage({ type: 'error', text: 'Error fetching students' });
        toast.error('Error fetching students. Please refresh the page.');
      } finally {
        setFetchingStudents(false);
      }
    };
    fetchStudents();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const setAttendance = (status: string) => {
    setFormData(prev => ({
      ...prev,
      AttendanceStatus: status,
      // Clear absent remarks if becoming present
      AbsentRemarks: status === 'PRESENT' ? '' : prev.AbsentRemarks
    }));
  };

  const setParentPresent = (isPresent: boolean) => {
    setFormData(prev => ({
      ...prev,
      IsParentPresent: isPresent,
      // Clear parent details if parent not present
      ParentName: !isPresent ? '' : prev.ParentName,
      ParentMobileNo: !isPresent ? '' : prev.ParentMobileNo,
      ParentsOpinion: !isPresent ? '' : prev.ParentsOpinion
    }));
  };

  const setStress = (level: string) => {
    setFormData(prev => ({ ...prev, StressLevel: level }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.StudentMentorID) {
      setMessage({ type: 'error', text: 'Please select a student' });
      toast.warning('Please select a student');
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      const res = await fetch('/api/mentor/sessions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        setMessage({ type: 'success', text: 'Session recorded successfully!' });
        toast.success('Session recorded successfully!');
        setTimeout(() => {
          const studentId = students.find(s => s.StudentMentorID === Number(formData.StudentMentorID))?.StudentID;
          if (studentId) {
            router.push(`/mentor/students/${studentId}`);
          }
        }, 2000);
      } else {
        setMessage({ type: 'error', text: data.message || 'Failed to record session' });
        toast.error(data.message || 'Failed to record session');
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Network error. Please try again.' });
      toast.error('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" min-h-screen py-12 px-4 md:px-8 font-['Inter',_sans-serif] text-foreground">

      <div className="max-w-4xl mx-auto flex flex-col gap-6">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          <span className="hover:text-primary cursor-pointer transition-colors" onClick={() => router.push('/mentor/dashboard')}>Dashboard</span>
          <ChevronRight className="w-4 h-4" />
          <span className="text-primary">Detailed Session Record</span>
        </div>

        {/* Page Header */}
        <div className="flex flex-col gap-1 mb-2">
          <h2 className="text-3xl font-black tracking-tight text-foreground">Record Mentoring Session</h2>
          <p className="text-muted-foreground text-sm font-medium">Capture session outcomes and detailed mentor evaluation of student progress.</p>
        </div>

        {message && (
          <div className={`p-4 rounded-xl flex items-center gap-3 ${message.type === 'success' ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-red-50 text-red-700 border border-red-100'}`}>
            {message.type === 'success' ? <CheckCircle2 className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
            <p className="text-sm font-bold">{message.text}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-8 pb-12">

          {/* 1. Student Identification */}
          <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
            <div className="p-6 border-b border-border flex items-center gap-3">
              <User className="w-5 h-5 text-primary" />
              <h3 className="font-bold text-lg">Student Identification</h3>
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-foreground">Select Student</label>
                <div className="relative flex items-center">
                  <Search className="absolute left-3 w-5 h-5 text-primary pointer-events-none" />
                  <select
                    name="StudentMentorID"
                    value={formData.StudentMentorID}
                    onChange={handleChange}
                    required
                    className="w-full bg-muted border-none rounded-lg py-3 pl-11 pr-10 focus:ring-2 focus:ring-primary/20 appearance-none cursor-pointer text-sm font-medium"
                  >
                    <option value="">{fetchingStudents ? 'Loading students...' : 'Select a mentee...'}</option>
                    {students.map(student => (
                      <option key={student.StudentMentorID} value={student.StudentMentorID}>
                        {student.StudentName} ({student.Department})
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 w-5 h-5 text-muted-foreground pointer-events-none" />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-foreground">Scheduled Date</label>
                <div className="relative flex items-center">
                  <CalendarRange className="absolute left-3 w-5 h-5 text-indigo-500 pointer-events-none" />
                  <input
                    name="ScheduledMeetingDate"
                    value={formData.ScheduledMeetingDate}
                    onChange={handleChange}
                    className="w-full bg-muted border-none rounded-lg py-3 pl-11 pr-4 focus:ring-2 focus:ring-indigo-500/20 cursor-pointer text-sm font-medium"
                    type="date"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-foreground">Session Date (Conducted)</label>
                <div className="relative flex items-center">
                  <Calendar className="absolute left-3 w-5 h-5 text-primary pointer-events-none" />
                  <input
                    name="DateOfMentoring"
                    value={formData.DateOfMentoring}
                    onChange={handleChange}
                    required
                    className="w-full bg-muted border-none rounded-lg py-3 pl-11 pr-4 focus:ring-2 focus:ring-primary/20 cursor-pointer text-sm font-medium"
                    type="date"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* 2. Discussion Details */}
          <div className="bg-card rounded-xl border border-border shadow-sm">
            <div className="p-6 border-b border-border flex items-center gap-3">
              <ClipboardList className="w-5 h-5 text-primary" />
              <h3 className="font-bold text-lg">Discussion Details</h3>
            </div>
            <div className="p-6 flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold">Session Agenda</label>
                <input
                  name="MentoringMeetingAgenda"
                  value={formData.MentoringMeetingAgenda}
                  onChange={handleChange}
                  className="w-full bg-muted border-none rounded-lg py-3 px-4 focus:ring-2 focus:ring-primary/20 text-sm font-medium"
                  placeholder="E.g., Academic progress review and internship planning"
                  type="text"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold">Issues Discussed & Key Outcomes</label>
                <textarea
                  name="IssuesDiscussed"
                  value={formData.IssuesDiscussed}
                  onChange={handleChange}
                  className="w-full bg-muted border-none rounded-lg py-3 px-4 focus:ring-2 focus:ring-primary/20 resize-none text-sm font-medium"
                  placeholder="Provide a detailed summary of the conversation..."
                  rows={4}
                ></textarea>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold">Attendance Status</label>
                  <div className="flex bg-muted p-1 rounded-lg w-fit">
                    <button
                      type="button"
                      onClick={() => setAttendance('PRESENT')}
                      className={`px-6 py-2 rounded-md text-xs font-bold transition-all ${formData.AttendanceStatus === 'PRESENT' ? 'bg-card shadow-sm text-primary' : 'text-muted-foreground'}`}
                    >
                      Present
                    </button>
                    <button
                      type="button"
                      onClick={() => setAttendance('ABSENT')}
                      className={`px-6 py-2 rounded-md text-xs font-bold transition-all ${formData.AttendanceStatus === 'ABSENT' ? 'bg-card shadow-sm text-red-600' : 'text-muted-foreground'}`}
                    >
                      Absent
                    </button>
                  </div>
                </div>

                {formData.AttendanceStatus === 'ABSENT' && (
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-red-600">Absent Remarks</label>
                    <textarea
                      name="AbsentRemarks"
                      value={formData.AbsentRemarks}
                      onChange={handleChange}
                      required={formData.AttendanceStatus === 'ABSENT'}
                      className="w-full bg-red-50/50 border border-red-100 rounded-lg py-3 px-4 focus:ring-2 focus:ring-red-200 resize-none text-sm font-medium"
                      placeholder="Reason for absence..."
                      rows={2}
                    ></textarea>
                  </div>
                )}

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold">Learner Type</label>
                  <div className="relative flex items-center">
                    <select
                      name="LearnerType"
                      value={formData.LearnerType}
                      onChange={handleChange}
                      className="w-full bg-muted border-none rounded-lg py-3 px-4 focus:ring-2 focus:ring-primary/20 cursor-pointer text-sm font-medium appearance-none"
                    >
                      <option value="AVERAGE">Average</option>
                      <option value="SLOW">Slow</option>
                      <option value="FAST">Fast</option>
                      <option value="ADVANCED">Advanced</option>
                    </select>
                    <ChevronsUpDown className="absolute right-3 w-4 h-4 text-muted-foreground pointer-events-none" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 3. Parent Details */}
          <div className="bg-card rounded-xl border border-border shadow-sm">
            <div className="p-6 border-b border-border flex items-center justify-between">
              <div className="flex items-center gap-3">
                <UserCheck className="w-5 h-5 text-indigo-600" />
                <h3 className="font-bold text-lg">Parent Details</h3>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-muted-foreground">Parent Present?</span>
                <button
                  type="button"
                  onClick={() => setParentPresent(!formData.IsParentPresent)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${formData.IsParentPresent ? 'bg-indigo-600' : 'bg-muted'}`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-card transition-transform ${formData.IsParentPresent ? 'translate-x-6' : 'translate-x-1'}`}
                  />
                </button>
              </div>
            </div>

            {formData.IsParentPresent && (
              <div className="p-6 flex flex-col gap-6 animate-in fade-in slide-in-from-top-2 duration-300">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold">Parent Name</label>
                    <input
                      name="ParentName"
                      value={formData.ParentName}
                      onChange={handleChange}
                      className="w-full bg-muted border-none rounded-lg py-3 px-4 focus:ring-2 focus:ring-indigo-500/20 text-sm font-medium"
                      placeholder="Enter parent's name..."
                      type="text"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold">Parent Mobile Number</label>
                    <input
                      name="ParentMobileNo"
                      value={formData.ParentMobileNo}
                      onChange={handleChange}
                      className="w-full bg-muted border-none rounded-lg py-3 px-4 focus:ring-2 focus:ring-indigo-500/20 text-sm font-medium"
                      placeholder="Enter mobile number..."
                      type="tel"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold">Parent's Opinion / Feedback</label>
                  <textarea
                    name="ParentsOpinion"
                    value={formData.ParentsOpinion}
                    onChange={handleChange}
                    className="w-full bg-muted border-none rounded-lg py-3 px-4 focus:ring-2 focus:ring-indigo-500/20 resize-none text-sm font-medium"
                    placeholder="Capture parent's perspective or concerns..."
                    rows={3}
                  ></textarea>
                </div>
              </div>
            )}
            {!formData.IsParentPresent && (
              <div className="p-8 text-center bg-muted/50">
                <p className="text-sm text-muted-foreground font-medium italic">Parental presence not recorded for this session.</p>
              </div>
            )}
          </div>

          {/* 4. Evaluation & Internal Feedback */}
          <div className="bg-card rounded-xl border border-border shadow-sm">
            <div className="p-6 border-b border-border flex items-center gap-3">
              <BarChart4 className="w-5 h-5 text-primary" />
              <h3 className="font-bold text-lg">Evaluation & Feedback</h3>
            </div>
            <div className="p-6 flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold">Mentor Feedback on Progress (Description)</label>
                <textarea
                  name="Description"
                  value={formData.Description}
                  onChange={handleChange}
                  className="w-full bg-muted border-none rounded-lg py-3 px-4 focus:ring-2 focus:ring-primary/20 resize-none text-sm font-medium"
                  placeholder="Assess achievements since last session..."
                  rows={3}
                ></textarea>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-primary flex items-center gap-2">
                  <UserCheck className="w-5 h-5" />
                  Staff Opinion (Internal Remarks)
                </label>
                <div className="relative">
                  <textarea
                    name="StaffOpinion"
                    value={formData.StaffOpinion}
                    onChange={handleChange}
                    className="w-full bg-primary/5 border-2 border-primary/10 rounded-xl py-3 px-4 focus:ring-2 focus:ring-primary/20 focus:border-primary/30 outline-none transition-all resize-none text-sm font-medium"
                    placeholder="Restricted verdict for department review..."
                    rows={4}
                  ></textarea>
                  <div className="absolute top-2 right-3 opacity-10 pointer-events-none">
                    <MessageSquare className="w-12 h-12" />
                  </div>
                </div>
                <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest mt-1 italic">Internal staff field - confidential.</p>
              </div>
            </div>
          </div>

          {/* 5. Assessment & Attachments */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-card rounded-xl border border-border shadow-sm p-6">
              <div className="flex items-center gap-2 mb-6">
                <Smile className="w-5 h-5 text-primary" />
                <h3 className="font-bold text-lg">Stress Level</h3>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-foreground">Patient Stress Evaluation</label>
                <div className="relative flex items-center">
                  <select
                    name="StressLevel"
                    value={formData.StressLevel}
                    onChange={handleChange}
                    className="w-full bg-muted border-none rounded-lg py-3 px-4 focus:ring-2 focus:ring-primary/20 appearance-none cursor-pointer text-sm font-medium"
                  >
                    <option value="LOW">Low (Stable / Minimal Stress)</option>
                    <option value="MEDIUM">Medium (Moderate / Manageable)</option>
                    <option value="HIGH">High (Slightly Overwhelmed / High Stress)</option>
                  </select>
                  <ChevronDown className="absolute right-3 w-5 h-5 text-muted-foreground pointer-events-none" />
                </div>
                <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest mt-1">
                  Select the student&apos;s observed stress state.
                </p>
              </div>
            </div>

            {/* <div className="bg-card rounded-xl border border-border shadow-sm p-6">
              <div className="flex items-center gap-2 mb-6">
                <Upload className="w-5 h-5 text-primary" />
                <h3 className="font-bold text-lg">Documents</h3>
              </div>
              <div className="border-2 border-dashed border-[#e0e0e0] rounded-xl p-8 flex flex-col items-center justify-center gap-3 text-center bg-muted/50 hover:bg-primary/5 hover:border-primary transition-all cursor-not-allowed opacity-60">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                 
                </div>
                <p className="text-sm font-bold">Upload supporting files</p>
                <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-tight">Feature coming soon</p>
              </div>
            </div> */}
          </div>

          {/* 6. Follow Up & Scheduling */}
          <div className="bg-card rounded-xl border border-border shadow-sm p-6 flex flex-col md:flex-row gap-8 items-center">
            <div className="flex flex-col gap-2 w-full md:w-1/2">
              <label className="text-sm font-bold">Schedule Next Session</label>
              <div className="relative flex items-center">
                <CalendarRange className="absolute left-3 w-5 h-5 text-primary pointer-events-none" />
                <input
                  name="NextMentoringDate"
                  value={formData.NextMentoringDate}
                  onChange={handleChange}
                  className="w-full bg-muted border-none rounded-lg py-3 pl-11 focus:ring-2 focus:ring-primary/20 cursor-pointer text-sm font-medium"
                  type="date"
                />
              </div>
            </div>
            {/* <div className="p-4 bg-primary/5 rounded-xl flex gap-4 w-full md:w-1/2">
              <Info className="w-6 h-6 text-primary" />
              <div>
                <p className="text-xs font-bold text-primary">Auto-Update Trigger</p>
                <p className="text-[11px] leading-relaxed text-muted-foreground font-medium">Saving this record notifies the department head and syncs with the student's personal portal.</p>
              </div>
            </div> */}
          </div>

          {/* Submit Actions */}
          <div className="flex items-center justify-end gap-4 mt-6">
            <button
              className="px-6 py-3 rounded-lg text-sm font-bold text-muted-foreground hover:bg-card transition-colors"
              type="button"
              onClick={() => router.back()}
            >
              Discard Draft
            </button>
            <button
              disabled={loading}
              className="bg-primary hover:bg-primary/90 text-white px-10 py-3.5 rounded-lg text-sm font-bold shadow-xl shadow-primary/20 flex items-center gap-2 transition-transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
              type="submit"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  Save Detailed Record
                </>
              )}
            </button>
          </div>
        </form>
      </div >
    </div >
  );
};

export default SessionRecordForm;
