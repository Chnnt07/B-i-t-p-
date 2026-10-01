function TaskItem({ task, onToggleTask, onDeleteTask }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "8px 0",
      }}
    >
      <label
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          cursor: "pointer",
        }}
      >
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggleTask(task.id)}
        />

        <span
          style={{
            textDecoration: task.completed
              ? "line-through"
              : "none",
            opacity: task.completed ? 0.6 : 1,
          }}
        >
          {task.title}
        </span>
      </label>

      <button
        onClick={() => onDeleteTask(task.id)}
        style={{
          border: "none",
          background: "transparent",
          color: "inherit",
          cursor: "pointer",
        }}
      >
        [Xóa]
      </button>
    </div>
  );
}

export default TaskItem;