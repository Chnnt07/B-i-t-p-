import { useEffect, useState } from "react";
import Header from "./components/Header";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import { useTheme } from "./context/ThemeContext";
import useLocalStorage from "./hooks/useLocalStorage";
import { initialTasks } from "./tasks";
import "./App.css";

function App() {
  const { theme } = useTheme();

  const [tasks, setTasks] = useLocalStorage(
    "tasks",
    initialTasks
  );

  const [, setHistory] = useLocalStorage(
    "taskHistory",
    []
  );

  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const savedHistory = JSON.parse(
      localStorage.getItem("taskHistory") || "[]"
    );

    if (savedHistory.length > 0) {
      console.group("===== LỊCH SỬ TASK MANAGER =====");

      savedHistory.forEach((item) => {
        console.log(
          `[${item.time}] ${item.action}: ${item.title}`
        );
      });

      console.groupEnd();
    }
  }, []);

  const addHistory = (action, title) => {
    const newHistory = {
      id: Date.now(),
      time: new Date().toLocaleString("vi-VN"),
      action,
      title,
    };

    setHistory((currentHistory) => [
      ...currentHistory,
      newHistory,
    ]);

    console.log(
      `[${newHistory.time}] ${action}: ${title}`
    );
  };

  const addTask = (title) => {
    const newTask = {
      id: Date.now(),
      title,
      completed: false,
    };

    setTasks((currentTasks) => [
      ...currentTasks,
      newTask,
    ]);

    addHistory("Thêm công việc", title);
  };

  const toggleTask = (id) => {
    const selectedTask = tasks.find(
      (task) => task.id === id
    );

    if (!selectedTask) {
      return;
    }

    const newStatus = !selectedTask.completed;

    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === id
          ? {
              ...task,
              completed: newStatus,
            }
          : task
      )
    );

    if (newStatus) {
      addHistory(
        "Hoàn thành công việc",
        selectedTask.title
      );
    } else {
      addHistory(
        "Chuyển về chưa hoàn thành",
        selectedTask.title
      );
    }
  };

  const deleteTask = (id) => {
    const selectedTask = tasks.find(
      (task) => task.id === id
    );

    if (!selectedTask) {
      return;
    }

    if (!selectedTask.completed) {
      console.warn(
        `Không thể xóa "${selectedTask.title}" vì công việc chưa hoàn thành.`
      );

      addHistory(
        "Từ chối xóa - chưa hoàn thành",
        selectedTask.title
      );

      return;
    }

    setTasks((currentTasks) =>
      currentTasks.filter(
        (task) => task.id !== id
      )
    );

    addHistory(
      "Xóa công việc",
      selectedTask.title
    );
  };

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesFilter =
      filter === "all" ||
      (filter === "active" && !task.completed) ||
      (filter === "completed" && task.completed);

    return matchesSearch && matchesFilter;
  });

  const totalTasks = tasks.length;

  const activeTasks = tasks.filter(
    (task) => !task.completed
  ).length;

  const completedTasks = tasks.filter(
    (task) => task.completed
  ).length;

  return (
    <div
      className={
        theme === "dark"
          ? "app dark"
          : "app light"
      }
    >
      <div className="container">
        <Header />

        <TaskForm onAddTask={addTask} />

        <div className="controls">
          <select
            value={filter}
            onChange={(event) =>
              setFilter(event.target.value)
            }
          >
            <option value="all">Tất cả</option>
            <option value="active">
              Chưa làm
            </option>
            <option value="completed">
              Hoàn thành
            </option>
          </select>

          <input
            type="text"
            value={search}
            placeholder="Tìm kiếm........"
            onChange={(event) =>
              setSearch(event.target.value)
            }
          />
        </div>

        <div className="statistics">
          Tổng: {totalTasks}
          {" | "}
          Chưa làm: {activeTasks}
          {" | "}
          Hoàn thành: {completedTasks}
        </div>

        <TaskList
          tasks={filteredTasks}
          onToggleTask={toggleTask}
          onDeleteTask={deleteTask}
        />
      </div>
    </div>
  );
}

export default App;