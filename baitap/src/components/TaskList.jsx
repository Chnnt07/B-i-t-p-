import TaskItem from "./TaskItem";

function TaskList({
  tasks,
  onToggleTask,
  onDeleteTask,
}) {
  if (tasks.length === 0) {
    return (
      <p
        style={{
          textAlign: "center",
          marginTop: "30px",
        }}
      >
        Không có công việc nào
      </p>
    );
  }

  return (
    <div style={{ marginTop: "20px" }}>
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggleTask={onToggleTask}
          onDeleteTask={onDeleteTask}
        />
      ))}
    </div>
  );
}

export default TaskList;