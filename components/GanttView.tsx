import { Gantt, Task, ViewMode } from "gantt-task-react";
import "gantt-task-react/dist/index.css";
import { Project, TaskItem } from "@/types/project";

interface GanttViewProps {
  project: Project;
  tasks: TaskItem[];
  onDateChange: (task: Task) => void;
  onProgressChange: (task: Task) => void;
  onDoubleClick: (task: Task) => void;
}

export default function GanttView({
  project,
  tasks,
  onDateChange,
  onProgressChange,
  onDoubleClick,
}: GanttViewProps) {
  const convertedTasks: Task[] = tasks.map(task => ({
    ...task,
    start: new Date(task.start),
    end: new Date(task.end),
  }));

    const projectTask: Task = {
    id: "project",
    name: project.name,
    start: new Date(project.startDate),
    end: new Date(project.endDate),
    progress: 0,
    type: "project",
    hideChildren: false,
  };

    const ganttTasks: Task[] = [
    projectTask,
    ...tasks.map((t) => ({
      ...t,
      project: "project", // link to the parent project
    })),
  ];

  return (
    <Gantt
      tasks={ganttTasks}
      viewMode={ViewMode.Day}
      onDateChange={onDateChange}
      onProgressChange={onProgressChange}
      onDoubleClick={onDoubleClick}
    />
  );
}
