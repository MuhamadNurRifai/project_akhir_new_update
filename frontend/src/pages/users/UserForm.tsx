import { useState, useEffect } from 'react';
import axios from '@/services/axios';
import { useParams, useNavigate } from 'react-router-dom';

const UserForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (id) {
      axios.get(`/api/users/${id}`).then(res => {
        setName(res.data.name);
        setEmail(res.data.email);
      });
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = { name, email, ...(password && { password }) };
    if (id) {
      await axios.put(`/api/users/${id}`, data);
    } else {
      await axios.post('/api/users', { ...data, password });
    }
    navigate('/users');
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">{id ? 'Edit User' : 'Tambah User'}</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input className="w-full border p-2" value={name} onChange={e => setName(e.target.value)} placeholder="Nama" />
        <input className="w-full border p-2" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
        <input className="w-full border p-2" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder={id ? 'Ubah password (opsional)' : 'Password'} />
        <button className="bg-blue-500 text-white px-4 py-2 rounded">{id ? 'Update' : 'Simpan'}</button>
      </form>
    </div>
  );
};

export default UserForm;
