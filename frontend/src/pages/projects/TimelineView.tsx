import { useState } from 'react';

const TimelineView = () => {
  const [timeline] = useState([
    { id: 1, task_id: 1, user_id: 2, start_time: '2025-08-01 09:00', end_time: '2025-08-01 11:00', duration: 120 },
    { id: 2, task_id: 2, user_id: 1, start_time: '2025-08-02 10:00', end_time: '2025-08-02 12:30', duration: 150 },
    { id: 3, task_id: 3, user_id: 3, start_time: '2025-08-03 13:00', end_time: '2025-08-03 15:00', duration: 120 },
  ]);

  return (
    <div className="ml-64 p-6">
      <h2 className="text-xl font-bold mb-4">Time Tracker Timeline</h2>
      <ul className="space-y-2">
        {timeline.map(entry => (
          <li key={entry.id} className="border p-2">
            Task #{entry.task_id} by User #{entry.user_id}<br />
            Start: {entry.start_time}<br />
            End: {entry.end_time}<br />
            Duration: {entry.duration} minutes
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TimelineView;
