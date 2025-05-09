import TodosList from "../features/todos/components/TodosList";
import { useTodos } from "../features/todos/hooks/todoHooks";
import { Box, Button, Typography } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import TodoFilterPanel from "../features/todos/components/TodoFilterPanel";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { TodoItem } from "../features/todos/models/TodoItem";
import ConfirmDialog from "../features/todos/components/ConfirmDialog";

const TodosPage = () => {
  const { todos, deleteTodo } = useTodos();
  const navigate = useNavigate();
  const [todoToDelete, setTodoToDelete] = useState<TodoItem | null>(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

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
          <Typography variant="h4" gutterBottom>
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
        {todos && <TodoFilterPanel />}
        {/* Todos List */}
        {todos ? (
          <TodosList
            todos={todos}
            onEdit={handleEditClick}
            onDelete={requestDelete}
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
