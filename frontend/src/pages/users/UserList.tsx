import { useEffect, useState } from 'react';
import axios from '@/services/axios';
import { useNavigate } from 'react-router-dom';

interface User {
  id: number;
  name: string;
  email: string;
}

const UserList = () => {
  const [users, setUsers] = useState<User[]>([]);
  const navigate = useNavigate();

  const fetchUsers = async () => {
    const res = await axios.get('/api/users');
    setUsers(res.data);
  };

  const deleteUser = async (id: number) => {
    if (!confirm('Yakin hapus user ini?')) return;
    await axios.delete(`/api/users/${id}`);
    fetchUsers();
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Daftar User</h1>
      <button onClick={() => navigate('/users/create')} className="mb-4 bg-blue-500 text-white px-4 py-2 rounded">
        Tambah User
      </button>
      <ul>
        {users.map(user => (
          <li key={user.id} className="flex justify-between border-b py-2">
            <span>{user.name} ({user.email})</span>
            <div className="space-x-2">
              <button onClick={() => navigate(`/users/${user.id}/edit`)} className="text-blue-500">Edit</button>
              <button onClick={() => deleteUser(user.id)} className="text-red-500">Hapus</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
