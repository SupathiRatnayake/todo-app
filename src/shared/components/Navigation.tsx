import { Box, List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { useNavigate } from "react-router-dom";

const Navigation = () => {

    const navigate = useNavigate();

    return (
        <Box
            sx={{
                minHeight: "100%",
                bgcolor: "grey.100",
                display: "flex",
                flexDirection: "column",
            }}
        >

            {/* Navigation */}
            <List sx={{ flexGrow: 1 }}>
                <ListItemButton onClick={() => navigate("/app/todos")}>
                    <ListItemIcon>
                        <FormatListBulletedIcon />
                    </ListItemIcon>
                    <ListItemText primary="Todos" />
                </ListItemButton>

                <ListItemButton onClick={() => navigate("/app/recycle_bin")}>
                    <ListItemIcon>
                        <DeleteOutlineOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText primary="Deleted todos" />
                </ListItemButton>

            </List>

        </Box>
    );
}

export default Navigation;