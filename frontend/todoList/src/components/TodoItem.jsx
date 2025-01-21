function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <div
      className="fade-in"
      style={{
        display: "flex",
        alignItems: "center",
        padding: "var(--spacing-md)",
        backgroundColor: "var(--surface)",
        borderRadius: "var(--radius)",
        marginBottom: "var(--spacing-sm)",
        transition: "transform 0.2s ease",
      }}
      onMouseEnter={(e) =>
        (e.currentTarget.style.transform = "translateX(5px)")
      }
      onMouseLeave={(e) => (e.currentTarget.style.transform = "translateX(0)")}
    >
      {/* Checkbox */}
      <button
        onClick={() => onToggle(todo.id)}
        style={{
          width: "20px",
          height: "20px",
          borderRadius: "50%",
          border: `2px solid ${
            todo.completed ? "var(--success)" : "var(--text-secondary)"
          }`,
          backgroundColor: todo.completed ? "var(--success)" : "transparent",
          marginRight: "var(--spacing-md)",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "all 0.2s ease",
        }}
      >
        {todo.completed && (
          <span style={{ color: "white", fontSize: "12px" }}>✓</span>
        )}
      </button>

      {/* Text */}
      <span
        style={{
          flex: 1,
          textDecoration: todo.completed ? "line-through" : "none",
          color: todo.completed ? "var(--text-secondary)" : "var(--text)",
        }}
      >
        {todo.text}
      </span>

      {/* Delete button */}
      <button
        onClick={() => onDelete(todo.id)}
        style={{
          border: "none",
          background: "none",
          color: "var(--error)",
          cursor: "pointer",
          opacity: 0.7,
          fontSize: "1.2rem",
          transition: "opacity 0.2s ease",
        }}
        onMouseEnter={(e) => (e.target.style.opacity = 1)}
        onMouseLeave={(e) => (e.target.style.opacity = 0.7)}
      >
        ×
      </button>
    </div>
  );
}

export default TodoItem;
