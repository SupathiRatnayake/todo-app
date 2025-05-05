import axios from "axios";
import { TodoItem } from "../features/todos/models/TodoItem";
import { PagedResult } from "../features/todos/models/PagedResult";

const API_BASE_URL = 'http://localhost:4000/todos'; // Configure later with env

/**
 * Fetch todos from backend using userId.
 * @param userId User's id from userContext
 * @param token Access token from Auth0
 * @returns Todos list from backend
 */
export async function getTodos(userId : string, accessToken: string): Promise<PagedResult<TodoItem>> {
    const response = await axios.get(`${API_BASE_URL}`, {
        params: {
            userId: userId,
        },
        headers : {
            Authorization: `Bearer ${accessToken}`,
        }
    });
    
    return response.data.data; 
}

/**
 * Fetch todos from backend using userId.
 * @param todoItem todoItem to save.
 * @param token Access token from Auth0
 * @returns Todos list from backend
 */
export async function upsertTodo(todoItem: TodoItem, accessToken: string): Promise<TodoItem> {
    const {id, title, description, dueDate, isComplete, isDeleted, ownerId} = todoItem;
    const response = await axios.post(`${API_BASE_URL}`, 
        {
        "id" : id.toString(),
        "title" : title,
        "description" : description, 
        "dueDate" : dueDate.toISOString(),
        "isComplete" : isComplete,
        "isDeleted" : isDeleted,
        "ownerId" : ownerId.toString(),
    },{
        headers: 
        { 
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        },
    });
    
    return response.data.data;   // Data has nested data json, but has issue accessing
}