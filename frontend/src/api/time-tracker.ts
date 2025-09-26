import axios from '@/services/axios';
import { TimeEntry } from '@/types/time-tracker';

export const getTimeTrackers = () => axios.get<TimeEntry[]>('/api/time-tracker');
export const createTimeTracker = (data: Partial<TimeEntry>) => axios.post('/api/time-tracker', data);
export const updateTimeTracker = (id: number, data: Partial<TimeEntry>) => axios.put(`/api/time-tracker/${id}`, data);
export const deleteTimeTracker = (id: number) => axios.delete(`/api/time-tracker/${id}`);