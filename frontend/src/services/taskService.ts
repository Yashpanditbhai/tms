import api from './api';

export interface CreateTaskPayload {
  title: string;
  description?: string;
  assignedTo: string;
  dueDate?: string;
}

export interface UpdateTaskPayload {
  title?: string;
  description?: string;
  assignedTo?: string;
  status?: string;
  dueDate?: string;
}

const taskService = {
  getAllTasks: async (params?: { status?: string; search?: string }) => {
    const response = await api.get('/tasks', { params });
    return response.data.data;
  },

  getMyTasks: async (params?: { status?: string; search?: string }) => {
    const response = await api.get('/tasks/my-tasks', { params });
    return response.data.data;
  },

  getTaskById: async (id: string) => {
    const response = await api.get(`/tasks/${id}`);
    return response.data.data;
  },

  createTask: async (data: CreateTaskPayload) => {
    const response = await api.post('/tasks', data);
    return response.data.data;
  },

  updateTask: async (id: string, data: UpdateTaskPayload) => {
    const response = await api.put(`/tasks/${id}`, data);
    return response.data.data;
  },

  updateTaskStatus: async (id: string, status: string) => {
    const response = await api.patch(`/tasks/${id}/status`, { status });
    return response.data.data;
  },

  deleteTask: async (id: string) => {
    const response = await api.delete(`/tasks/${id}`);
    return response.data.data;
  },

  getTaskStats: async () => {
    const response = await api.get('/tasks/stats');
    return response.data.data;
  },
};

export default taskService;
