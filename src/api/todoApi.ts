import axios from "axios";
import { User } from "../features/auth/models/User";
import { TodoItem } from "../features/todos/models/TodoItem";

const API_BASE_URL = 'https://localhost:7042/api/Todo'; // Configure later with env

/**
 * Fetch the user from backend using email address ans auth0 token.
 * @param id User's id from userContext
 * @param token Access token from Auth0
 * @returns User instance from backend
 */
export async function getTodos(token: string): Promise<TodoItem[]> {
    const response = await axios.get(`${API_BASE_URL}`, {
        headers: 
        { 
            Authorization: `Bearer ${token}`
        },
    });
    
    return response.data.data.map((item: unknown) => new TodoItem(item)); 
}

export async function createUser(user: { email: string; name: string }, token: string): Promise<User> {
    const response = await axios.post(`${API_BASE_URL}`, user,{
        headers: 
        { 
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    });
    
    return response.data.data;   // Data has nested data json, but has issue accessing
}