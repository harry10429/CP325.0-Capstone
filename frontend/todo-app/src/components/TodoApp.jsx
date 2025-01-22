import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TodoInput from "./TodoInput";
import TodoItem from "./TodoItem";
import { todoApi } from "../services/api";
import { useUser } from "../contexts/UserContext";

function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { user, logout } = useUser();

  useEffect(() => {
    if (!user) {
      navigate("/");
      return;
    }
    fetchTodos();
  }, [user, navigate]);

  const fetchTodos = async () => {
    try {
      setLoading(true);
      const response = await todoApi.getAllTodos();
      setTodos(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const addTodo = async (text) => {
    try {
      const response = await todoApi.addTodo(text);
      setTodos([...todos, response.data]);
    } catch (err) {
      setError(err.message);
    }
  };

  const toggleTodo = async (id) => {
    try {
      const todo = todos.find((t) => t._id === id);
      const response = await todoApi.updateTodo(id, !todo.isCompleted);
      setTodos(todos.map((t) => (t._id === id ? response.data : t)));
    } catch (err) {
      setError(err.message);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await todoApi.deleteTodo(id);
      setTodos(todos.filter((t) => t._id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  if (loading) {
    return <div className="container">Loading...</div>;
  }

  if (error) {
    return (
      <div className="container" style={{ color: "var(--error)" }}>
        {error}
      </div>
    );
  }

  return (
    <div className="container">
      <header
        style={{
          marginBottom: "var(--spacing-lg)",
          textAlign: "center",
          position: "relative",
        }}
      >
        <button
          onClick={handleLogout}
          style={{
            position: "absolute",
            right: 0,
            top: 0,
            background: "none",
            border: "none",
            color: "var(--text-secondary)",
            cursor: "pointer",
            padding: "var(--spacing-sm)",
          }}
        >
          Logout
        </button>

        <h1
          style={{
            fontSize: "2.5rem",
            background:
              "linear-gradient(135deg, var(--primary) 0%, #47a0ff 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            marginBottom: "var(--spacing-sm)",
          }}
        >
          Todo List
        </h1>
        <p style={{ color: "var(--text-secondary)" }}>
          {todos.length} tasks • {todos.filter((t) => t.isCompleted).length}{" "}
          completed
        </p>
      </header>

      <main className="fade-in">
        <TodoInput onAdd={addTodo} />

        <div style={{ marginTop: "var(--spacing-lg)" }}>
          {todos.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                color: "var(--text-secondary)",
                padding: "var(--spacing-lg)",
              }}
            >
              No tasks yet. Add your first task!
            </div>
          ) : (
            todos.map((todo) => (
              <TodoItem
                key={todo._id}
                todo={{
                  id: todo._id,
                  text: todo.value,
                  completed: todo.isCompleted,
                }}
                onToggle={toggleTodo}
                onDelete={deleteTodo}
              />
            ))
          )}
        </div>
      </main>
    </div>
  );
}

export default TodoApp;
