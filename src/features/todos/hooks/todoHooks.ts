import { useEffect, useState } from "react";
import { getTodos, upsertTodo} from "../../../api/todoApi";
import { TodoItem } from "../models/TodoItem";
import { useUser } from "../../auth/context/UserContext";
import { useAuth0 } from "@auth0/auth0-react";
import { toast } from "react-toastify";

export const useTodos = () => {
    const {getAccessTokenSilently} = useAuth0();
    const { user, isLoading: userLoading } = useUser();
    const [todos, setTodos] = useState<TodoItem[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | undefined>(undefined);
    const [saving, setSaving] = useState(false);
    const [savingError, setSavingError] = useState<string | undefined>(undefined);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const pageSize = 9;

    useEffect(() => {
        const loadTodos = async () => {
            if (!userLoading && user) {
                setLoading(true);
                try {
                    const accessToken = await getAccessTokenSilently();
                    const data = await getTodos(user.id.toString(), accessToken);
                    setTotalCount(data.totalCount);
                    const items = data.items.map((item: unknown) => new TodoItem(item))
                    if (currentPage === 1) {
                        setTodos(items);
                    } else {
                        setTodos((todos) => [...todos, ...items]);
                    }
                    setError(undefined);
                } catch (error) {
                    if (error instanceof Error) {
                        setError(error.message);
                    }
                } finally {
                    setLoading(false);
                }
            }
        };
        loadTodos();
    }, [currentPage, getAccessTokenSilently, setTodos, user, userLoading]);

    const saveTodo = async (todo : TodoItem) => {
        setSaving(true);
        try {
            const accessToken = await getAccessTokenSilently();
            const updatedTodo = await upsertTodo(todo, accessToken);
            /**
             * todos.some((t: { id: Guid; }) => t.id === updatedTodo.id) Check if updatedTodo exist in todos
             * todos.map((t: { id: Guid; }) => t.id === updatedTodo.id ? new TodoItem(updatedTodo) : t) Replace todo with updatedTodo
             * [...todos, new TodoItem(updatedTodo)] Else, append new todo to the end.
             */
            const updatedTodos = todos.some((t: TodoItem) => t.id === updatedTodo.id)
            ? todos.map((t: TodoItem) => t.id === updatedTodo.id ? new TodoItem(updatedTodo) : t)
            : [new TodoItem(updatedTodo), ...todos];
            setTodos(updatedTodos);
            toast.success(todo.id ? 'Todo updated successfully!' : 'Todo crerated successfully');

        } catch (error) {
            console.error('Failed to save Todo', error);
            if (error instanceof Error) {
                setSavingError(error.message);
            }
            toast.error('Failed to save Todo!');
        } finally {
            setSaving(false);
        }
    };

    const deleteTodo = async (todo : TodoItem) => {
        setSaving(true);
        try {
            const updatedTodo = await upsertTodo({
                ...todo,
                isDeleted: true,
            }, (await getAccessTokenSilently()).toString());
            // Remove the deeted todoItem from list
            const updatedTodos = todos.filter(t => t.id !== updatedTodo.id);
            setTodos(updatedTodos);
            toast.success('Todo deleted successfully');

        } catch (error) {
            console.error('Failed to save Todo', error);
            if (error instanceof Error) {
                setSavingError(error.message);
            }
            toast.error('Failed to delete Todo!');

        } finally {
            setSaving(false);
        }
    };

    return {
        todos,
        loading,
        error,
        currentPage,
        setCurrentPage,
        saving,
        savingError,
        saveTodo,
        deleteTodo,
        totalCount,
    };
}