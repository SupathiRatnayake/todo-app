import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Box, CircularProgress, Container, Typography } from "@mui/material";
import TodoForm from "../features/todos/components/TodosForm";
import { getTodoById } from "../api/todoApi"; // your API method
import { useAuth0 } from "@auth0/auth0-react";
import { TodoItem } from "../features/todos/models/TodoItem";

const TodoFormPage = () => {
  const { getAccessTokenSilently } = useAuth0();
  const { id } = useParams();
  const [todo, setTodo] = useState<TodoItem>(new TodoItem());
  const [loading, setLoading] = useState(!!id); // only load if editing
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const loadTodo = async () => {
      try {
        const accessToken = await getAccessTokenSilently();
        const data = await getTodoById(id, accessToken);
        const todo = new TodoItem(data);
        setTodo(todo);
        console.log(todo);
        
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        }
      } finally {
        setLoading(false);
      }
    };

    loadTodo();
  }, [getAccessTokenSilently, id]);

  if (loading) {
    return (
      <Container maxWidth="sm" sx={{ mt: 20, textAlign: "center" }}>
        <CircularProgress />
        <Typography variant="body1" mt={2}>
          Loading...
        </Typography>
      </Container>
    );
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Box>
      <TodoForm todo={todo} />
    </Box>
  );
};

export default TodoFormPage;
