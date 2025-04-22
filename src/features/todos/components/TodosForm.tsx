import { SyntheticEvent, useState } from "react";
import { TodoItem } from "../models/TodoItem";

interface TodoFormProps {
  todo: TodoItem;
  onSave: (todo: TodoItem) => void;
  onCancel: () => void;
}

const TodoForm = ({ todo: initialTodo, onSave, onCancel }: TodoFormProps) => {
  const [todo, setTodo] = useState(initialTodo);
  const [errors, setErrors] = useState({
    title: "",
    due: "",
  });

  function validate(todo: TodoItem) {
    const errors = { title: "", due: "" };
    if (!todo.title) {
      errors.title = "Title is reqired.";
    }
    if (!todo.due) {
      errors.due = "Due is reqired.";
    }
    return errors;
  }


  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    onSave(todo);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChange = (event: any) => {
    const { type, name, value, checked } = event.target;

    let updatedValue = type === "ckeckbox" ? checked : value;

    if (type === "date") {
      updatedValue = new Date(updatedValue);
    }
    const change = {
      [name]: updatedValue,
    };

    let updatedTodo: TodoItem;

    setTodo((t) => {
      updatedTodo = new TodoItem({ ...t, ...change });
      return updatedTodo;
    });
    setErrors(() => validate(updatedTodo));
  };

  return (
    <form
      className="bg-white rounded-lg shadow-md p-6 space-y-4 max-w-md mx-auto"
      onSubmit={handleSubmit}
    >
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Title
        </label>
        <input
          type="text"
          name="title"
          id="title"
          placeholder="What is the task?"
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          value={todo.title}
          onChange={handleChange}
        />
        {errors.title === null && (
          <div>
            <p>{errors.title}</p>
          </div>
        )}
      </div>

      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Description
        </label>
        <textarea
          name="description"
          id="description"
          rows={3}
          placeholder="Enter description"
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          value={todo.description}
          onChange={handleChange}
        ></textarea>
      </div>

      <div>
        <label
          htmlFor="due"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Due Date
        </label>
        <input
          type="date"
          name="due"
          id="due"
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          value={
            todo.due.getFullYear() +
            "-" +
            String(todo.due.getMonth() + 1).padStart(2, "0") +
            "-" +
            String(todo.due.getDate()).padStart(2, "0")
          }
          onChange={handleChange}
        />
        {errors.due === null && (
          <div>
            <p>{errors.due}</p>
          </div>
        )}
      </div>

      <div>
        <label
          htmlFor="status"
          className="text-sm font-medium text-gray-700 mb-1"
        >
          Completed?
        </label>
        <input
          type="checkbox"
          name="isComplete"
          id="status"
          checked={todo.isComplete}
          onChange={handleChange}
          className="w-1/6 px-3 py-2 border focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div className="flex justify-end space-x-3 pt-2">
        <button
          type="button"
          className="px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          onClick={onCancel}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Save Task
        </button>
      </div>
    </form>
  );
};

export default TodoForm;
