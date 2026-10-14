import { ListTodo } from "lucide-react";

function Header() {
  return (
    <header className="mb-8 flex items-center gap-3">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-600 text-white">
        <ListTodo size={25} />
      </div>

      <div>
        <h1 className="text-2xl font-bold text-slate-900">Todo List</h1>

        <p className="text-sm text-slate-500">Manage your tasks easily.</p>
      </div>
    </header>
  );
}

export default Header;
