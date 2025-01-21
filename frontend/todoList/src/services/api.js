const API_BASE_URL = "/api";

const handleResponse = async (response) => {
  const data = await response.json();
  if (!response.ok || !data.success) {
    throw new Error(data.message || "Something went wrong");
  }
  return data;
};

export const todoApi = {
  // 获取所有待办事项
  getAllTodos: async () => {
    const response = await fetch(`${API_BASE_URL}/`);
    return handleResponse(response);
  },

  // 添加新待办事项
  addTodo: async (value) => {
    const response = await fetch(`${API_BASE_URL}/add-todo`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ value }),
    });
    return handleResponse(response);
  },

  // 更新待办事项状态
  updateTodo: async (id, isCompleted) => {
    const response = await fetch(`${API_BASE_URL}/update-todo/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ isCompleted }),
    });
    return handleResponse(response);
  },

  // 删除待办事项
  deleteTodo: async (id) => {
    const response = await fetch(`${API_BASE_URL}/del-todo/${id}`, {
      method: "POST",
    });
    return handleResponse(response);
  },
};

export const authApi = {
  // 用户注册
  register: async (username, password) => {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
    return handleResponse(response);
  },

  // 用户登录
  login: async (username, password) => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
    return handleResponse(response);
  },
};
