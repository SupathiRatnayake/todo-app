import { SyntheticEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TodoItem } from "../models/TodoItem";
import { useTodos } from "../hooks/todoHooks";
import {
  Box,
  Button,
  FormControlLabel,
  Switch,
  TextField,
} from "@mui/material";
import ConfirmDialog from "./ConfirmDialog";

interface TodoFormProps {
  todo: TodoItem;
}

const TodoForm = ({ todo: initialTodo }: TodoFormProps) => {
  const [todo, setTodo] = useState(initialTodo);
  const [errors, setErrors] = useState({
    title: "",
    dueDate: "",
  });
  const { saveTodo } = useTodos();
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => console.log(todo));

  function validate(todo: TodoItem) {
    const errors = { title: "", dueDate: "" };
    if (!todo.title) {
      errors.title = "Title is reqired.";
    }
    if (!todo.dueDate) {
      errors.dueDate = "Due date is reqired.";
    }
    return errors;
  }

  function isValid() {
    return errors.title.length === 0 && errors.dueDate.length === 0;
  }

  const handleSubmit = (event: SyntheticEvent) => {
    if (!isValid()) return;
    event.preventDefault();
    saveTodo(todo);
    navigate(-1);
  };

  const handleCancel = () => {
    if (todo === initialTodo) {
      cancelEdit();
    } else {
      setIsConfirmOpen(true);
    }
  };
  const cancelEdit = () => navigate(-1);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChange = (event: any) => {
    const { type, name, value, checked } = event.target;

    let updatedValue = type === "checkbox" ? checked : value;

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
    <>
      <ConfirmDialog
        isOpen={isConfirmOpen}
        title="Cancel Edits"
        message={`Are you sure you want to cancel changes?`}
        onConfirm={cancelEdit}
        onCancel={() => setIsConfirmOpen(false)}
      />
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          width: "80%",
        }}
      >
        <TextField
          required
          name="title"
          label="Title"
          variant="standard"
          value={todo.title}
          onChange={handleChange}
          fullWidth
          multiline
        />
        <TextField
          name="dueDate"
          label="Due Date"
          type="date"
          variant="standard"
          value={
            todo.dueDate.getFullYear() +
            "-" +
            String(todo.dueDate.getMonth() + 1).padStart(2, "0") +
            "-" +
            String(todo.dueDate.getDate()).padStart(2, "0")
          }
          onChange={handleChange}
        />
        <TextField
          name="description"
          label="Description"
          variant="standard"
          value={todo.description}
          onChange={handleChange}
          fullWidth
          multiline
          rows={4}
        />
        <FormControlLabel
          label="Completed?"
          labelPlacement="start"
          control={
            <Switch
              name="isComplete"
              checked={todo.isComplete}
              onChange={handleChange}
            />
          }
        />
        <div className="px-5 py-3 bg-gray-50 flex justify-between space-x-2">
          <Button
            onClick={handleCancel}
            variant="contained"
            color="error"
            sx={{ alignSelf: "flex-end" }}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            sx={{ alignSelf: "flex-end" }}
          >
            Save Changes
          </Button>
        </div>
      </Box>
    </>
  );
};

export default TodoForm;
