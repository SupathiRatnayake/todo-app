import axios from "axios";
import { User } from "../features/auth/models/User";

const API_BASE_URL = 'https://localhost:7042/api/Users'; // Configure later with env

/**
 * Fetch the user from backend using email address ans auth0 token.
 * @param email User's email from Auth0
 * @param token Access token from Auth0
 * @returns User instance from backend
 */
export async function getUserFromBackend(email: string, token: string): Promise<User> {
    const response = await axios.post(`${API_BASE_URL}/getuser`, {
        "email" : email
        // params: 
        // {
        //     email : email
        // },
        // headers: 
        // { 
        //     Authorization: `Bearer ${token}`
        // },
    });
    
    return response.data.data;   // Data has nested data json, but has issue accessing
}