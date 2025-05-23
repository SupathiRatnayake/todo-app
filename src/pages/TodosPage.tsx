import TodosList from "../features/todos/TodosList";
import { useTodos } from "../features/todos/todoHooks";
import { Box, Button, Typography } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import TodoFilterPanel from "../features/todos/TodoFilterPanel";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { TodoItem } from "../features/todos/TodoItem";
import ConfirmDialog from "../features/todos/ConfirmDialog";
import { FilterState } from "../features/todos/FilterState";

const TodosPage = () => {
  const [filters, setFilters] = useState({
    search: "",
    status: "all",
    dueDate: null,
  } as FilterState);
  const { todos, saveTodo, deleteTodo } = useTodos(filters);
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
      await deleteTodo(todoToDelete);
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

  const handleStatusToggle = (todo: TodoItem, newStatus: boolean) => {
    todo.isComplete = newStatus;
    saveTodo(todo);
  };

  return (
    <>
      <ConfirmDialog
        isOpen={isConfirmOpen}
        title="Confirm Delete"
        message={`Are you sure you want to delete "${todoToDelete?.title}"?`}
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
            My Todos
          </Typography>
          {/* Add New */}
          <Button
            onClick={() => navigate("/app/todos/create")}
            variant="contained"
            color="primary"
            sx={{ mb: 3 }}
          >
            <AddCircleIcon />
            <Typography padding="0.5vw">Add New Todo</Typography>
          </Button>
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
          />
        ) : (
          <Typography>
            You don't have any Todos. Let's start by adding a new todo.
          </Typography>
        )}
      </Box>
    </>
  );
};
export default TodosPage;
