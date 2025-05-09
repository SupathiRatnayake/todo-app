// Using layout routes, gives layout for all pages. 
import { Outlet } from "react-router-dom";
import { Box, Grid } from "@mui/material";
import Navigation from "./Navigation";
import Header from "./Header";

const Layout = () => {
    return (
        <Grid container sx={{flexGrow: 1}}>
            <Header />
            <Grid size={{ xs: 12, md: 2 }}>
                <Box
                component="nav"
                sx={{
                    height: "100%",
                    backgroundColor: "Background.paper",
                    borderColor: "devider",
                    p: 2,
                }}
                >
                    <Navigation />
                </Box>
            </Grid>
            <Grid size={{ xs: 12, md: 10 }}>
                <Box
                component="main"
                sx={{
                    height: "100%",
                    backgroundColor: "Background.paper",
                    p: 2,
                }}
                >
                    <Outlet />
                </Box>
            </Grid>
        </Grid>
    );
};

export default Layout;