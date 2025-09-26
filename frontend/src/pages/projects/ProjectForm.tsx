import { useState } from "react";
import axios from "@/services/axios";
import { useNavigate } from "react-router-dom";

const ProjectForm = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await axios.post("/api/projects", { name, description });
    navigate("/projects");
  };

  return (
    <div className="p-6 max-w-lg mx-autow-full border border-gray-400 rounded-md text-black">
      <h2 className="text-xl font-bold mb-4">Create Project</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Project Name"
          className="w-full border p-2 rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <textarea
          placeholder="Project Description"
          className="w-full border p-2 rounded"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button
          type="submit"
          className="w-full bg-red-500 text-white p-2 rounded hover:bg-green-600"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default ProjectForm;
