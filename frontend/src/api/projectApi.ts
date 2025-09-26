import axios from '@/services/axios';
export const getProjects = () => axios.get('/api/projects');
export const createProject = (data: any) => axios.post('/api/projects', data);
export const updateProject = (id: number, data: any) => axios.put(`/api/projects/${id}`, data);
export const deleteProject = (id: number) => axios.delete(`/api/projects/${id}`);

export const assignUserToProject = (projectId: number, userId: number) =>
  axios.post(`/projects/${projectId}/assign`, { user_id: userId });
