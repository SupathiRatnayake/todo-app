import { useState } from "react";
import { TodoItem } from "../models/TodoItem";
import TodoCard from "./TodoCard";
import TodoForm from "./TodosForm";

type TodoListProps = {
	todos: TodoItem[];
	onSave: (todo: TodoItem) => void;
	onDelete: (todo: TodoItem) => void;
}

const TodosBoard = ({ todos, onSave, onDelete }: TodoListProps) => {

	const [todoBeignEdited, setTodoBeignEdited] = useState({});

	const handleEdit = (todo: TodoItem) => {
		setTodoBeignEdited(todo);
	};

	const cancelEditing = () => {
		setTodoBeignEdited({});
	};



	const items = todos.map((todo) => (
		<div key={todo.id.toString()} className="transition-transform duration-200 hover:scale-[1.02]">
			{todo === todoBeignEdited? (<TodoForm todo={todo} onSave={onSave} onCancel={cancelEditing} />) : (<TodoCard todo={todo} onEdit={handleEdit} onDelete={onDelete} />)}
		</div>
    ));

	if (todos.length === 0) {
		return <p>You don't have any todos yet.</p>
	}

	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 p-6">
          {items}
        </div>
	);
};

export default TodosBoard;