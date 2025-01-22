const API_BASE_URL = "http://localhost:5052/api";

const handleResponse = async (response) => {
  const data = await response.json();
  if (!response.ok || !data.success) {
    throw new Error(data.message || "Something went wrong");
  }
  return data;
};

export const todoApi = {
  //display todoTask
  getAllTodos: async () => {
    const response = await fetch(`${API_BASE_URL}/get-todo`);
    return handleResponse(response);
  },

  // add new todo Task
  addTodo: async (value) => {
    const response = await fetch(`${API_BASE_URL}/add-todo`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ value, isCompleted: false }),
    });
    return handleResponse(response);
  },

  // Update the complete status of todo Task
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

  // Delete todo Task with specifed id
  deleteTodo: async (id) => {
    const response = await fetch(`${API_BASE_URL}/del-todo/${id}`, {
      method: "DELETE",
    });
    return handleResponse(response);
  },
};
