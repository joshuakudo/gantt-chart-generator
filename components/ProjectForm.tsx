"use client";

import { useState } from "react";
import { Project } from "@/types/project";

interface Props {
  setProject: (project: Project) => void;
}

export default function ProjectForm({ setProject }: Props) {
  const [form, setForm] = useState<Project>({
    name: "",
    startDate: "",
    endDate: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setProject(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mb-6">
      <input
        type="text"
        name="name"
        placeholder="Project Name"
        value={form.name}
        onChange={handleChange}
        required
        className="border rounded p-2 w-full"
      />
      <div className="flex gap-4">
        <input
          type="date"
          name="startDate"
          value={form.startDate}
          onChange={handleChange}
          required
          className="border rounded p-2 flex-1"
        />
        <input
          type="date"
          name="endDate"
          value={form.endDate}
          onChange={handleChange}
          required
          className="border rounded p-2 flex-1"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700"
      >
        Set Project
      </button>
    </form>
  );
}
