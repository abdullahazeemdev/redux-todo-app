import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import {
  addTodo,
  updateTodo as updateTodoAction,
  deleteTodo,
  doneTodo,
} from "./features/todo/todoSlice";

function App() {
  const [input, setInput] = useState("");
  const [isEdit, setIsEdit] = useState(null);

  const dispatch = useDispatch();

  const todos = useSelector((state) => state.todo.todos);

  const updateTodoHandler = () => {
    dispatch(
      updateTodoAction({
        id: isEdit,
        title: input,
      })
    );
  };

  const addTodoHandler = () => {
    if (!input.trim()) {
      toast.error("Input cannot be empty");
      return;
    }

    if (isEdit !== null) {
      updateTodoHandler();

      setIsEdit(null);
      setInput("");

      toast.success("Task update ho gaya!");
      return;
    }

    dispatch(
      addTodo({
        id: new Date().getTime(),
        title: input,
        completed: false,
      })
    );

    toast.success("Task add ho gaya!");
    setInput("");
  };

  const editTodoHandler = (todo) => {
    setIsEdit(todo.id);
    setInput(todo.title);
  };

  const deleteTodos = (id) => {
    dispatch(deleteTodo(id));
    toast.success("Task delete ho gaya!");
  };

  const doneTodos = (id) => {
    dispatch(doneTodo(id));
  };

  // Stats
  const totalTodos = todos.length;

  const completedTodos = todos.filter(
    (todo) => todo.completed
  ).length;

  const remainingTodos = totalTodos - completedTodos;

  return (
    <div className="min-h-screen bg-[#f5f5f0] text-stone-900 flex items-center justify-center p-5">

      <div className="w-full max-w-2xl">

        {/* Header */}
        <div className="mb-8">
          <p className="text-emerald-600 font-semibold mb-2">
            MY WORKSPACE
          </p>

          <h1 className="text-4xl font-black tracking-tight">
            TaskFlow<span className="text-emerald-500">.</span>
          </h1>

          <p className="text-stone-500 mt-2">
            Organize your work. Stay focused.
          </p>
        </div>

        {/* Add Task */}
        <div className="bg-white border border-stone-200 rounded-3xl p-5 mb-5 shadow-sm">

          <h2 className="font-bold text-lg mb-4">
            Create a new task
          </h2>

          <div className="flex flex-col sm:flex-row gap-3">

            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              type="text"
              placeholder="Enter your task..."
              className="flex-1 bg-stone-100 border border-stone-200 rounded-xl px-4 py-3 outline-none focus:border-emerald-500"
            />

            <button
              onClick={addTodoHandler}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl font-semibold transition cursor-pointer"
            >
              {isEdit !== null ? "Update" : "+ Add"}
            </button>

          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-5">

          <div className="bg-white border border-stone-200 rounded-2xl p-4">
            <p className="text-stone-500 text-sm">
              Total
            </p>

            <h2 className="text-2xl font-bold mt-1">
              {totalTodos}
            </h2>
          </div>

          <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-4">
            <p className="text-emerald-700 text-sm">
              Completed
            </p>

            <h2 className="text-2xl font-bold text-emerald-600 mt-1">
              {completedTodos}
            </h2>
          </div>

          <div className="bg-amber-50 border border-amber-100 rounded-2xl p-4">
            <p className="text-amber-700 text-sm">
              Remaining
            </p>

            <h2 className="text-2xl font-bold text-amber-600 mt-1">
              {remainingTodos}
            </h2>
          </div>

        </div>

        {/* Tasks */}
        <div className="bg-white border border-stone-200 rounded-3xl p-5 shadow-sm">

          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-bold">
              My Tasks
            </h2>

            <span className="text-sm text-stone-400">
              Today
            </span>
          </div>

          <div className="space-y-3">

            {todos.length > 0 ? (
              todos.map((todo) => (
                <div
                  key={todo.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-stone-50 border border-stone-200 rounded-2xl p-4"
                >

                  {/* Task Info */}
                  <div className="flex items-center gap-3">

                    <div
                      className={`w-5 h-5 rounded-full border-2 border-stone-300 shrink-0 ${
                        todo.completed
                          ? "bg-green-900"
                          : "bg-amber-50"
                      }`}
                    ></div>

                    <div>
                      <h3
                        className={`font-semibold ${
                          todo.completed
                            ? "line-through text-stone-400"
                            : ""
                        }`}
                      >
                        {todo.title}
                      </h3>

                      <p className="text-xs text-stone-400 mt-1">
                        Redux Learning
                      </p>
                    </div>

                  </div>

                  {/* Buttons */}
                  <div className="flex gap-2 self-end sm:self-auto">

                    <button
                      onClick={() => doneTodos(todo.id)}
                      className="text-emerald-600 bg-emerald-100 hover:bg-emerald-200 px-3 py-2 rounded-lg text-sm font-medium cursor-pointer"
                    >
                      {todo.completed ? "Undo" : "Done"}
                    </button>

                    {todo.completed ? null : (
                      <>
                        <button
                          onClick={() => editTodoHandler(todo)}
                          className="text-blue-600 bg-blue-100 hover:bg-blue-200 px-3 py-2 rounded-lg text-sm font-medium cursor-pointer"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => deleteTodos(todo.id)}
                          className="text-red-600 bg-red-100 hover:bg-red-200 px-3 py-2 rounded-lg text-sm font-medium cursor-pointer"
                        >
                          Delete
                        </button>
                      </>
                    )}

                  </div>

                </div>
              ))
            ) : (
              <p className="text-stone-400 text-center py-4">
                Koi task nahi hai, upar se add karein!
              </p>
            )}

          </div>

        </div>

        {/* footer */}
        <p className="text-center text-stone-400 text-sm mt-6">
          Built with React + Tailwind CSS + Redux
        </p>

      </div>

      <ToastContainer />

    </div>
  );
}

export default App;