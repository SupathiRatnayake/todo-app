import {
  Card,
  CardContent,
  Collapse,
  FormControlLabel,
  IconButton,
  Switch,
  Typography,
} from "@mui/material";
import ExpandMore from "@mui/icons-material/ExpandMore";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CalendarMonth from "@mui/icons-material/CalendarMonth";
import RestoreFromTrashIcon from '@mui/icons-material/RestoreFromTrash';
import { TodoItem } from "../models/TodoItem";
import { useState } from "react";
import clsx from "clsx";
import { red } from "@mui/material/colors";

type TodoProps = {
  todo: TodoItem;
  onEdit?: () => void;
  onDelete?: () => void;
  onRecover?: (todo: TodoItem) => void;
  showRecover?: boolean;
  onToggleStatus: (todo: TodoItem, newStatus: boolean) => void;
};

const TodoListItem = (props: Readonly<TodoProps>) => {
  const { todo, onEdit, onDelete, onToggleStatus, onRecover, showRecover } = props;
  const [expanded, setExpanded] = useState(false);

  return (
    <Card variant="outlined" className="mb-3">
      <CardContent className="flex items-center justify-between">
        {/* Title */}
        <div className="w-1/3 truncate">
          <Typography variant="subtitle1" fontWeight="bold">
            {todo.title}
          </Typography>
        </div>
        {/* Expand button */}
        <div className="w-1/12">
          <IconButton onClick={() => setExpanded(!expanded)}>
            <ExpandMore
              className={clsx("transition-transform", {
                "rotate-180": expanded,
              })}
            />
          </IconButton>
        </div>
        {/* Due Date */}
        <div className="w-1/4 flex items-center justify-center space-x-1 text-center">
          <CalendarMonth fontSize="small" />
          <Typography variant="body2" color="text.secondary">
            {todo.dueDate.toDateString()}
          </Typography>
        </div>

        {/* Status */}
        <div className="w-1/4 text-center">
          <FormControlLabel
            control={
              <Switch
                checked={todo.isComplete}
                color={todo.isComplete ? "success" : "warning"}
                onChange={(e) => onToggleStatus(todo, e.target.checked)}
              />
            }
            label={todo.isComplete ? "Completed" : "Pending"}
            labelPlacement="start"
            className="justify-center"
          />
        </div>
        {/* Edit Button */}
        <div className="w-1/12 text-right">
          <IconButton onClick={onEdit} aria-label="edit">
            <EditIcon />
          </IconButton>
        </div>
        {/* Recover Button */}
        {showRecover && (
          <div className="w-1/12 text-right">
            <IconButton onClick={() => {
				if (onRecover) onRecover(todo);
			}} 
			aria-label="delete">
              <RestoreFromTrashIcon />
            </IconButton>
          </div>
        )}
        {/* Delete Button */}
        <div className="w-1/12 text-right">
          <IconButton onClick={onDelete} aria-label="delete">
            <DeleteIcon sx={{color: todo.isDeleted? red[400] : "action"}} />
          </IconButton>
        </div>
      </CardContent>
      {/* Description collaapsible content */}
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {todo.description || "No description"}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default TodoListItem;
