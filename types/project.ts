export interface Project {
  name: string;
  startDate: string;
  endDate: string;
}

export interface TaskItem {
  id: string;
  name: string;
  start: Date;
  end: Date;
  progress: number;
  type: "task";
}
