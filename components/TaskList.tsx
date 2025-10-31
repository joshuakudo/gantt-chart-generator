"use client";
import { useState } from "react";
import { TaskItem, Project } from "@/types/project";

interface TaskListProps {
  project: Project;
  tasks: TaskItem[];
  setTasks: React.Dispatch<React.SetStateAction<TaskItem[]>>;
  onEditTask: (task: TaskItem) => void;
}

export default function TaskList({
  project,
  tasks,
  setTasks,
  onEditTask,
}: TaskListProps) {
  const [newTask, setNewTask] = useState({
    name: "",
    days: 1,
    progress: 0,
  });

  // ✅ Add new task (skip weekends, start after last task)
  const addTask = () => {
    if (!newTask.name.trim()) return alert("Please enter a task name");

    const lastTask = tasks.length > 0 ? tasks[tasks.length - 1] : null;

    // Determine the start date
    let startDate = lastTask ? new Date(lastTask.end) : new Date(project.startDate);

    // Move to next working day if weekend
    startDate = getNextWorkingDay(startDate);

    // Calculate end date skipping weekends
    const endDate = addWorkingDays(startDate, newTask.days);

    const taskToAdd: TaskItem = {
      id: `${Date.now()}`,
      name: newTask.name,
      start: startDate,
      end: endDate,
      progress: newTask.progress,
      type: "task",
    };

    setTasks((prev) => [...prev, taskToAdd]);
    setNewTask({ name: "", days: 1, progress: 0 }); // reset form
  };

  // ✅ Move date to next working day if Sat/Sun
  const getNextWorkingDay = (date: Date) => {
    const result = new Date(date);
    const day = result.getDay();
    if (day === 6) result.setDate(result.getDate() + 2); // Saturday → Monday
    if (day === 0) result.setDate(result.getDate() + 1); // Sunday → Monday
    return result;
  };

  // ✅ Add N working days skipping weekends
  const addWorkingDays = (start: Date, days: number) => {
    const result = new Date(start);
    let added = 0;

    while (added < days) {
      result.setDate(result.getDate() + 1);
      const day = result.getDay();
      if (day !== 0 && day !== 6) {
        added++;
      }
    }

    return result;
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow mb-6">
      <h2 className="text-lg font-semibold mb-3">Tasks</h2>

      {/* ✅ Add Task Form */}
      <div className="flex flex-wrap gap-4 mb-4">
        <input
          type="text"
          placeholder="Task name"
          value={newTask.name}
          onChange={(e) => setNewTask({ ...newTask, name: e.target.value })}
          className="border rounded p-2 flex-1"
        />
        <input
          type="number"
          placeholder="Days"
          min={1}
          value={newTask.days}
          onChange={(e) => setNewTask({ ...newTask, days: Number(e.target.value) })}
          className="border rounded p-2 w-24"
        />
        <input
          type="number"
          placeholder="%"
          min={0}
          max={100}
          value={newTask.progress}
          onChange={(e) =>
            setNewTask({ ...newTask, progress: Number(e.target.value) })
          }
          className="border rounded p-2 w-24"
        />
        <button
          onClick={addTask}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Add Task
        </button>
      </div>

      {/* ✅ Task List */}
      {tasks.length === 0 && <p className="text-gray-500">No tasks yet.</p>}

      <ul className="space-y-2">
        {tasks.map((task) => (
          <li
            key={task.id}
            className="flex justify-between items-center border p-2 rounded"
          >
            <div>
              <p className="font-medium">{task.name}</p>
              <p className="text-sm text-gray-500">
                {task.start.toLocaleDateString()} → {task.end.toLocaleDateString()}
              </p>
              <p className="text-sm text-gray-500">Progress: {task.progress}%</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => onEditTask(task)}
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-2 py-1 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => deleteTask(task.id)}
                className="bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
