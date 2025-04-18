import axios from "axios";
import { TodoItem } from "../features/todos/models/TodoItem";

const API_BASE_URL = 'https://localhost:7042/api/Todo'; // Configure later with env

/**
 * Fetch todos from backend using userId.
 * @param id User's id from userContext
 * @param token Access token from Auth0
 * @returns User instance from backend
 */
export async function getTodos( token: string): Promise<TodoItem[]> {
    const response = await axios.get(`${API_BASE_URL}`, {
        headers: 
        { 
            Authorization: `Bearer ${token}`
        },
    });
    
    return response.data.data.map((item: unknown) => new TodoItem(item)); 
}

export async function upsertTodo(todo: TodoItem): Promise<TodoItem> {
    const {id, title, description, due, isComplete, isDeleted, ownerId} = todo;
    const response = await axios.post(`${API_BASE_URL}`, {
        id,
        title,
        description, 
        due,
        isComplete,
        isDeleted,
        ownerId
    },{
        // headers: 
        // { 
        //     Authorization: `Bearer ${token}`,
        //     'Content-Type': 'application/json',
        // },
    });
    
    return response.data.data;   // Data has nested data json, but has issue accessing
}