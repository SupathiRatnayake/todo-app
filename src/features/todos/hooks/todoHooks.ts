import { useEffect, useState } from "react";
import { getTodos, upsertTodo} from "../../../api/todoApi";
import { TodoItem } from "../models/TodoItem";
import { useUser } from "../../auth/context/UserContext";

export const useTodos = () => {
    const { user, isLoading: userLoading } = useUser();
    const [todos, setTodos] = useState<TodoItem[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | undefined>(undefined);
    const [currentPage, setCurrentPage] = useState(1);
    const [saving, setSaving] = useState(false);
    const [savingError, setSavingError] = useState<string | undefined>(undefined);

    useEffect(() => {
        const loadTodos = async () => {
            if (!userLoading && user) {
                setLoading(true);
                try {
                    const data = await getTodos();
                    if (currentPage === 1) {
                        setTodos(data);
                    } else {
                        setTodos((todos) => [...todos, ...data]);
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
    }, [currentPage, setTodos, user, userLoading]);

    const saveTodo = async (todo : TodoItem) => {
        setSaving(true);
        try {
            const updatedTodo = await upsertTodo(todo);
            /**
             * todos.some((t: { id: Guid; }) => t.id === updatedTodo.id) Check if updatedTodo exist in todos
             * todos.map((t: { id: Guid; }) => t.id === updatedTodo.id ? new TodoItem(updatedTodo) : t) Replace todo with updatedTodo
             * [...todos, new TodoItem(updatedTodo)] Else, append new todo to the end.
             */
            const updatedTodos = todos.some((t: TodoItem) => t.id === updatedTodo.id)
            ? todos.map((t: TodoItem) => t.id === updatedTodo.id ? new TodoItem(updatedTodo) : t)
            : [...todos, new TodoItem(updatedTodo)];
            setTodos(updatedTodos);
        } catch (error) {
            console.error('Failed to save Todo', error);
            if (error instanceof Error) {
                setSavingError(error.message);
            }
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
    };
}