import { TodoItem } from "../models/TodoItem";

interface TodoProps {
  todo: TodoItem;
  onEdit: (todo: TodoItem) => void;
}

function TodoCard(props: Readonly<TodoProps>) {
  const { todo, onEdit } = props;

  const handleEditClick = (taskToEdit: TodoItem) => {
    onEdit(taskToEdit);
  };

  const handleDeleteClick = (taskToEdit: TodoItem) => {
    console.log(taskToEdit.id);
  };

  return (
    <div className="max-w-md w-full bg-white rounded-lg shadow-md overflow-hidden mb-4 border border-gray-200 hover:shadow-lg transition-shadow duration-200">
      {/* Card Header */}
      <div className="p-5 pb-2 flex justify-between items-start">
        <div className="flex-1">
          <h2 className="text-xl font-semibold text-gray-800 truncate">
            {todo.title}
          </h2>
          <div className="mt-2 flex items-center text-sm">
            <svg
              className="w-4 h-4 text-gray-500 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span className="text-gray-600">{todo.due.toDateString()}</span>
          </div>
        </div>
        <span
          className={`ml-3 px-2.5 py-0.5 rounded-full text-xs font-medium ${
            todo.isComplete
              ? "bg-green-100 text-green-800"
              : "bg-yellow-100 text-yellow-800"
          }`}
        >
          {todo.isComplete ? "Completed" : "Pending"}
        </span>
      </div>

      {/* Description */}
      <div className="px-5 py-3">
        <p className="text-gray-600 text-sm line-clamp-3">{todo.description}</p>
      </div>

      {/* Action Buttons */}
      <div className="px-5 py-3 bg-gray-50 flex justify-end space-x-2">
        <button
          className="px-3 py-1.5 text-sm font-medium text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-md transition-colors"
          onClick={() => {
            handleEditClick(todo);
          }}
        >
          Edit
        </button>
        <button
          className="px-3 py-1.5 text-sm font-medium text-red-600 hover:text-red-800 hover:bg-red-50 rounded-md transition-colors"
          onClick={() => handleDeleteClick(todo)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default TodoCard;
