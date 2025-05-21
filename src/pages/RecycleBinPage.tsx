import TodosList from "../features/todos/TodosList";
import { useTodos } from "../features/todos/todoHooks";
import { Box, Typography } from "@mui/material";
import TodoFilterPanel from "../features/todos/TodoFilterPanel";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { TodoItem } from "../features/todos/TodoItem";
import ConfirmDialog from "../features/todos/ConfirmDialog";
import { FilterState } from "../features/todos/FilterState";

const RecycleBinPage = () => {
  const [filters, setFilters] = useState({
    search: "",
    status: "all",
    dueDate: null,
    isDeleted: true,
  } as FilterState);
  const { todos, saveTodo, restoreTodo, permenantDeleteTodo } = useTodos(filters);
  const navigate = useNavigate();
  const [todoToDelete, setTodoToDelete] = useState<TodoItem | null>(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const handleFilterChange = (updatedFilters: typeof filters) => {
    setFilters(updatedFilters);
  };

  const clearfilters = () => {
    setFilters({ search: "", status: "all", dueDate: null });
  };

  const handleEditClick = (id: string) => {
    navigate(`/app/todos/${id}/edit`);
  };
  const confirmDelete = async () => {
    if (todoToDelete) {
      await permenantDeleteTodo(todoToDelete.id);
    }
    setTodoToDelete(null);
    setIsConfirmOpen(false);
  };

  const requestDelete = async (todo: TodoItem) => {
    setTodoToDelete(todo);
    setIsConfirmOpen(true);
  };

  const cancelDelete = () => {
    setIsConfirmOpen(false);
    setTodoToDelete(null);
  };

  const handleRestore = async (todo: TodoItem) => {
    await restoreTodo(todo);
  };

  const handleStatusToggle = (todo: TodoItem, newStatus: boolean) => {
    todo.isComplete = newStatus;
    saveTodo(todo);
  };

  return (
    <>
      <ConfirmDialog
        isOpen={isConfirmOpen}
        title="Permanantly Delete"
        message={`Are you sure you want to permanantly delete "${todoToDelete?.title}"?`}
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />
      <Box
        sx={{
          px: 3,
          py: 4,
          width: "100%",
          maxWidth: "1200px",
          mx: "auto",
        }}
      >
        {/* Section Header */}
        <div className="flex justify-between">
          <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
            Deleted Todos
          </Typography>
        </div>
        {/* Filter Pannel */}
        {todos && (
          <TodoFilterPanel
            filters={filters}
            onFilterChange={handleFilterChange}
            onClear={clearfilters}
          />
        )}
        {/* Todos List */}
        {todos ? (
          <TodosList
            todos={todos}
            onEdit={handleEditClick}
            onDelete={requestDelete}
            onToggleStatus={handleStatusToggle}
            onRecover={handleRestore}
          />
        ) : (
          <Typography>Recycle bin is empty.</Typography>
        )}
      </Box>
    </>
  );
};
export default RecycleBinPage;
