import { TodoItem } from "../models/TodoItem";
import TodoListItem from "./TodoListItem";
import { Stack } from "@mui/material";

type TodoListProps = {
	todos: TodoItem[];
	onEdit: (id: string) => void;
	onDelete: (todo: TodoItem) => void;
}

const TodoList = ({ todos, onEdit, onDelete}: TodoListProps) => {

	const items = todos.map((todo) => (
		<div key={todo.id.toString()} className="transition-transform duration-200 hover:scale-[1.02]">
			<TodoListItem todo={todo} onEdit={() => onEdit(todo.id.toString())} onDelete={() => onDelete(todo)} />
		</div>
    ));

	if (todos.length === 0) {
		return <p>You don't have any todos yet.</p>
	}

	return (
		<Stack sx={{py:2}}>
			{items}
		</Stack>
	);
};

export default TodoList;