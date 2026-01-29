"use client";

export default function DeleteButton() {
  return (
    <button
      type="submit"
      className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
      title="Delete"
      onClick={(e) => {
        if (!confirm("Are you sure you want to delete this student?")) {
          e.preventDefault();
        }
      }}
    >
      <span className="material-symbols-outlined text-[20px]">delete</span>
    </button>
  );
}
