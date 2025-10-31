"use client";
import { useState } from "react";
import { TaskItem } from "@/types/project";

interface TaskEditModalProps {
  task: TaskItem | null;
  onClose: () => void;
  onSave: (updatedTask: TaskItem) => void;
}

export default function TaskEditModal({ task, onClose, onSave }: TaskEditModalProps) {
  const [formData, setFormData] = useState<TaskItem | null>(task);

  if (!formData) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => prev ? { ...prev, [name]: value } : prev);
  };

  const handleSave = () => {
    if (formData) {
      onSave({
        ...formData,
        start: new Date(formData.start),
        end: new Date(formData.end),
        progress: Number(formData.progress),
      });
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
        <h2 className="text-xl font-bold mb-4">Edit Task</h2>

        <label className="block mb-2">
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="border rounded w-full px-2 py-1 mt-1"
          />
        </label>

        <label className="block mb-2">
          Start:
          <input
            type="date"
            name="start"
            value={new Date(formData.start).toISOString().split("T")[0]}
            onChange={handleChange}
            className="border rounded w-full px-2 py-1 mt-1"
          />
        </label>

        <label className="block mb-2">
          End:
          <input
            type="date"
            name="end"
            value={new Date(formData.end).toISOString().split("T")[0]}
            onChange={handleChange}
            className="border rounded w-full px-2 py-1 mt-1"
          />
        </label>

        <label className="block mb-4">
          Progress (%):
          <input
            type="number"
            name="progress"
            value={formData.progress}
            min="0"
            max="100"
            onChange={handleChange}
            className="border rounded w-full px-2 py-1 mt-1"
          />
        </label>

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
