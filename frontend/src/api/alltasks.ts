import axios from '@/services/axios';
import { Task } from '@/types/task';

export const getTasks = () => axios.get<Task[]>('/api/tasks');
export const createTask = (data: Partial<Task>) => axios.post('/api/tasks', data);
export const updateTask = (id: number, data: Partial<Task>) => axios.put(`/api/tasks/${id}`, data);
export const deleteTask = (id: number) => axios.delete(`/api/tasks/${id}`);