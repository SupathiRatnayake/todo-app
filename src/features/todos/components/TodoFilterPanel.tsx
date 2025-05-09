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

const TodoFilterPanel = () => {
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
          />
        </Grid>
        {/* Status dropdown */}
        <Grid size={3}>
          <FormControl fullWidth>
            <InputLabel>Status</InputLabel>
            <Select label="Status" name="status" defaultValue="all">
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
          >
            Clear filters
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default TodoFilterPanel;
