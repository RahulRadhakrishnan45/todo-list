import type { TaskFilter } from '../types/task';

type TaskFilterProps = {
  filter: TaskFilter;
  onFilterChange: (filter: TaskFilter) => void;
};

function TaskFilter({ filter,onFilterChange }: TaskFilterProps) {
  return (
    <div className="flex items-center justify-evenly ">
      <button
        type="button"
        onClick={() => onFilterChange("active")}
        className={
          filter === "active"
            ? "bg-indigo-600 text-white"
            : "bg-slate-100 text-slate-600"
        }
      >
        Active
      </button>

      <button
        type="button"
        onClick={() => onFilterChange("all")}
        className={
          filter === "all"
            ? "bg-indigo-600 text-white"
            : "bg-slate-100 text-slate-600"
        }
      >
        All Tasks
      </button>

      <button
        type="button"
        onClick={() => onFilterChange("completed")}
        className={
          filter === "completed"
            ? "bg-indigo-600 text-white"
            : "bg-slate-100 text-slate-600"
        }
      >
        Completed
      </button>
    </div>
  );
}

export default TaskFilter;
