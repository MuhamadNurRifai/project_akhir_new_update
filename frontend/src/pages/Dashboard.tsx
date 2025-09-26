import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import axios from "@/services/axios";
import { useAuth } from "@/contexts/useAuth";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

import TopQuickActions from "@/components/dashboard/TopQuickActions";
import ProjectOverview, { Project } from "@/components/dashboard/ProjectOverview";
import ProgressProject, { ProjectProgress } from "@/components/dashboard/ProgressProject";
import CompanyFactsChart from "@/components/dashboard/CompanyFactsCharts";
import StatisticsChart from "@/components/dashboard/StatisticsCharts";
import ProjectCount from "@/components/dashboard/ProjectCount";
 // ✅ tambahin

ChartJS.register(ArcElement, Tooltip, Legend);

interface Stats {
  clients: number;
  projects: number;
  tasks: number;
}

const Dashboard = () => {
  const [stats, setStats] = useState<Stats>({ clients: 0, projects: 0, tasks: 0 });
  const [projects, setProjects] = useState<Project[]>([]);
  const [projectProgress, setProjectProgress] = useState<ProjectProgress[]>([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const { logout } = useAuth();

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const [clientsRes, projectsRes, tasksRes] = await Promise.all([
          axios.get("/clients"),
          axios.get("/projects"),
          axios.get("/tasks"),
        ]);
        if (!active) return;

        const p: Project[] = Array.isArray(projectsRes.data)
          ? projectsRes.data
          : projectsRes.data?.data || [];

        setProjects(p);

        setStats({
          clients: Array.isArray(clientsRes.data) ? clientsRes.data.length : (clientsRes.data?.data?.length ?? 0),
          projects: p.length,
          tasks: Array.isArray(tasksRes.data) ? tasksRes.data.length : (tasksRes.data?.data?.length ?? 0),
        });

        setProjectProgress(
          p.slice(0, 3).map((proj, idx) => ({
            id: proj.id,
            name: proj.name ?? `Project ${idx + 1}`,
            progress: Math.floor(Math.random() * 100),
          }))
        );
      } catch (error) {
        console.error("Error fetching dashboard stats:", error);
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  const projectStats = useMemo(() => {
    let completed = 0,
      active = 0,
      ended = 0;

    projects.forEach((p) => {
      const status = (p.status || "").toLowerCase();
      if (["completed", "done", "finished"].includes(status)) {
        completed++;
      } else if (["active", "in_progress", "ongoing"].includes(status)) {
        active++;
      } else if (["ended", "cancelled", "closed"].includes(status)) {
        ended++;
      }
    });

    return { completed, active, ended };
  }, [projects]);

  const chartData = useMemo(
    () => ({
      labels: ["Clients", "Projects", "Tasks"],
      datasets: [
        {
          data: [stats.clients, stats.projects, stats.tasks],
          backgroundColor: ["#3b82f6", "#10b981", "#f59e0b"],
          borderWidth: 2,
          borderColor: "#ffffff",
        },
      ],
    }),
    [stats]
  );

  const companyFacts = {
    month: "Jan Feb Mar Apr",
    values: [
      { label: "Company Profil", data: [120, 180, 260, 320], color: "#10b981" },
      { label: "Logo", data: [80, 160, 140, 200], color: "#3b82f6" },
      { label: "San Francisco", data: [60, 140, 220, 300], color: "#f59e0b" },
    ],
  };

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div className="space-y-8 ml-64 p-6">
      {/* Header */}
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-2xl font-bold text-blue-400 tracking-tight">Dashboard Overview</h2>
          <p className="mt-1 text-sm text-gray-400">Ringkasan cepat data sistem kamu.</p>
        </div>
        <button
          onClick={handleLogout}
          className="inline-flex items-center gap-2 rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
        >
          Logout
        </button>
      </div>

   

      {/* Quick Actions */}
      <TopQuickActions />

      {/* Grid Utama */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="space-y-6">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-24 bg-white rounded-xl animate-pulse p-4" />
              ))}
            </div>
          ) : (
            <ProjectCount projects={projects} />
          )}

          {loading ? (
            <div className="bg-white rounded-xl h-40 animate-pulse" />
          ) : (
            <ProgressProject projects={projectProgress} />
          )}

          {loading ? (
            <div className="bg-white rounded-xl h-56 animate-pulse" />
          ) : (
            <CompanyFactsChart data={companyFacts} />
          )}
        </div>

        <div className="space-y-6">
          {loading ? (
            <div className="bg-white rounded-xl h-24 animate-pulse" />
          ) : (
            <ProjectCount projects={projects} />
          )}

          {loading ? (
            <div className="bg-white rounded-xl h-56 animate-pulse" />
          ) : (
            <StatisticsChart stats={projectStats} />
          )}
        </div>

        <div className="bg-white shadow-sm rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-4">Project Overview (All Data)</h3>
          {loading ? (
            <div className="h-64 flex items-center justify-center text-gray-400 text-sm">Memuat chart...</div>
          ) : (
            <div className="max-w-xs mx-auto">
              <Doughnut data={chartData} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
