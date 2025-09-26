import { useState } from "react";
import { useAppData } from "@/contexts/AppDataContext";

const AssignUser = () => {
  const { users, projects, setAssignments, assignments } = useAppData();
  const [selectedProject, setSelectedProject] = useState("");
  const [selectedUser, setSelectedUser] = useState("");

  const handleAssign = () => {
    if (selectedProject && selectedUser) {
      // Cek apakah sudah ada assignment yang sama
      const exists = assignments.some(
        (a) =>
          a.projectId === Number(selectedProject) &&
          a.userId === Number(selectedUser)
      );
      if (!exists) {
        setAssignments([
          ...assignments,
          {
            projectId: Number(selectedProject),
            userId: Number(selectedUser),
          },
        ]);
        alert(
          `User ${
            users.find((u) => u.id === Number(selectedUser))?.name
          } assigned to project ${
            projects.find((p) => p.id === Number(selectedProject))?.name
          }!`
        );
      } else {
        alert("Assignment already exists!");
      }
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4">Assign User to Project</h2>
      <select
        className="border p-2 w-full mb-3"
        value={selectedProject}
        onChange={(e) => setSelectedProject(e.target.value)}
      >
        <option value="">Select Project</option>
        {projects.map((p) => (
          <option key={p.id} value={p.id}>
            {p.name}
          </option>
        ))}
      </select>

      <select
        className="border p-2 w-full mb-3"
        value={selectedUser}
        onChange={(e) => setSelectedUser(e.target.value)}
      >
        <option value="">Select User</option>
        {users.map((u) => (
          <option key={u.id} value={u.id}>
            {u.name}
          </option>
        ))}
      </select>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={handleAssign}
      >
        Assign
      </button>
      <div className="mt-6">
        <h3 className="font-semibold mb-2">Current Assignments:</h3>
        <ul className="list-disc pl-5">
          {assignments.map((a, i) => (
            <li key={i}>
              {users.find((u) => u.id === a.userId)?.name} →{" "}
              {projects.find((p) => p.id === a.projectId)?.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AssignUser;