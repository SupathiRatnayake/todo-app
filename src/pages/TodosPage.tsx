import { useEffect, useState } from "react";
import { TodoItem } from "../features/todos/models/TodoItem";
import { useUser } from "../features/auth/context/UserContext";
import { getTodos } from "../api/todoApi";
import TodosList from "../features/todos/components/TodosList";

const TodosPage = () => {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const { user, isLoading: userLoading } = useUser();

  useEffect(() => {
    const fetchTodos = async () => {
      if (!userLoading && user) {
        // When user is loaded && user is not null
        const userId = user.id;
        try {
          const data = await getTodos(userId.toString());
          setTodos(data);
        } catch (error) {
          console.error("Error loading todos", error);
        }
      }
    };
    fetchTodos();
  }, [user, userLoading]);

  const saveTodo = (todo: TodoItem) => {
    const updatedTodos = todos.map((t: TodoItem) => {
      return t.id === todo.id ? todo : t;
    });
    setTodos(updatedTodos);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="mb-8 text-center sm:text-left">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My To-dos</h1>
        </div>

        {/* Stats/Summary Bar (optional) */}
        <div className="bg-white shadow rounded-lg p-4 mb-8 flex flex-wrap justify-between items-center">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-gray-500">
              Total Tasks:
            </span>
            <span className="text-lg font-semibold text-blue-600">
              {todos.length}
            </span>
          </div>
          <div className="flex space-x-4">
            <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors">
              Add New Task
            </button>
            <button className="px-4 py-2 border border-gray-300 text-sm font-medium rounded-md hover:bg-gray-50 transition-colors">
              Filter
            </button>
          </div>
        </div>
        <TodosList onSave={saveTodo} todos={todos} />
      </div>
    </div>
  );
};
export default TodosPage;
