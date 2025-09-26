import React, { createContext, ReactNode, useContext, useState } from "react";

export type Client = { id: number; name: string; email: string };
export type User = { id: number; name: string; email: string };
export type Project = { id: number; name: string; clientId: number };
export type Task = {
  paket: ReactNode;
  description: string | TrustedHTML;
  id: number;
  title: string;
  due_date: string;
  status: "todo" | "inprogress" | "done";
  projectId: number;
  assignedUserId: number;
};
export type Assignment = { userId: number; projectId: number };
export type TimeLog = { id: number; taskId: number; userId: number; minutes: number; date: string };

type AppData = {
  clients: Client[];
  setClients: React.Dispatch<React.SetStateAction<Client[]>>;
  users: User[];
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
  projects: Project[];
  setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  assignments: Assignment[];
  setAssignments: React.Dispatch<React.SetStateAction<Assignment[]>>;
  timeLogs: TimeLog[];
  setTimeLogs: React.Dispatch<React.SetStateAction<TimeLog[]>>;
};

const AppDataContext = createContext<AppData | undefined>(undefined);

export const AppDataProvider = ({ children }: { children: React.ReactNode }) => {
  const [clients, setClients] = useState<Client[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [timeLogs, setTimeLogs] = useState<TimeLog[]>([]);

  return (
    <AppDataContext.Provider
      value={{
        clients, setClients,
        users, setUsers,
        projects, setProjects,
        tasks, setTasks,
        assignments, setAssignments,
        timeLogs, setTimeLogs,
      }}
    >
      {children}
    </AppDataContext.Provider>
  );
};

export const useAppData = () => {
  const ctx = useContext(AppDataContext);
  if (!ctx) throw new Error("useAppData must be used within AppDataProvider");
  return ctx;
};
