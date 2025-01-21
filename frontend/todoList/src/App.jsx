import { useState } from "react";
import TodoInput from "./components/TodoInput";
import TodoItem from "./components/TodoItem";
import "./index.css";

function App() {
  const [todos, setTodos] = useState([]);

  const addTodo = (text) => {
    setTodos([...todos, { id: Date.now(), text, completed: false }]);
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="container">
      <header
        style={{
          marginBottom: "var(--spacing-lg)",
          textAlign: "center",
        }}
      >
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
          {todos.length} tasks • {todos.filter((t) => t.completed).length}{" "}
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
                key={todo.id}
                todo={todo}
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

export default App;
