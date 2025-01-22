import { useState } from "react";
import { PlusIcon } from "@heroicons/react/24/solid";

function TodoInput({ onAdd }) {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      onAdd(text.trim());
      setText("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="fade-in">
      <div
        style={{
          display: "flex",
          gap: "var(--spacing-sm)",
        }}
      >
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a new task..."
          style={{
            flex: 1,
            padding: "var(--spacing-md)",
            border: "none",
            borderRadius: "var(--radius)",
            backgroundColor: "var(--surface)",
            fontSize: "1rem",
          }}
        />
        <button
          type="submit"
          disabled={!text.trim()}
          style={{
            padding: "var(--spacing-md)",
            border: "none",
            borderRadius: "var(--radius)",
            backgroundColor: "var(--primary)",
            color: "white",
            cursor: "pointer",
            fontSize: "1rem",
            opacity: text.trim() ? 1 : 0.7,
            display: "flex",
            alignItems: "center",
            gap: "var(--spacing-sm)",
          }}
        >
          <PlusIcon style={{ width: "1.2rem", height: "1.2rem" }} />
          Add
        </button>
      </div>
    </form>
  );
}

export default TodoInput;
