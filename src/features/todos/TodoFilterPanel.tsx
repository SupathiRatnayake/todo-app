import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import {
	FormControl,
	InputLabel,
	Paper,
	Select,
	TextField,
	MenuItem,
	Button,
	Grid,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { PickerValue } from "@mui/x-date-pickers/internals";
import { FilterState } from './FilterState'

type FilterProps = {
	filters: FilterState;
	onFilterChange: (filters: FilterState) => void;
	onClear: () => void;
}

const TodoFilterPanel = ({ filters, onFilterChange, onClear}: FilterProps) => {
	const handleChange = (field: keyof FilterState, value: string | boolean | PickerValue) => {
		onFilterChange({...filters, [field]: value});
		console.log([field], value);
	}

	
	return (
		<Paper square={true} sx={{ p: 2 }}>
			{/* Filter Controls */}
			<Grid container spacing={2} alignItems="center" sx={{ p: 2 }}>
				{/* Search Field */}
				<Grid size={4}>
					<TextField
						label="Search"
						variant="outlined"
						name="search"
						fullWidth
						value={filters.search}
						onChange={(e) => handleChange("search", e.target.value)}
					/>
				</Grid>
				{/* Status dropdown */}
				<Grid size={3}>
					<FormControl fullWidth>
						<InputLabel>Status</InputLabel>
						<Select 
						label="Status" 
						name="status" 
						defaultValue="all"
						value={filters.status}
						onChange={(e) => handleChange("status", e.target.value)}
						>
							<MenuItem value="all">All</MenuItem>
							<MenuItem value="pending">Pending</MenuItem>
							<MenuItem value="completed">Completed</MenuItem>
						</Select>
					</FormControl>
				</Grid>
				{/* Date Picker */}
				<Grid size={3}>
					<LocalizationProvider dateAdapter={AdapterDateFns}>
						<DatePicker
							label="Due Date"
							slotProps={{
								textField: { sx: { width: "100%" } },
							}}
							value={filters.dueDate}
							onChange={(newDate) => handleChange("dueDate", newDate)}

						/>
					</LocalizationProvider>
				</Grid>
				{/* Clear Button */}
				<Grid size={2}>
					<Button
						variant="outlined"
						startIcon={<ClearIcon />}
						sx={{
							height: 56,
							whiteSpace: "nowrap",
						}}
						onClick={onClear}
					>
						Clear filters
					</Button>
				</Grid>
			</Grid>
		</Paper>
	);
};

export default TodoFilterPanel;
