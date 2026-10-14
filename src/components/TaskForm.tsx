import { useState, type SubmitEvent } from "react";
import { Plus } from "lucide-react";
import toast from "react-hot-toast";

type TaskFormProps = {
  onAddTask: (title: string) => void;
};

function TaskForm({ onAddTask }: TaskFormProps) {
  const [title, setTitle] = useState("");

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedTitle = title.trim();
    if (trimmedTitle === "") {
      toast.error("Task title cannot be empty");
      return;
    }
    onAddTask(trimmedTitle);
    setTitle("");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-6 flex flex-col gap-3 sm:flex-row"
    >
      <input
        type="text"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        placeholder="What needs to be done?"
        aria-label="New task title"
        maxLength={200}
        className="min-w-0 flex-1 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-50"
      />

      <button
        type="submit"
        className="flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
      >
        <Plus size={19} />
        Add Task
      </button>
    </form>
  );
}

export default TaskForm;
