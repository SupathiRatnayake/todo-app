import axios from "axios";
import { TodoItem } from "./TodoItem";
import { PagedResult } from "./PagedResult";
import { FilterState } from "./FilterState";
import { Guid } from "guid-typescript";

const API_BASE_URL = "https://localhost:7042/api/Todo"; // Configure later with env

/**
 * Fetch todos from backend using userId.
 * @param userId User's id from userContext
 * @param token Access token from Auth0
 * @returns Todos list from backend
 */
export async function getTodos(
  userId: string,
  accessToken: string,
  filters: FilterState
): Promise<PagedResult<TodoItem>> {
  const params = new URLSearchParams();
  params.append("userId", userId);
  if (filters.search) params.append("searchtext", filters.search);
  if (filters.status !== "all")
    params.append("isComplete", (filters.status === "completed").toString()); // sets isComplete to true if value is "completed" or else false
  if (filters.dueDate) {
    const normalizedDate = normalizeToUTC(filters.dueDate);
    params.append("dueDate", normalizedDate);
  }
  if (filters.isDeleted !== undefined)
    params.append("isDeleted", filters.isDeleted.toString());
  const response = await axios.get(`${API_BASE_URL}?${params.toString()}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response.data.data;
}

/**
 * Fetch todos from backend using userId.
 * @param todoId Id of the todoItem
 * @param token Access token from Auth0
 * @returns Todos list from backend
 */
export async function getTodoById(
  todoId: string,
  accessToken: string
): Promise<TodoItem> {
  const response = await axios.get(`${API_BASE_URL}/${todoId}`, {
    params: {
      todoId: todoId,
    },
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response.data.data;
}

/**
 * Creates or Updates TodoItem in the backend database.
 * @param todoItem todoItem to save.
 * @param token Access token from Auth0
 * @returns Todos list from backend
 */
export async function upsertTodo(
  todoItem: TodoItem,
  accessToken: string
): Promise<TodoItem> {
  const { id, title, description, dueDate, isComplete, isDeleted, ownerId } =
    todoItem;
  const response = await axios.post(
    `${API_BASE_URL}`,
    {
      id: id.toString(),
      title: title,
      description: description,
      dueDate: dueDate.toISOString(),
      isComplete: isComplete,
      isDeleted: isDeleted,
      ownerId: ownerId.toString(),
    },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    }
  );

  return response.data.data; // Data has nested data json, but has issue accessing
}

/**
 * Creates or Updates TodoItem in the backend database.
 * @param todoItem todoItem to save.
 * @param token Access token from Auth0
 * @returns Todos list from backend
 */
export async function permanentDeleteTodo(
  todoId: Guid,
  accessToken: string
): Promise<{ success: boolean; message?: string }> {
  const response = await axios.delete(`${API_BASE_URL}/${todoId.toString()}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });

  if (response.status === 204) {
    return { success: true };
  }
  return {
    success: false,
  };
}

const normalizeToUTC = (date: Date) => {
  const utcDate = new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
  );
  return utcDate.toISOString().slice(0, 10);
};
