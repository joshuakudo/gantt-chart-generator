"use client";
import { useRef, useState } from "react";
import ProjectForm from "@/components/ProjectForm";
import TaskList from "@/components/TaskList";
import GanttView from "@/components/GanttView";
import TaskEditModal from "@/components/TaskEditModal";
import { Project, TaskItem } from "@/types/project";
import html2canvas from "html2canvas";
import { Task } from "gantt-task-react";

export default function Home() {
  const [project, setProject] = useState<Project | null>(null);
  const [tasks, setTasks] = useState<TaskItem[]>([]);
  const [selectedTask, setSelectedTask] = useState<TaskItem | null>(null);
  const ganttRef = useRef<HTMLDivElement>(null);

  const handleTaskChange = (updatedTask: Task) => {
    const convertedTask: TaskItem = {
      id: updatedTask.id,
      name: updatedTask.name,
      start: updatedTask.start,
      end: updatedTask.end,
      progress: updatedTask.progress,
      type: "task",
    };
    setTasks(prev =>
      prev.map(task => (task.id === updatedTask.id ? convertedTask : task))
    );
  };

  const handleDownloadImage = async () => {
    if (!ganttRef.current) return;
    const canvas = await html2canvas(ganttRef.current, { scale: 2 });
    const link = document.createElement("a");
    link.download = "gantt_chart.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  const handleTaskSave = (updatedTask: TaskItem) => {
    setTasks(prev =>
      prev.map(task => (task.id === updatedTask.id ? updatedTask : task))
    );
    setSelectedTask(null);
  };

  return (
    <main className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Gantt Chart Generator
      </h1>

      <ProjectForm setProject={setProject} />

      {project && (
        <TaskList
          project={project}
          tasks={tasks}
          setTasks={setTasks}
          onEditTask={setSelectedTask}
        />
      )}

      <div className="flex justify-end mb-4">
        <button
          onClick={handleDownloadImage}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
        >
          Export as image
        </button>
      </div>

      {tasks.length > 0 && project && (
        <div ref={ganttRef} className="bg-white rounded-lg shadow p-4">
          <GanttView
            project={project}
            tasks={tasks}
            onDateChange={handleTaskChange}
            onProgressChange={handleTaskChange}
            onDoubleClick={task => {
              const found = tasks.find(t => t.id === task.id);
              if (found) setSelectedTask(found);
            }}
          />
        </div>
      )}

      {selectedTask && (
        <TaskEditModal
          task={selectedTask}
          onClose={() => setSelectedTask(null)}
          onSave={handleTaskSave}
        />
      )}
    </main>
  );
}
