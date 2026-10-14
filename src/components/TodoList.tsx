import { useState } from "react";
import { CheckCircle2, Circle, Trash2, Pencil, Save, X } from "lucide-react";
import type { Task, TaskFilter as TaskFilterType } from "../types/task";
import Header from "./Header";
import TaskFilter from "./TaskFilter";
import TaskForm from "./TaskForm";
import toast from "react-hot-toast";

function TodoList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<TaskFilterType>("active");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState<string>("");

  function handleAddTask(title: string) {
    const newTask: Task = {
      id: crypto.randomUUID(),
      title,
      completed: false,
      createdAt: new Date().toISOString(),
      completedAt: null,
    };
    setTasks((prevTasks) => [...prevTasks, newTask]);

    toast.success("Task added successfully");
  }

  function toggleTask(id: string) {
    const selectedTask = tasks.find((task) => task.id === id);
    if (!selectedTask) return;
    setTasks((prevTasks) =>
      prevTasks.map((task) => {
        if (task.id !== id) return task;
        const completed = !task.completed;
        return {
          ...task,
          completed,
          completedAt: completed ? new Date().toISOString() : null,
        };
      }),
    );
    if (!selectedTask.completed) {
      toast.success("Task marked as completed");
    }
  }

  function deleteTask(id: string) {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    toast.success("Task deleted successfully");
  }

  function startEdit(id: string, title: string) {
    setEditingId(id);
    setEditTitle(title);
  }

  function saveEdit(id: string) {
    const trimmedTitle = editTitle.trim();
    if (trimmedTitle === "") return;
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, title: editTitle } : task,
      ),
    );
    setEditingId(null);
    setEditTitle("");
    toast.success("Task updated successfully");
  }

  function cancelEdit() {
    setEditingId(null);
    setEditTitle("");
    toast.error("Editing canceled");
  }

  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  const activeTaskCount = tasks.filter((task) => !task.completed).length;
  const completedCount = tasks.filter((task) => task.completed).length;

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-10">
      <div className="mx-auto max-w-xl rounded-2xl bg-white p-6 shadow-lg sm:p-8">
        <Header />

        <TaskForm onAddTask={handleAddTask} />

        <TaskFilter filter={filter} onFilterChange={setFilter} />

        {/* Task List */}
        <div className="mt-5">
          {filteredTasks.length === 0 ? (
            <div className="py-10 text-center">
              <Circle size={40} className="mx-auto mb-3 text-slate-300" />

              <p className="font-medium text-slate-600">
                {filter === "completed"
                  ? "No completed tasks yet"
                  : filter === "active"
                    ? "No active tasks"
                    : "No tasks yet"}
              </p>

              <p className="mt-1 text-sm text-slate-400">
                Add a task to get started!
              </p>
            </div>
          ) : (
            <ul className="space-y-3">
              {filteredTasks.map((task) => (
                <li
                  key={task.id}
                  className="flex items-center gap-3 rounded-xl border border-slate-200 p-4 transition hover:border-indigo-200"
                >
                  {editingId === task.id ? (
                    <>
                      <input
                        type="text"
                        value={editTitle}
                        onChange={(event) => setEditTitle(event.target.value)}
                        onKeyDown={(event) => {
                          if (event.key === "Enter") {
                            saveEdit(task.id);
                          }

                          if (event.key === "Escape") {
                            cancelEdit();
                          }
                        }}
                        maxLength={200}
                        autoFocus
                        aria-label="Edit task title"
                        className="min-w-0 flex-1 rounded-lg border border-indigo-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-100"
                      />

                      <button
                        type="button"
                        onClick={() => saveEdit(task.id)}
                        aria-label="Save task"
                        className="shrink-0 text-green-600 hover:text-green-700"
                      >
                        <Save size={19} />
                      </button>

                      <button
                        type="button"
                        onClick={cancelEdit}
                        aria-label="Cancel editing"
                        className="shrink-0 text-slate-400 hover:text-red-500"
                      >
                        <X size={20} />
                      </button>
                    </>
                  ) : (
                    <>
                      {/* Complete Task */}
                      {filter !== "completed" && (
                        <button
                          type="button"
                          onClick={() => toggleTask(task.id)}
                          aria-label={
                            task.completed
                              ? `Mark ${task.title} as active`
                              : `Mark ${task.title} as completed`
                          }
                          className="shrink-0"
                        >
                          {task.completed ? (
                            <CheckCircle2
                              size={22}
                              className="text-indigo-600"
                            />
                          ) : (
                            <Circle
                              size={22}
                              className="text-slate-400 hover:text-indigo-600"
                            />
                          )}
                        </button>
                      )}

                      {/* Task Title */}
                      <div className="min-w-0 flex-1">
                        <p
                          className={`break-words text-sm ${
                            task.completed
                              ? "text-slate-400 line-through"
                              : "text-slate-700"
                          }`}
                        >
                          {task.title}
                        </p>

                        {task.completed && task.completedAt && (
                          <p className="mt-1 text-xs text-slate-400">
                            Completed on{" "}
                            {new Date(task.completedAt).toLocaleDateString(
                              "en-IN",
                              {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                                hour12: true,
                              },
                            )}
                          </p>
                        )}
                      </div>

                      {/* Edit Task */}
                      {!task.completed && (
                        <button
                          type="button"
                          onClick={() => startEdit(task.id, task.title)}
                          aria-label={`Edit ${task.title}`}
                          className="shrink-0 text-slate-400 hover:text-indigo-600"
                        >
                          <Pencil size={18} />
                        </button>
                      )}

                      {/* Delete Task */}
                      <button
                        type="button"
                        onClick={() => deleteTask(task.id)}
                        aria-label={`Delete ${task.title}`}
                        className="shrink-0 text-slate-400 hover:text-red-500"
                      >
                        <Trash2 size={18} />
                      </button>
                    </>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Task Counts */}
        <div className="mt-6 flex justify-between border-t border-slate-200 pt-4 text-xs text-slate-500">
          <span>{activeTaskCount} active</span>
          <span>{completedCount} completed</span>
          <span>{tasks.length} total</span>
        </div>
      </div>
    </main>
  );
}

export default TodoList;
