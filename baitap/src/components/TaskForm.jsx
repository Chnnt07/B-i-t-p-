import { useState } from "react";

function TaskForm({ onAddTask }) {
  const [title, setTitle] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!title.trim()) {
      return;
    }

    onAddTask(title.trim());

    setTitle("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        gap: "10px",
        marginTop: "30px",
      }}
    >
      <input
        type="text"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        placeholder="Nhập tên công việc........"
        style={{
          flex: 1,
          padding: "10px",
          border: "1px solid #888",
          background: "transparent",
          color: "inherit",
        }}
      />

      <button
        type="submit"
        style={{
          padding: "10px 18px",
          cursor: "pointer",
          background: "transparent",
          color: "inherit",
          border: "1px solid #888",
        }}
      >
        Thêm
      </button>
    </form>
  );
}

export default TaskForm;