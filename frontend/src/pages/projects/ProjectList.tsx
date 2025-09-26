import { useState } from 'react';

const ProjectList = () => {
  const [projects] = useState([
    { id: 1, name: 'Website Redesign', description: 'Redesign company website.' },
    { id: 2, name: 'Mobile App', description: 'Develop mobile app for client.' },
    { id: 3, name: 'ERP System', description: 'Implement ERP for manufacturing.' },
  ]);

  return (
    <div className="ml-64 p-6">
      <h2 className="text-xl font-bold mb-4">Projects</h2>
      <ul className="space-y-2">
        {projects.map(project => (
          <li key={project.id} className="border p-2">
            <strong>{project.name}</strong>
            <p>{project.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectList;
