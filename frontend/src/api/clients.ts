import axios from '@/services/axios';
import { Client } from '@/types/client';

export const getClients = () => axios.get<Client[]>('/api/clients');
export const createClient = (data: Partial<Client>) => axios.post('/api/clients', data);
export const updateClient = (id: number, data: Partial<Client>) => axios.put(`/api/clients/${id}`, data);
export const deleteClient = (id: number) => axios.delete(`/api/clients/${id}`);
