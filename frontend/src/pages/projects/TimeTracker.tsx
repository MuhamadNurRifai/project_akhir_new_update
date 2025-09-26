import { useState } from 'react';
import axios from '@/services/axios';

const TimeTrackerForm = () => {
  const [form, setForm] = useState({
    task_id: '',
    start_time: '',
    end_time: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await axios.post('/api/time-tracker', form);
    alert('Time tracked');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-white rounded shadow">
      <input type="text" placeholder="Task ID" value={form.task_id}
        onChange={e => setForm({...form, task_id: e.target.value})} className="input" />
      <input type="datetime-local" placeholder="Start Time" value={form.start_time}
        onChange={e => setForm({...form, start_time: e.target.value})} className="input" />
      <input type="datetime-local" placeholder="End Time" value={form.end_time}
        onChange={e => setForm({...form, end_time: e.target.value})} className="input" />
      <button type="submit" className="btn">Track</button>
    </form>
  );
};

export default TimeTrackerForm;
