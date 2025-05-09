import { Box, List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
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
            </List>

        </Box>
    );
}

export default Navigation;