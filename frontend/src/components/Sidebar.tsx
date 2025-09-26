import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className=" fixed top-0 left-0 w-64 bg-gray-800 text-white h-screen p-4 ">
      <h2 className="text-2xl font-bold mb-6">Project Manager</h2>
      <nav className="space-y-3">
        <Link to="/dashboard" className="block hover:bg-blue-700 p-2 rounded"><p className="text-yellow-300">Dashboard</p></Link>
        <Link to="/clients" className="block hover:bg-blue-700 p-2 rounded"><p className="text-yellow-300">Client</p></Link>
        <Link to="/projects" className="block hover:bg-blue-700 p-2 rounded"><p className="text-yellow-300">Projects</p></Link>
        <Link to="/tasks" className="block hover:bg-blue-700 p-2 rounded"><p className="text-yellow-300">Task</p></Link>
        <Link to="/timeline" className="block hover:bg-blue-700 p-2 rounded"><p className="text-yellow-300">Timeline</p></Link>
        <Link to="/assign" className="block hover:bg-blue-700 p-2 rounded"><p className="text-yellow-300">Assig Users</p></Link>
      </nav>
    </aside>
  );
};

export default Sidebar;
