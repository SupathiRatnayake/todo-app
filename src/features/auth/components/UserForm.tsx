import { useAuth0 } from "@auth0/auth0-react";
import { useUserContext } from "../context/UserContext";
import React, { useState } from "react";
import { createUser } from "../../../api/userApi";
import { useNavigate } from "react-router-dom";

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
        <>
        <h1>User Form</h1>
        <form onSubmit={handleSubmit}>
            <label htmlFor="name">Name</label>
            <input 
                required 
                type="text" 
                id="name" 
                placeholder="Your Name" 
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <label htmlFor="email">Email Address</label>
            <input 
                readOnly 
                type="text" 
                id="email" 
                value={auth0User?.email ?? ''} 
            />
            <button type="submit">Create</button>
        </form>
        </>
    );
}

export default UserForm;