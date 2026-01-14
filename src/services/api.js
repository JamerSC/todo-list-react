import api from "./axios";

export const getTodos = (params) => {
  return api.get("/", {
    params: {
      page: params.page,
      size: params.size,
      search: params.search || undefined,
      status: params.status || undefined,
      dateFrom: params.dateFrom || undefined,
      dateTo: params.dateTo || undefined,
    },
  });
};

export const createTodo = (todo) => api.post("/", todo);
export const getTodo = (id) => api.get(`/${id}`);
export const updateTodo = (todo) => api.put(`/${todo.id}`, todo);
export const deleteTodo = (id) => api.delete(`/${id}`);
