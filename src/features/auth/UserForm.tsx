import { useAuth0 } from "@auth0/auth0-react";
import { useUserContext } from "./userHook";
import React, { useState } from "react";
import { createUser } from "../../api/userApi";
import { useNavigate } from "react-router-dom";
import { Paper, Typography, Box, TextField, Button } from "@mui/material";

function UserForm() {
    const [name, setName] = useState('');
    const { user: auth0User, getAccessTokenSilently } = useAuth0();
    const { setUser } = useUserContext();
    const navigate = useNavigate();

    

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const token = await getAccessTokenSilently();            
            const newUser = await createUser(
                {
                    name,
                    email: auth0User?.email?? '',
                },
                token
            );
            setUser(newUser);
            console.log(`creating new user: ${newUser.name}, ${newUser.email}`);
            navigate('/profile');
        } catch (error) {
            console.error('Error creating user: ', error);
            console.log(
                {
                    name,
                    email: auth0User?.email?? '',
                }
            );
            
            alert('Failed to create user.');
        }
    }

    return (
        <Paper elevation={3} className="p-6 max-w-xl mx-auto">
            <Typography variant="h5" gutterBottom>
                Create Your Profile
            </Typography>
            <Box
            component="form"
            className="space-y-4"
            noValidate
            autoComplete="off"
            >
                <TextField
                fullWidth
                // disabled
                value={auth0User?.email}
                variant="outlined"
                name="email"
                slotProps={{
                    input:{
                        readOnly: true,
                    }
                }}
                sx={{
                    margin: 2
                }}
                />
                <TextField
                required
                fullWidth
                label="Name"
                placeholder="Your Name"
                variant="outlined"
                name="name"
                sx={{
                    margin: 2
                }}
                onChange={(e) => setName(e.target.value)}
                />
                <Box className="pt-4">
                    <Button 
                    onClick={handleSubmit}
                    variant="contained" 
                    color="primary" 
                    fullWidth>
                        Create Account
                    </Button>
                </Box>
            </Box>
        </Paper>
    );
}

export default UserForm;